import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNetworkError } from './network-error';

export default function TaskForm({ onAdd }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { eventId } = useParams();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { setNetworkError } = useNetworkError();

  function handleClick() {
    setShowTaskForm(!showTaskForm);
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://plan-it.up.railway.app/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          taskName: data.taskName,
          eventId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to add data to DB: ${response.status}`);
      }

      const newTask = await response.json();
      onAdd(newTask); // Add task to the parent component's state
      reset();
    } catch (error) {
      setNetworkError(true);
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        {showTaskForm ? 'Hide Task Form' : 'Create a New Task'}
      </button>
      <div className={`overflow-hidden transition-ease-in-out-1 ${showTaskForm ? 'max-h-60' : 'max-h-0 text-transparent'}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-2'>
            <label>
              Task
              <input {...register('taskName', { required: 'Task is required.' })} />
            </label>
            <p className='text-red-500'>{errors?.taskName?.message}</p>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}
