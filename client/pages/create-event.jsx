import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '@reach/combobox/styles.css';
import { useNavigate } from 'react-router-dom';
import StartDateTime from '../components/start-date-time';
import EndDateTime from '../components/end-date-time';
import EventNameField from '../components/event-name-field';
import EventDetailsField from '../components/event-details-field';
import Location from '../components/location';
/* Import all the node packages and react components needed.  */

export default function CreateEvent() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [imageUrl, setImageUrl] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const [startEnd, setStartEnd] = useState(false);
  /**
 * Function that sets the Image URL state with the URL of the selected file
 * @param {object} event - The object containing the file to be uploaded
 */
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  /**
   * Function to handle form submission to create an event
   * @param {Object} data - The data object containing the event name, start and end date, location, details and image file
   */
  const onSubmit = async data => {
    if (data.startDate > data.endDate) {
      setStartEnd(true);
      return;
    }
    try {
      const formData = new FormData();
      /* Create a new form data object to be sent to the server */
      formData.append('name', data.name);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('location', data.location);
      formData.append('details', data.details);
      formData.append('image', data.image[0]);
      /* Send the form data to the server using a POST request to the '/api/events' endpoint and wait for it to complete */
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.statusText}`);
      }
      /* Extract the event ID from the response JSON and navigate to the new event page */
      const { eventId } = await response.json();
      navigate(`/events/${eventId}`);
      // eslint-disable-next-line no-console
      console.log('data added to DB', data);
    } catch (error) {
      if (error instanceof TypeError) {
        console.error('Error:', error.message);
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  return (
    <div className=' flex-wrap justify-center flex m-3'>
      <div className='w-full max-w-3xl'>
        {/* React Hook Form starts */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='event-name'>
            <EventNameField register={register} errors={errors} />
          </div>

          <div className="date-and-time flex flex-col sm:flex-row">
            <StartDateTime
                name="startDate"
                control={control}
                value={startDate}
                onChange={setStartDate}
                errors={errors}
                endDate={endDate}
              />
            <EndDateTime
                name="endDate"
                control={control}
                value={endDate}
                onChange={setEndDate}
                errors={errors}
                startDate={startDate}
              />

          </div>
          {startEnd && <div><p className='text-red-500'>End date and time must be after the start date and time</p></div>}
          <div className='new-image-submission'>
            <label htmlFor="file-upload-button" className="pl-2 rounded max-w-min text-[#0d2137]  ">
              <span className="text-xl font-medium">Cover Photo</span>
              <div className='my-2'>
                {/* input field to upload images, sr-only to make visible only for screen readers
                when a file is uploaded, onChange property runs the function that sets Image URL state */}
                <input
                    {...register('image')}
                    required
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                    id='file-upload-button'
                    accept=".png, .jpg, .jpeg, .gif, .webp" />
              </div>
              <div className='cursor-pointer h-64 max-w-xs sm:h-96 sm:max-w-3xl mx-auto rounded bg-gradient-to-b my-2 from-[#f2dec8] to-[#C8F2DE] hover:from-[#edd2b3] hover:to-[#b3edd2] transition-all duration-300'>
                {/* ternary operator conditionally shows text or image if imageURL is truthy or falsy so users know to upload an image here */}
                {imageUrl
                  ? (<img className="object-contain rounded h-full w-full" src={imageUrl} />)
                  : (<div className="flex items-center justify-center h-full w-full text-lg text-gray-600">Choose a file</div>
                    )} </div>
            </label>
          </div>

          <div className='google-maps'>
            <Location
                name="location"
                control={control}
                value={location}
                onChange={setLocation}
                errors={errors}
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
  );
}
