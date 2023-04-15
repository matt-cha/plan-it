import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function EndDateTime({ control, errors, startDate, endDate }) {
  useEffect(() => {
    if (errors?.name?.message) {
      document.getElementById('show-error').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errors]);

  const validateEndDate = selectedDate => {
    const endDate = new Date(selectedDate);
    if (startDate && endDate < new Date(startDate)) {
      return 'End date must be equal to or after start date';
    }
    return true;
  };

  return (
    <div className='flex-1 sm:ml-2'>
      <label className='cursor-pointer pl-2'>
        <span className="text-xl font-medium">End Date and Time</span>
        <div className='my-2'>
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: 'Please select an end date and time',
              validate: validateEndDate
            }}
            render={({ field }) =>
              <div tabIndex={0}>
                <Datetime
                  inputProps={{
                    className: 'pl-2 w-full mx-auto rounded-md shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]',
                    placeholder: '03/20/2023 11:00 AM'
                  }}
                  /* add onChange prop to update the field value */
                  onChange={selectedDate => field.onChange(selectedDate)}
                  value={field.value ? new Date(field.value) : null}
                />
              </div>
            }
          />
        </div>
        {errors.endDate && (
          <p id='show-error' className='text-red-500'>{errors.endDate.message}</p>
        )}
      </label>
    </div>
  );
}
