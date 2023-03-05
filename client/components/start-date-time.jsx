import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function StartDateTime({ control }) {
  const { formState: { errors } } = useForm();
  return (
    <div className='flex-1 sm:mr-2'>
      <label className='cursor-pointer pl-2 text-[#0d2137]'>
        <span className="text-lg font-medium">Start Date and Time</span>
        <div className='my-2'>
          <Controller
              name="startDate"
              control={control}
              rules={{ required: 'Please select a start date and time' }}
              render={({ field }) =>
                <Datetime
                  inputProps={{
                    className: 'pl-2 w-full mx-auto rounded-md shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]',
                    placeholder: '03/20/2023 11:00AM'
                  }}
                  {...field}
                />}
            />
        </div>
        {errors.startDate && (
        <p className='text-red-50'>{errors.startDate.message}</p>
        )}
      </label>
    </div>
  );
}
