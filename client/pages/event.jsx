import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import formatDate from '../lib/format-date';
import GuestForm from '../components/guest-form';
import GuestList from '../components/guest-list';
import TaskForm from '../components/task-form';
import TaskList from '../components/task-list';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import { useNetworkError } from '../components/network-error';
export default function Event() {
  const [event, setEvent] = useState();
  const [selected, setSelected] = useState(null);
  const { eventId } = useParams();
  const libraries = useMemo(() => ['places'], []);
  const [guests, setGuests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { setNetworkError } = useNetworkError();
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`https://plan-it.up.railway.app/api/events/${eventId}/guests`)
      .then(res => res.json())
      .then(guests => setGuests(guests))
      .catch(error => {
        setNetworkError(true);
        console.error('Error fetching guests:', error);
      });

  }, [eventId, setNetworkError]);

  useEffect(() => {

    fetch(`https://plan-it.up.railway.app/api/events/${eventId}/tasks`)
      .then(res => res.json())
      .then(tasks => setTasks(tasks))
      .catch(error => {
        setNetworkError(true);
        console.error('Error fetching tasks:', error);
      });

  }, [eventId, setNetworkError]);

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '.25rem'
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC-NwgYDesc3bQDiBT8j4bNKts-3Kv-oFA',
    libraries
  });

  useEffect(() => {
    if (isNaN(eventId) || eventId === '') {
      navigate('/not-found');
      return;
    }

    fetch(`https://plan-it.up.railway.app/api/events/${eventId}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          navigate('/not-found');
          throw new Error('Event not found');
        }
      })
      .then(event => {
        setEvent(event);
      })
      .catch(error => {
        console.error('Error fetching event:', error);
        navigate('/not-found');
      });
  }, [eventId, navigate]);

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
        <div className='h-96 min-w-min max-w-3xl mx-auto rounded shadow-lg bg-gradient-to-b from-[#f2dec8] to-[#C8F2DE]'>
          <img className="object-contain rounded h-full w-full " src={`/images/${image}`} />
        </div>
        <div className='flex my-1'>
          <p className='text-3xl py-2 font-bold'>{name}</p>
        </div>

        <div className='flex my-2'>
          <p className='flex'>
            <i className="fa-regular fa-clock mr-2 mt-1 text-[#5f6e82]" />
            <span className=' '>{formatDate(startDate)} - {formatDate(endDate)}</span>
          </p>
        </div>
        <div className='flex my-2'>
          <p className='flex'>
            <i className="fa-solid fa-location-dot mr-2.5 text-lg text-[#EA4335]" />
            <span className='font-bold'>{location}</span>
          </p>
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

        <div className='flex my-2'>
          <p className='flex'>
            <i className="fa-solid fa-circle-info text-lg mr-2 text-[#185784]" />
            <span className='text-justify'>{details}</span>
          </p>
        </div>

        <div className='flex flex-col sm:flex-row'>
          <div className='flex-1 sm:mr-2'>
            <div>
              <GuestForm onAdd={(newGuest) => setGuests(prevGuests => [...prevGuests, newGuest])} />
            </div>
            <div>
              <GuestList guests={guests} />
            </div>
          </div>
          <div className='flex-1  '>
            <div className='mt-2 sm:mt-0'>
              <TaskForm onAdd={(newTask) => setTasks(prevTasks => [...prevTasks, newTask])} />
            </div>
            <div>
              <TaskList tasks={tasks} />
            </div>
          </div>
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
      console.error('Error:', error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={event => setValue(event.target.value)}
        disabled={!ready}
        className='bg-purple-200 rounded border border-black hidden'
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
