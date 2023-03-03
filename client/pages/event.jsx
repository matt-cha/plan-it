import React, { useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatDate from '../lib/format-date';
import GuestForm from '../components/guest-form';
import GuestList from '../components/guest-list';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

export default function Event() {
  const [event, setEvent] = useState();
  const [selected, setSelected] = useState(null);
  const { eventId } = useParams();
  const libraries = useMemo(() => ['places'], []);
  const [guests, setGuests] = useState();

  useEffect(() => {
    if (!guests) {
      fetch(`/api/events/${eventId}/guests`)
        .then(res => res.json())
        .then(guests => setGuests(guests));
    }
  }, [eventId, guests]);

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '.25rem'
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAdLGV4RzzLD1SC8fVAshEm_92pcAUgg8s',
    libraries
  });

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then(res => res.json())
      .then(event => {
        setEvent(event);
      });
  }, [eventId]);

  useEffect(() => {
    async function displayLocation(address) {
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
      } catch (error) {
        console.error('Error!:', error);
      }
    }
    if (!event) return;
    displayLocation(event.location);
  }, [event]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!event) return null;
  const { name, startDate, endDate, location, details, image } = event;

  return (
    <div className='flex-wrap justify-center flex m-3'>
      <div className='w-full max-w-3xl'>
        <div className='h-96 min-w-min max-w-3xl mx-auto rounded  bg-gradient-to-b from-[#f2dec8] to-[#C8F2DE]'>
          <img className="object-contain rounded h-full w-full" src={image} />
        </div>
        <div className='flex'>
          <h2>
            <i className="fa-solid fa-calendar-days" />
            {name}
          </h2>
        </div>
        <div className='flex'>
          <p>
            <i className="fa-solid fa-clock" />
            {formatDate(startDate)} - {formatDate(endDate)}</p>
        </div>
        <div className='flex'>
          <p>
            <i className="fa-solid fa-location-dot" />
            {location}</p>
        </div>
        <div>
          <PlacesAutoComplete onSelect={(latLng, address) => setSelected(latLng)} />
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={selected}
            className='h-1/4 p-11'
            mapContainerClassName='w-full h-1/2 rounded'
          >
            <Marker position={selected} />
          </GoogleMap>
        </div>
        <div className='flex  '>
          <p>
            <i className="fa-solid fa-circle-info" />
            {details}</p>
        </div>
        <div>
          <GuestList guests={guests}/>
        </div>
        <div>
          <GuestForm onAdd={() => setGuests(undefined)} />
        </div>
      </div>
    </div>
  );
}

const PlacesAutoComplete = ({ onSelect }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async address => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect({ lat, lng }, address);
    } catch (error) {
      console.error('Error!:', error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={event => setValue(event.target.value)}
        disabled={!ready}
        className='bg-purple-200 rounded border border-black'
        placeholder='search here placeholder' />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' && data.map(({ placeId, description }, index) => (
            <ComboboxOption key={index} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
