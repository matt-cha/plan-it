import React, { useMemo, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import formatDate from '../lib/format-date';
import GuestList from '../components/guest-list';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

export default function Event() {
  const [event, setEvent] = useState();
  const [selected, setSelected] = useState(null);
  const { eventId } = useParams();
  const libraries = useMemo(() => ['places'], []);

  const mapContainerStyle = {
    width: '97%',
    margin: '.5rem',
    height: '300px',
    borderRadius: '.25rem'
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAdLGV4RzzLD1SC8fVAshEm_92pcAUgg8s',
    libraries
  });

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((event) => {
        setEvent(event)
      })
  }, [eventId]);

  useEffect(() => {

    const displayLocation = async address => {
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected( { lat, lng })
      } catch (error) {
        console.error('Error!:', error);
      }
    };
    if (!event) return;
    displayLocation(event.location);
  }, [event])

  if (!isLoaded) return <div>Loading...</div>;
  if (!event) return null;
  const { name, startDate, endDate, location, details, image } = event;

  return (
    <>
      <div>
        <box-icon name='chevron-left' ></box-icon>
      </div>
      <div className='items-center content-center flex h-52 w-72 max-w-xs rounded bg-blue-300'>
        <img className="object-contain rounded h-full w-full" src={image}></img>
      </div>
      <div className='flex m-2'>
        <box-icon className='flex-shrink-0' name='calendar-event'></box-icon>
        <h2>{name}</h2>
      </div>
      <div className='flex m-2'>
        <box-icon name='time' type='solid' ></box-icon>
        <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
      </div>
      <div className='flex m-2'>
        <box-icon name='map' ></box-icon>
        <p>{location}</p>
      </div>
      <div>
        <PlacesAutoComplete onSelect={(latLng, address) => setSelected(latLng)}/>
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
      <div className='flex m-2 '>
        <box-icon name='detail' type='solid' ></box-icon>
        <p>{details}</p>
      </div>
    <div>
      <button>Guest List</button>
      <GuestList></GuestList>
    </div>
    </>
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
        className='bg-purple-200 rounded border border-black m-2'
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
