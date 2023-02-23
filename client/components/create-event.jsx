import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function Event() {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async data => {
    // eslint-disable-next-line no-use-before-define
    /*  console.log('line:14 data::: ', data);
     return; */
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
            <p>{errors?.name?.message}</p>
          </div>
        </label>
      </div>
      <div>
        <label> <span className='text-white'>Start Date and Time</span>
          <div>
            <Controller
            name="startDate"
            control={control}
            required render={({ field }) => (
              <Datetime
              {...field}
              />
            )}
             />
          </div>
        </label>
      </div>
      <div>
        <label><span className='text-white'>End Date and Time</span>
          <div>
            <Controller
              name="endDate"
              control={control}
              required render={({ field }) => (
                <Datetime
                  {...field}
                />
              )}
            />
          </div>
        </label>
      </div>
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
