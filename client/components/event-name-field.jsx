import React from 'react';

export default function EventNameField({ register, errors }) {

  return (
    <label className='pl-2 text-[#0d2137] cursor-pointer'>
      <span className="text-xl font-medium">Event Name</span>
      <div className='my-2'>
        <input
          type='text'
          autoFocus
          placeholder='Annual Company Picnic 2023'
          className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]'
          {...register('name', {
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
  );
}
