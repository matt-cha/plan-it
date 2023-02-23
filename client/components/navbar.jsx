import React from 'react';

export default function Navbar() {
  return (
    <div>
      <nav className=' sticky top-0 z-30'>
        <div className="container max-w-xs md:container lg:container xl:container xxl:container mx-auto p-2 bg-teal-300 flex justify-between flex-wrap ">
          <box-icon name='home' className='text-green-500' />
          <p className='bg-blue-300'>acoolprojectname</p>
          <button className='bg-yellow-500'>Sobm1t</button>
        </div>
      </nav>
    </div>
  );
}
