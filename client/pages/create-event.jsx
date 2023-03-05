import React, { useMemo, useState } from 'react';
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
  const [selected, setSelected] = useState({ lat: 40.785091, lng: -73.968285 });
  const [imageUrl, setImageUrl] = useState();
  const libraries = useMemo(() => ['places'], []);
  const navigate = useNavigate();

  const handleFileChange = event => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '.25rem'
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAdLGV4RzzLD1SC8fVAshEm_92pcAUgg8s',
    libraries
  });

  const onSubmit = async data => {
    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('location', data.location);
      formData.append('details', data.details);
      formData.append('image', data.image[0]);

      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData
      });

      const { eventId } = await response.json();
      navigate(`/events/${eventId}`);
      // eslint-disable-next-line no-console
      console.log('line:14 data:::data added to DB ', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className=' flex-wrap justify-center flex m-3'>
      <div className='w-full max-w-3xl'>
        <div className='first form'>
          <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className='event-name'>

              <label className='pl-2  text-[#0d2137] cursor-pointer'>
                <span className="text-lg font-medium">Event Name</span>
                <div className='my-2'>
                  <input type='text' autoFocus placeholder='Annual Company Picnic 2023' className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]' {...register('name', {
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
                  <p className='text-red-500'>{errors?.name?.message}</p>
                </div>
              </label>
            </div>
            <div className="calendar flex flex-col sm:flex-row">
              <div className='flex-1 sm:mr-2'>
                <label className='cursor-pointer pl-2 text-[#0d2137]'>
                  <span className="text-lg font-medium">Start Date and Time</span>
                  <div className='my-2'>
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field }) => <Datetime inputProps={{ className: 'pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]', placeholder: '03/20/2023 11:00AM' }} {...field} />}
                    />
                  </div>
                </label>
              </div>

              <div className='flex-1 sm:ml-2'>
                <label className='cursor-pointer pl-2 text-[#0d2137]'>
                  <span className="text-lg font-medium">End Date and Time</span>
                  <div className='my-2'>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => <Datetime inputProps={{ className: 'pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]', placeholder: '03/20/2023 5:00PM' }} {...field} />}
                      />
                  </div>

                </label>
              </div>

            </div>

            <div className='new-image-submission'>
              <label htmlFor="file-upload-button" className="pl-2 rounded max-w-min text-[#0d2137]  ">
                <span className="text-lg font-medium">Cover Photo</span>
                <div className='my-2'>
                  <input
                    {...register('image')}
                    required
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                    id='file-upload-button'
                    accept=".png, .jpg, .jpeg, .gif, .webp" />
                  <div className='relative w-full'>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" />
                    <div className="cursor-pointer inline-block py-2 px-4 border rounded-md shadow-sm text-sm font-medium border-[#f2dec8] bg-[#f2dec8] hover:bg-[#e8c59f] hover:border-[#e8c59f] transition-colors duration-300">
                      Choose file
                    </div>
                  </div>
                </div>
                <div className='cursor-pointer h-96 min-w-min max-w-3xl mx-auto rounded bg-gradient-to-b my-2 from-[#f2dec8] to-[#C8F2DE] hover:from-[#e8c59f] hover:to-[#94e8bf] transition-all duration-300'>
                  {imageUrl
                    ? (<img className="object-contain rounded h-full w-full" src={imageUrl} />)
                    : (<div className="flex items-center justify-center h-full w-full text-gray-400">Choose a file</div>
                      )} </div>
              </label>
            </div>

            <div className='gmaps'>
              <p className='pl-2 text-[#0d2137] text-lg font-medium'>Location</p>
            </div>
            <div className='my-2'>
              <Controller
                name="location"
                control={control}
                inputProps={{ className: '' }}
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
              <label className='pl-2 text-[#0d2137]'>
                <span className='text-lg font-medium'>Details</span>
                <div className='my-2'>
                  <textarea
                    rows='9'
                    className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]'
                    placeholder="It's that time of year again! The Annual Company Picnic is a beloved tradition that brings together employees, their families, and friends for a day of fun and relaxation. This year, we're excited to host the picnic in Central Park, which provides the perfect setting for a summer day outdoors. There will be plenty of delicious food to enjoy, including burgers, hot dogs, and vegetarian options, as well as refreshing drinks and desserts. For the kids, we'll have a range of activities and games, including face painting, a bounce house, and a scavenger hunt. Adults can take part in a friendly game of volleyball, cornhole, or just relax in the shade with a good book. We'll also have a photobooth set up to capture memories of the day. Whether you're a longtime employee or a new hire, the Annual Company Picnic is a great opportunity to get to know your colleagues outside of the office and have some fun!"
                    {...register('details')} />
                </div>
              </label>

            </div>
            <div className=''>
              <button
                className='rounded border px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300'
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
        className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]'
        placeholder='Central Park, New York, NY, USA' />
      <ComboboxPopover className='rounded '>
        <ComboboxList>
          {status === 'OK' && data.map(({ placeId, description }, index) => (
            <ComboboxOption key={index} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
