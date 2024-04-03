import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function StartDateTime({ control, errors, endDate }) {
  useEffect(() => {
    if (errors?.name?.message) {
      document.getElementById('show-error').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errors]);

  const validateStartDate = selectedDate => {
    if (selectedDate <= endDate) {
      return 'Start date must be before end date';
    }
    return true;
  };

  return (
    <div className='flex-1 sm:mr-2'>
      <label className='cursor-pointer pl-2'>
        <span className="text-xl font-medium">Start Date and Time</span>
        <div className='my-2'>
          {/* Controller is used to control the input value of the input */}
          <Controller
              name="startDate"
              control={control}
              rules={{
                required: 'Please select a start date and time',
                validate: validateStartDate
              }}
              /* render returns the component for the Controller component to render and field is the object that binds the form field to the input element */
              render={({ field }) =>
                <div tabIndex={0}>
                  <Datetime
                  inputProps={{
                    className: 'pl-2 w-full mx-auto rounded-md shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]',
                    placeholder: '03/20/2025 11:00 AM'
                  }}
                  /* add onChange prop to update the field value */
                  onChange={selectedDate => field.onChange(selectedDate)}
                  value={field.value ? new Date(field.value) : null}
                />
                </div>
            }
          />
        </div>
        {/* if the left of the operator is truthy, right side is evaluated and error message is shown */}
        {errors.startDate && (
          <p id='show-error' className='text-red-500'>{errors.startDate.message}</p>
        )}
      </label>
    </div>
  );
}
