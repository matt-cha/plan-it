import React, { useState } from 'react';

export default function TaskList({ tasks }) {
  const [showTaskList, setShowTaskList] = useState(false);
  function handleClick() {
    setShowTaskList(!showTaskList);
  }

  return (
    <>
      <div className='flex justify-center items-center mt-2'>
        <button onClick={handleClick} className='rounded border w-full px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300'>{showTaskList ? 'Hide Tasks' : 'Show Tasks'}</button>
      </div>
      <div className={`overflow-hidden transition-ease-in-out-1 ${showTaskList ? 'max-h-60' : 'max-h-0 text-transparent'}`}>
        {
          tasks?.map(task => (
            <div key={task.taskId} className='my-2'>
              <p>{task.taskName}</p>
            </div>
          ))
        }
        {tasks.length === 0 && <p className='my-2 text-red-500'>No tasks have been added</p>}
      </div>
    </>
  );
}
