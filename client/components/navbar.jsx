import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const eventId = pathArray[pathArray.length - 1];
  const navigate = useNavigate();
  const handleClick = async data => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 204) {
        navigate('/events');
      } else {
        const json = await response.json();
        navigate('/events');
      }
    } catch (error) {
      console.error('console.error:', error);
    }
  };

  return (
    <>
      <nav className='fixed top-0 z-10 w-full'>
        <div className="p-2 bg-[#f2dec8] flex justify-between items-center">
          <div className='flex max-w-full'>
            <div className='max-w-[25px] mx-1 flex items-center'>
              <img className='max-w-full h-auto' src='/images/icon.webp' alt='Logo' />
            </div>
            <p className='rounded px-1 py-1 text-xl font-medium'>Plan It</p>
          </div>
          <div className='flex'>
            <Link to='/'>
              <button className='rounded-md bg-[#C8F2DE] hover:bg-[#9fe8c5] focus:outline-none px-2 py-1 transition-colors duration-300'><i className="fa-solid fa-plus mr-1" />New Event</button>
            </Link>
          </div>
        </div>
      </nav>
      <nav className='fixed top-10 z-10 w-full'>
        <div className="p-2 bg-[#f2dec8] flex items-center">
          <Link to='/events'>
            <button className='rounded-md bg-[#C8F2DE] hover:bg-[#9fe8c5] focus:outline-none ml-1 px-2 py-1 transition-colors duration-300'>Event List</button>
          </Link>
          {!isNaN(eventId) && (
            <Link to='/events'>
              <div className='flex mx-4'>
                <button onClick={handleClick} className='rounded-md bg-[#C8F2DE] hover:bg-[#9fe8c5] focus:outline-none px-2 py-1 transition-colors duration-300'><i className="fa-solid fa-trash-alt mr-1" />Delete Event</button>
              </div>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
