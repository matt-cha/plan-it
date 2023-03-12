import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <p>Page not found go back!</p>
      <p>Click <Link to='/events'> <span className='text-8xl'>here</span> </Link> to go back to the events page.</p>
    </div>
  );
}
