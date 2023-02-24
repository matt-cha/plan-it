import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css'; // maybe not needed

export default function Event() {
  const { control, register, /* reset */ handleSubmit, formState: { errors } } = useForm();
  const [selected, setSelected] = useState({ lat: 44, lng: -80 });

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAdLGV4RzzLD1SC8fVAshEm_92pcAUgg8s',
    libraries: ['places']
  });

  const onSelectHandler = (latLng, address, field) => {
    setSelected(latLng);
    field.onChange(address);
  };
  // @Robert, I tried pulling out the onSelect from PlacesAutocomplete but the data is returning as undefined if you could take a look at this when you review, thanks!

  const onSubmit = async data => {
    const debug = true;
    if (debug) {
    // eslint-disable-next-line no-console
      console.log('line:14 data:::browser only ', data);
      /*  reset(); */
      return;
    }
    try {
      await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // eslint-disable-next-line no-console
      console.log('line:14 data:::data added to DB ', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className=''>Event Name
          <div>
            <input type='text' autoFocus className=' border rounded border-black bg-green-300' {...register('name', {
              required: 'Event name is required.',
              minLength: {
                value: 4,
                message: 'Event name cannot be shorter than 4 characters'
              },
              maxLength: {
                value: 20,
                message: 'Event name cannot be longer than 20 characters'
              }
            })} />
          </div>
          <div>
            <p>{errors?.name?.message}</p>
          </div>
        </label>
      </div>
      <div>
        <label> <span className=''>Start Date and Time</span>
          <div>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Datetime inputProps={{ className: 'rounded' }} {...field} />}
             />
          </div>
        </label>
      </div>
      <div>
        <label><span className=''>End Date and Time</span>
          <div>
            <Controller
              name="endDate"
              control={control}
              rules={{ required: true }} // optional? decide this
              render={({ field }) => <Datetime inputProps={{ className: 'rounded' }} {...field} />}
            />
          </div>
        </label>
      </div>
      <div>
        <p>Location</p>
      </div>
      <div>
        <Controller
          name="location"
          control={control}
          inputProps={{ className: 'rounded' }}
          render={({ field }) => <PlacesAutoComplete /* onSelect={(latLng, address) => { setSelected(latLng); field.onChange(address); }} */ onSelect={onSelectHandler} /> }
        />
      </div>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={selected}
          className='h-1/4 p-11'
          mapContainerClassName='w-full h-1/2'
        >
          <Marker position={selected} />
        </GoogleMap>
      </div>
      <div>
        <label className=''>Details
          <div>
            <textarea className=' border rounded border-black bg-green-300' {...register('details')} />
          </div>
        </label>
      </div>
      <div>
        <input
          className='rounded right-0 top-0 border border-black bg-red-500'
          type="submit"
          />
      </div>
    </form>
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
        className='container bg-red-200 rounded'
        placeholder='search her placeholdere' />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' && data.map(({ placeId, description }) => (
            <ComboboxOption key={placeId} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
