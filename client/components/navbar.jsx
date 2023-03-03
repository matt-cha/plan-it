import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <nav className='fixed top-0 z-30 w-full'>
        <div className="mx-auto p-2 bg-[#f2dec8] flex justify-between flex-wrap ">
          <Link to='/events'>
            <p className='bg-[#c8dcf2] text-[#0d213] rounded-md'>Events</p>
          </Link>

          <p className='bg-[#C8DCF2]'>acoolprojectname</p>
          <Link to='/create-event'>
            <button className='bg-[#C8DCF2] rounded-md'>Create Event</button>
          </Link>

        </div>
      </nav>
    </div>
  );
}
