import React from 'react';

export default function EventDetailsField({ register, errors }) {
  return (
    <label className='pl-2 text-[#0d2137]'>
      <span className='text-xl font-medium'>Details</span>
      <div className='my-2'>
        <textarea
          rows='9'
          className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]'
          placeholder="It's that time of year again! The Annual Company Picnic is a beloved tradition that brings together employees, their families, and friends for a day of fun and relaxation. This year, we're excited to host the picnic in Central Park, which provides the perfect setting for a summer day outdoors."
          {...register('details')} />
      </div>
    </label>
  );
}
