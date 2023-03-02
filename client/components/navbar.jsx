import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <nav className='sticky top-0 z-30'>
        <div className="w-full mx-auto p-2 bg-[#f2dec8] flex justify-between flex-wrap ">
          <Link to='/events'>
            <p className='bg-[#c8dcf2] text-[#0d213] rounded-md'>Events</p>
          </Link>

          <p className='bg-[#dec8f2]'>acoolprojectname</p>
          <Link to='/create-event'>
            <button className='bg-[#f2c8dc] rounded-md'>Create Event</button>
          </Link>

        </div>
      </nav>
    </div>
  );
}
