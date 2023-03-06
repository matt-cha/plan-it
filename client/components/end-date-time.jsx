import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function EndDateTime({ control }) {
  const { formState: { errors } } = useForm();
  return (
    <div className='flex-1 sm:ml-2'>
      <label className='cursor-pointer pl-2 text-[#0d2137]'>
        <span className="text-xl font-medium">End Date and Time</span>
        <div className='my-2'>
          <Controller
            name="endDate"
            control={control}
            rules={{ required: 'Please select an end date and time' }}
            render={({ field }) =>
              <Datetime
                inputProps={{
                  className: 'pl-2 w-full mx-auto rounded-md shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]',
                  placeholder: '03/20/2023 5:00 PM'
                }}
                {...field}
              />}
          />
        </div>
        {errors.endDate && (
          <p className='text-red-50'>{errors.endDate.message}</p>
        )}
      </label>
    </div>
  );
}
