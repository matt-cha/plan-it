import React from 'react';
import { useForm } from 'react-hook-form';

export default function Event() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
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
    <>
      <div>
        <h1 className='text-2xl bg-green-100'>event form here</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Event Name
          <input type='text' className='border-solid border-black bg-green-100' {...register('name', {
            required: 'This is required.',
            minLength: {
              value: 4,
              message: 'Minimium event name is 4'
            },
            maxLength: {
              value: 15,
              message: 'Maximum event name is 15'
            }
          })} />
          <p>{errors.name?.message}</p>
        </label>

        <label>Details
          <input className='border-solid border-black bg-green-300' {...register('details')} />
        </label>

        <input className='border-solid border-black bg-green-500' type="submit" />

      </form>
      <div/>
    </>

  );
}

/* const onSubmit = async data => {
  try {
    const formData = await new FormData();
    formData.append('name', data.name);
    formData.append('details', data.details);

    const response = await fetch('/api/events', {
      method: 'POST',
      body: formData
    });
    const responseData = await response.json();
    console.log('line:17 responseData::: ', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
}; */
