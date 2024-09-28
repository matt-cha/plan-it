import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNetworkError } from './network-error';

export default function GuestForm({ onAdd }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { eventId } = useParams();
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [submitText, setSubmitText] = useState(false);
  const { setNetworkError } = useNetworkError();

  function handleClick() {
    setShowGuestForm(!showGuestForm);
  }

  const onSubmit = async data => {
    try {
      const response = await fetch('https://plan-it.up.railway.app/api/guests', {
        method: 'POST',
        body: JSON.stringify({
          data,
          eventId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSubmitText(true);
      if (!response.ok) {
        throw new Error(`Failed to add data to DB : ${response.status}`);
      }
      onAdd(await response.json());
      const alertTextMessage = true;
      if (alertTextMessage) {
        /* Prevent text message intentionally due to API costs. */
        const message = 'Please contact owner to send the text message, intentionlly locked due to API costs';
        alert(message);
        return;
      }
      const messageResponse = await fetch(`https://plan-it.up.railway.app/api/events/${eventId}/guests/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: '+18446990230',
          to: data.phoneNumber,
          body: `Event link: http://localhost:3000/events/${eventId}`
        })
      });
      if (!messageResponse.ok) {
        throw new Error(`Failed to send message: ${messageResponse.status}`);
      }
    } catch (error) {
      setNetworkError(true);
      console.error('Error', error);
    }
  };

  return (
    <div className=''>
      <div>
        <button
          onClick={handleClick}
          className='rounded border w-full px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300'
          >{showGuestForm ? 'Hide Form' : 'Invite a New Guest'}
        </button>
      </div>

      <div className={`overflow-hidden transition-ease-in-out-1 ${showGuestForm ? 'max-h-64 ' : 'max-h-0 text-transparent'}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-2'>
            <label className='pl-2 cursor-pointer'>
              <span className='text-lg font-medium'>Guest Name</span>
              <div>
                <input type='text' className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]' placeholder='Anthony Davis' {...register('guestName', {
                  required: 'Guest name is required.',
                  minLength: {
                    value: 1,
                    message: 'Guest name cannot be shorter than 1 characters'
                  },
                  maxLength: {
                    value: 25,
                    message: 'Guest name cannot be longer than 25 characters'
                  }
                })} />
              </div>
              <div>
                <p className='text-red-500'>{errors?.guestName?.message}</p>
              </div>
            </label>
          </div>
          <div>
            <label className='pl-2 cursor-pointer'>
              <span className='text-lg font-medium'>Phone Number</span>
              <div>
                <input type='text' className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]' placeholder='8186453513' {...register('phoneNumber', {
                  required: 'Phone number is required.',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a valid 10-digit phone number.'
                  }
                })} />
              </div>
              <div>
                <p className='text-red-500'>{errors?.phoneNumber?.message}</p>
              </div>
            </label>
          </div>
          <div className='my-2'>
            <button
              className='rounded border px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300'
              type="submit"
              value='Create Event'>
              {/* Change text message upon submission to notify that text was not sent until ready to be used by demo trial */}
              {submitText ? 'Please contact owner to send the text message, intentionlly locked due to API costs' : 'Send Invite to Guest Phone Number' }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
