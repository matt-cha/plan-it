import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='fixed top-0 z-10 w-full'>
      <div className="p-2 bg-[#f2dec8] flex justify-between items-center">
        <div className='flex'>
          <p className='rounded text-[#0d2137]  mr-4 px-2 py-1 text-xl font-medium'>acoolprojectname</p>
        </div>
        <div className='flex'>
          <Link to='/events'>
            <button className='rounded-md text-[#0d2137] bg-[#C8F2DE] hover:bg-[#9fe8c5] focus:outline-none px-3 py-1 mr-4 transition-colors duration-300'>All</button>
          </Link>
          <Link to='/'>
            <button className='rounded-md text-[#0d2137] bg-[#C8F2DE] hover:bg-[#9fe8c5] focus:outline-none px-2 py-1 transition-colors duration-300'>New</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
