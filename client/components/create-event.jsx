import React, { useMemo, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css'; // maybe not needed

export default function CreateEvent() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [selected, setSelected] = useState({ lat: 33.812511, lng: -117.918976 });
  const [imageUrl, setImageUrl] = useState();
  const fileInputRef = useRef();
  const libraries = useMemo(() => ['places'], []);

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAdLGV4RzzLD1SC8fVAshEm_92pcAUgg8s',
    libraries
  });

  function handleImageSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', fileInputRef.current.files[0]);

    fetch('/api/events/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data)
        console.log('line:39 data::: ', data);
        fileInputRef.current.value = null;
      })
      .catch((error) => console.error('Error:', error));
  }


   const onSubmit = async data => {
    const debug = false;
    if (debug) {
    // eslint-disable-next-line no-console
      console.log('line:14 data:::browser only ', data);
      return;
    }
    try {
      data.image = imageUrl
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className=''>Event Name
            <div>
              <input type='text' autoFocus className=' border rounded border-black bg-green-300 container' {...register('name', {
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
                render={({ field }) => <Datetime inputProps={{ className: 'rounded border border-black' }} {...field} />}
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
                render={({ field }) => <Datetime inputProps={{ className: 'rounded border border-black' }} {...field} />}
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
            inputProps={{ className: 'rounded border border-black' }}
            render={({ field }) =>
              <PlacesAutoComplete onSelect={(latLng, address) => {
                setSelected(latLng);
                field.onChange(address);
              }}
              />
            }
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
          {(imageUrl) && <div><img src={imageUrl} /> </div> }

        <div>
          <button
            className='rounded right-0 top-0 border border-black bg-red-300'
            type="submit"
            value='Create Event'>
            Create the event!! move this up to nav bar later
          </button>
        </div>
      </form>


      <form onSubmit={handleImageSubmit}>
        <div>
          <input
            required
            type="file"
            name="image"
            ref={fileInputRef}
            className="bg-orange-300"
            accept=".png, .jpg, .jpeg, .gif" />
          <button type="submit" className="bg-yellow-200">
            Upload the image now
          </button>
        </div>
      </form>
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
        className='container bg-purple-200 rounded border border-black'
        placeholder='search here placeholder'/>
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
