import React from 'react';

export default function EventDetailsField({ register, errors }) {
  return (
    <label className='pl-2 text-[#0d2137]'>
      <span className='text-lg font-medium'>Details</span>
      <div className='my-2'>
        <textarea
          rows='9'
          className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]'
          placeholder="It's that time of year again! The Annual Company Picnic is a beloved tradition that brings together employees, their families, and friends for a day of fun and relaxation. This year, we're excited to host the picnic in Central Park, which provides the perfect setting for a summer day outdoors. There will be plenty of delicious food to enjoy, including burgers, hot dogs, and vegetarian options, as well as refreshing drinks and desserts. For the kids, we'll have a range of activities and games, including face painting, a bounce house, and a scavenger hunt. Adults can take part in a friendly game of volleyball, cornhole, or just relax in the shade with a good book. We'll also have a photobooth set up to capture memories of the day. Whether you're a longtime employee or a new hire, the Annual Company Picnic is a great opportunity to get to know your colleagues outside of the office and have some fun!"
          {...register('details')} />
      </div>
    </label>
  );
}
