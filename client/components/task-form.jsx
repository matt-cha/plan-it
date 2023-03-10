import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNetworkError } from './network-error';
export default function TaskForm({ onAdd }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { eventId } = useParams();
  const { setNetworkError } = useNetworkError();

  function handleClick() {
    setShowTaskForm(!showTaskForm);
  }

  const onSubmit = async data => {
    try {
      const response = await fetch('/api/tasks', {

        method: 'POST',
        body: JSON.stringify({
          data,
          eventId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to add data to DB2##: ${response.status}`);
      }
      onAdd(await response.json());
      // eslint-disable-next-line no-console
      console.log('data added successfully');
    } catch (error) {
      setNetworkError(true);
      console.error('Error line :', error);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <button
          onClick={handleClick}
          className='rounded border w-full px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300'
        >{showTaskForm ? 'Hide Task Form' : 'Create a New Task'}
        </button>
      </div>
      <div className={`overflow-hidden transition-ease-in-out-1 ${showTaskForm ? 'max-h-60' : 'max-h-0 text-transparent'}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-2'>
            <label className='pl-2 cursor-pointer'>
              <span className='text-lg font-medium'>Task</span>
              <div>
                <input type='text' className='pl-2 w-full mx-auto rounded-md  shadow-sm py-2 px-3 border border-[#f2dec8] placeholder-gray-400 focus:outline-none focus:ring-[#C8F2DE] focus:border-[#C8F2DE]' placeholder='Contact vendors about food options' {...register('taskName', {
                  required: 'Task is required.',
                  minLength: {
                    value: 1,
                    message: 'Task name cannot be shorter than 1 characters'
                  },
                  maxLength: {
                    value: 25,
                    message: 'Task name cannot be longer than 25 characters'
                  }
                })} />
              </div>
              <div>
                <p>{errors?.taskName?.message}</p>
              </div>
            </label>
          </div>
          <div className='my-2'>
            <button
              className='rounded border px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300'
              type="submit"
              value='Create Event'>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
