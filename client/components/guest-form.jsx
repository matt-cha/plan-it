import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function GuestForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { eventId } = useParams();

  const onSubmit = async data => {
    const debug = false;
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('line:14 data:::browser only ', data);
      return;
    }
    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        body: JSON.stringify({
          data,
          eventId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to add data to DB : ${response.status}`);
      }
      // eslint-disable-next-line no-console
      console.log('line:14 data:::data added to DB ', data);

      const messageResponse = await fetch(`/api/events/${eventId}/guests/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: '+18446990230',
          to: data.phoneNumber,
          body: 'join ma event http://localhost:3000/events/1'
        })
      });
      if (!messageResponse.ok) {
        throw new Error(`Failed to send message: ${messageResponse.status}`);
      }
      // eslint-disable-next-line no-console
      console.log('message was sent successfully');
    } catch (error) {
      console.error('Error line 39:', error);
    }
  };

  return (
    <div className='h-screen'>
      <p className=''>Guest List Form. You agree to be sent a text that will link you an RSVP to the event page.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Guest Name
            <div>
              <input type='text' className='container mx-auto border rounded border-black bg-green-300' {...register('guestName', {
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
              <p>{errors?.guestName?.message}</p>
            </div>
          </label>
        </div>
        <div>
          <label>Phone Number
            <div>
              <input type='text' className='container mx-auto border rounded border-black bg-green-300' {...register('phoneNumber', {
                required: 'Phone number is required.',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Please enter a valid 10-digit phone number.'
                }
              })} />
            </div>
            <div>
              <p>{errors?.phoneNumber?.message}</p>
            </div>
          </label>
        </div>
        <div className='m-2'>
          <button
            className='rounded right-0 top-0 border border-black bg-red-300'
            type="submit"
            value='Create Event'>
            Invite Guest
          </button>
        </div>
      </form>
    </div>
  );
}
