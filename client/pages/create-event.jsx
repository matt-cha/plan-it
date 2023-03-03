import React, { useMemo, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css'; // maybe not needed
import { useNavigate } from 'react-router-dom';
/* import styled from 'styled-components'; */

export default function CreateEvent() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [selected, setSelected] = useState({ lat: 33.812511, lng: -117.918976 });
  const [imageUrl, setImageUrl] = useState();
  const fileInputRef = useRef();
  const libraries = useMemo(() => ['places'], []);
  const navigate = useNavigate();

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '.25rem'
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
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setImageUrl(data);
        fileInputRef.current.value = null;
      })
      .catch(error => console.error('Error:', error));
  }

  const onSubmit = async data => {
    const debug = false;
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('line:14 data:::browser only ', data);
      return;
    }
    try {
      data.image = imageUrl;
      const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { eventId } = await response.json();

      // eslint-disable-next-line no-console
      console.log('line:14 data:::data added to DB ', data);
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className=' flex-wrap justify-center flex m-3'>
      <div className='w-full max-w-3xl'>
        <div className='second form'>
          <FileForm handleImageSubmit={handleImageSubmit} fileInputRef={fileInputRef} imageUrl={imageUrl}/>
        </div>
        <div className='first form'>
          <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className=''>

              <label className='text-xl text-[#0d2137]'>Event Name
                <div className='my-2'>
                  <input type='text' autoFocus placeholder='event name placeholder' className='container mx-auto border rounded border-[#f2dec8] ' {...register('name', {
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
                  <p className='text-red-300'>{errors?.name?.message}</p>
                </div>
              </label>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className='flex-1 sm:mr-2'>
                <label className='text-xl text-[#0d2137]'>  Start Date and Time
                  <div className='my-2'>
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field }) => <Datetime inputProps={{ className: ' border rounded border-[#f2dec8] container ', placeholder: 'start date placeholder' }} {...field} />}
                    /> {/* this is where new begins  */}
                  </div>
                </label>
              </div>
              <div className='flex-1 sm:ml-2'>
                <label className='text-xl text-[#0d2137]'>End Date and Time
                  <div className='my-2'>
                    <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => <Datetime inputProps={{ className: ' border rounded border-[#f2dec8] container ', placeholder: 'end date placeholder' }} {...field} />}
                  />
                  </div>
                </label>
              </div>

            </div>
            <div className=''>
              <p className='text-xl text-[#0d2137]'>Location</p>
            </div>
            <div className='my-2'>
              <Controller
                name="location"
                control={control}
                inputProps={{ className: 'rounded border border-[#f2dec8] ' }}
                render={({ field }) =>
                  <PlacesAutoComplete onSelect={(latLng, address) => {
                    setSelected(latLng);
                    field.onChange(address);
                  }}
                  />
                }
              />
            </div>
            <div className='w-full '>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={selected}
                className='h-1/4 p-11 object-contain my-2'
                mapContainerClassName='w-full h-1/2 rounded'
              >
                <Marker position={selected} />
              </GoogleMap>
            </div>
            <div className='my-2'>
              <label className='text-xl text-[#0d2137]'>Details
                <div className='my-2'>
                  <textarea rows='5' className=' border min-h-2 rounded border-[#f2dec8] container ' placeholder='details placeholder' {...register('details')} />
                </div>
              </label>
            </div>
            {/*          {imageUrl &&
              <div className='h-96 min-w-min max-w-3xl mx-auto rounded bg-gradient-to-b from-[#f2dec8] to-[#C8F2DE]'>
                <img className="object-contain rounded h-full w-full" src={imageUrl} /> </div>} */}
            <div className=''>
              <button
                className='rounded border border-[#f2dec8] bg-[#f2dec8]'
                type="submit"
                value='Create Event'>
                Create the event!
              </button>
            </div>
          </form>
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
        className='border rounded border-[#f2dec8] container text-xl text-[#0d2137]'
        placeholder='Romanian Prison' />
      <ComboboxPopover className='rounded'>
        <ComboboxList>
          {status === 'OK' && data.map(({ placeId, description }, index) => (
            <ComboboxOption key={index} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const FileForm = ({ handleImageSubmit, fileInputRef, imageUrl }) => {
  return (
    <form onSubmit={handleImageSubmit} className=' '>
      <div className=''>
        <label htmlFor="file-upload-button" className=" rounded max-w-min ">Cover Photo
          <div className='my-2'>
            <input
              required
              type="file"
              name="image"
              ref={fileInputRef}
              className="rounded w-max"
              /* style={{ display: 'none' }} */
              id='file-upload-button'
              accept=".png, .jpg, .jpeg, .gif, .webp" />
          </div>

        </label>
      </div>
      <div>
        <button type="submit" className="bg-yellow-300 rounded ">
          Upload
        </button>
      </div>

      <div className='h-96 min-w-min max-w-3xl mx-auto rounded bg-gradient-to-b from-[#f2dec8] to-[#C8F2DE]'>
        <img className="object-contain rounded h-full w-full" src={imageUrl} /> </div>
    </form>
  );
};
