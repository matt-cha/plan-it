import React from 'react';
import { useForm } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';

export default function Event() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    try {
      await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='text-white'>Event Name
          <div>
            <input type='text' className='text-black border rounded border-black bg-green-300' {...register('name', {
              required: 'This is required.',
              minLength: {
                value: 4,
                message: 'Minimium event name is 4'
              },
              maxLength: {
                value: 20,
                message: 'Maximum event name is 20'
              }
            })} />
          </div>
          <div>
            <p>{errors.name?.message}</p>
          </div>
        </label>
      </div>

      <label className='text-white'>Start Date and Time
        <div>
          <Flatpickr {...register('startDate')} className='text-black rounded' options={{
            minDate: 'today',
            altInput: true,
            altFormat: 'F j, Y',
            enableTime: true,
            dateFormat: 'Y-m-d'
          }}
          />
        </div>

      </label>
      <label className='text-white'>End Date and Time
        <div>
          <Flatpickr {...register('endDate')} className='text-black rounded' options={{
            altInput: true,
            altFormat: 'F j, Y',
            dateFormat: 'Y-m-d',
            enableTime: true,
            minDate: 'today'
          }} />
        </div>

      </label>

      <div>
        <label className='text-white'>Details
          <div>
            <textarea className='text-black border rounded border-black bg-green-300' {...register('details')} />

          </div>
        </label>
      </div>
      <div>
        <input className='rounded right-0 top-0 border border-black bg-red-500' type="submit" />

      </div>
    </form>
  );
}
