import React from 'react';
import {Link} from "react-router-dom"
export default function Navbar() {
  return (
    <div>
      <nav className='sticky top-0 z-30'>
        <div className="w-full mx-auto p-2 bg-[#f2dec8] flex justify-between flex-wrap ">
          <Link to='/events'>
            <box-icon name='home' className='text-[#f2dec8] bg-[#f2dec8]' />
          </Link>

          <p className='bg-blue-300'>acoolprojectname</p>
          <Link to='/create-event'>
            <button className='bg-yellow-500 '>Create Event</button>
          </Link>

        </div>
      </nav>
    </div>
  );
}
