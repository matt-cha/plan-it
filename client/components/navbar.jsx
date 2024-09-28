import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const eventId = pathArray[pathArray.length - 1];
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDeleteId, setEventToDeleteId] = useState(null);

  function handleDeleteClick() {
    setShowDeleteModal(true);
    setEventToDeleteId(eventId);

  }

  const handleDelete = async data => {
    try {
      const response = await fetch(`/api/events/${eventToDeleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 204) {
        navigate('/events');
        setEventToDeleteId(null);
        setShowDeleteModal(false);
      } else {

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
          {pathArray[1] === 'events' && !isNaN(eventId) && (
            <Link to={`/events/${eventId}`}>
              <div className='flex mx-4'>
                <button onClick={handleDeleteClick} className='rounded-md bg-[#C8F2DE] hover:bg-[#9fe8c5] focus:outline-none px-2 py-1 transition-colors duration-300'><i className="fa-solid fa-trash-alt mr-1" />Delete Event</button>
              </div>
            </Link>
          )}
        </div>
      </nav>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded">
            <p>Are you sure you want to delete this event?</p>
            <div className="mt-4 flex justify-between border-t border-gray-300 pt-4">
              <button className="w-full bg-[#f2c9c8] hover:bg-[#e8a19f] focus:outline-none px-2 mr-2 transition-colors duration-300 py-2  rounded-md" onClick={handleDelete}>Delete</button>
              <button className="w-full bg-[#C8F2DE] hover:bg-[#9fe8c5] focus:outline-none px-2 ml-2 transition-colors duration-300 py-2 rounded-md" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
