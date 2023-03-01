import React, { useMemo, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function GuestList() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const { eventId } = useParams();

  const onSubmit = async data => {
    const debug = false;
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('line:14 data:::browser only ', data);
      return;
    }
    try {
      await fetch('/api/guests', {
        method: 'POST',
        body: JSON.stringify({
          data,
          eventId
        }),
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

  return (
    <div className='h-screen'>
      <p className=''>Guest List Form starts</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Guest Name
            <div>
              <input type='text' className='container mx-auto border rounded border-black bg-green-300' {...register('guest', {
                required: 'Guest name is required.',
                minLength: {
                  value: 2,
                  message: 'Guest name cannot be shorter than 2 characters'
                },
                maxLength: {
                  value: 20,
                  message: 'Guest name cannot be longer than 20 characters'
                }
              })} />
            </div>
            <div>
              <p>{errors?.guest?.message}</p>
            </div>
          </label>
        </div>
        <div>
          <label>Phone Number
            <div>
              <input type='number' className='container mx-auto border rounded border-black bg-green-300' {...register('phoneNumber', {
                required: 'Phone number is required.',
                minLength: {
                  value: 2,
                  message: 'Phone number cannot be shorter than 2 characters'
                },
                maxLength: {
                  value: 10,
                  message: 'Phone number cannot be longer than 10 characters'
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
  )
}
