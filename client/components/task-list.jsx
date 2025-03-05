import React from 'react';

export default function TaskList({ tasks }) {
  return (
    <>
      {tasks.length === 0 ? (
        <p>No tasks have been added</p>
      ) : (
        tasks.map(task => (
          <div key={task.taskId}>
            <p>{task.taskName}</p>
          </div>
        ))
      )}
    </>
  );
}
