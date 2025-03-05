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

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://plan-it.up.railway.app/api/guests', {
        method: 'POST',
        body: JSON.stringify({
          guestName: data.guestName,
          phoneNumber: data.phoneNumber,
          eventId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSubmitText(true);
      if (!response.ok) {
        throw new Error(`Failed to add data to DB: ${response.status}`);
      }

      const newGuest = await response.json();
      onAdd(newGuest);
      reset();
    } catch (error) {
      setNetworkError(true);
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick} className='rounded border px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300'>
        {showGuestForm ? 'Hide Form' : 'Invite a New Guest'}
      </button>
      <div className={`overflow-hidden transition-ease-in-out-1 ${showGuestForm ? 'max-h-64' : 'max-h-0 text-transparent'}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-2'>
            <label>
              <span className='text-lg font-medium'>Guest Name</span>
              <input {...register('guestName', { required: 'Guest name is required.' })} />
            </label>
            <p className='text-red-500'>{errors?.guestName?.message}</p>
          </div>
          <div>
            <label>
              <span className='text-lg font-medium'>Phone Number</span>
              <input {...register('phoneNumber', { required: 'Phone number is required.' })} />
            </label>
            <p className='text-red-500'>{errors?.phoneNumber?.message}</p>
          </div>
          <button type="submit">Send Invite to Guest</button>
        </form>
      </div>
    </div>
  );
}
