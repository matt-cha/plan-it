import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import '@reach/combobox/styles.css'; // maybe not needed
import { useNavigate } from 'react-router-dom';
import StartDateTime from '../components/start-date-time';
import EndDateTime from '../components/end-date-time';
import EventNameField from '../components/event-name-field';
/* import ImageUpload from '../components/image-upload'; */
import EventDetailsField from '../components/event-details-field';
import Location from '../components/location';
export default function CreateEvent() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const [imageUrl, setImageUrl] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

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
      console.log('data:::data added to DB ', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className=' flex-wrap justify-center flex m-3'>
      <div className='w-full max-w-3xl'>
        <div className='first form'>
          <form onSubmit={handleSubmit(onSubmit)} className=''>

            <div className='event-name'>
              <EventNameField register={register} errors={errors} />
            </div>

            <div className="date-and-time flex flex-col sm:flex-row">
              <StartDateTime
                name="startDate"
                control={control}
                value={startDate}
                onChange={setStartDate}
              />
              <EndDateTime
                name="endDate"
                control={control}
                value={endDate}
                onChange={setEndDate}
              />
            </div>

            <div className='new-image-submission'>
              {/* <ImageUpload register={register} onChange={handleFileChange} /> */}
              <label htmlFor="file-upload-button" className="pl-2 rounded max-w-min text-[#0d2137]  ">
                <span className="text-xl font-medium">Cover Photo</span>
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
                    : (<div className="flex items-center justify-center h-full w-full text-gray-600">Choose a file</div>
                      )} </div>
              </label>
            </div>

            <div className='google-maps'>
              <Location
                name="location"
                control={control}
                value={location}
                onChange={setLocation}
              />
            </div>

            <div className='details my-2'>
              <EventDetailsField register={register} errors={errors} />
            </div>
            <div className='submit-button'>
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
