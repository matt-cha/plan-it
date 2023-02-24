import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function Event() {
  const { control, register, reset, handleSubmit, formState: { errors } } = useForm();
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const onSubmit = async data => {
    const debug = true;
    if (debug) {
      // eslint-disable-next-line
      console.log('line:14 data::: ', data);
      reset();
      return;
    }

    try {
      await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      reset({
        startDate: undefined,
        endDate: undefined
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
              rules={{ required: true }}
              render={({ field }) => <Datetime {...field} ref={startDateRef}

              />}
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
              rules={{ required: true }} // optional? decide this
              render={({ field }) => <Datetime {...field} ref={endDateRef} />}
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
        <input
          className='rounded right-0 top-0 border border-black bg-red-500'
          type="submit"
          />
      </div>
    </form>
  );
}
