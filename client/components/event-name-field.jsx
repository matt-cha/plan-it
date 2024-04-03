import React, { useEffect } from 'react';

export default function EventNameField({ register, errors }) {

  useEffect(() => {
    if (errors?.name?.message) {
      document.getElementById('show-error').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errors]);

  return (
    <label className='pl-2 cursor-pointer'>
      <span className="text-xl font-medium">Event Name</span>
      <div className='my-2'>
        <input
          type='text'
          autoFocus
          placeholder='Annual Company Picnic 2024'
          className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]'
         /* register prop with spread syntax to spread the validation rules for event name */
          {...register('name', {
            required: 'Event name is required.',
            minLength: {
              value: 4,
              message: 'Event name cannot be shorter than 4 characters'
            },
            maxLength: {
              value: 50,
              message: 'Event name cannot be longer than 50 characters'
            }
          })} />
      </div>
      <div>
        {/* if there is an error message for the name field, display */}
        <p id='show-error' className='text-red-500'>{errors?.name?.message}</p>
      </div>
    </label>
  );
}
