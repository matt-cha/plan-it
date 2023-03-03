import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <p>Page not found go back!</p>
      <p>Click <Link to='/events'> <span className='text-8xl'>here</span> </Link> to go back to the events page.</p>
      {/*
      <div>
        <p>Individual Event Page </p>
        <box-icon name='chevron-left' ></box-icon>
      </div>
      <div className='h-52 w-72 max-w-xs rounded bg-blue-300'>
        <img className="object-contain rounded h-full w-full" src='https://memestemplates.in/uploads/1643224858.jpeg'></img>
      </div>
      <div className='h-52 w-72 max-w-xs rounded bg-green-300'>
        <img className="object-contain rounded h-full w-full" src='https://d.newsweek.com/en/full/2042519/captain-jack-sparrow-run-viral-tiktok.jpg?w=1600&h=1200&q=88&f=600b670045f214f172807b570e075526'></img>
      </div>
      <div className='h-52 w-72 max-w-xs rounded bg-blue-300'>
        <img className="object-contain rounded h-full w-full" src='https://i.redd.it/n2o4dmyytme91.jpg'></img>
      </div>
      <div className='h-52 w-72 max-w-xs rounded bg-green-300'>
        <img className="object-contain rounded h-full w-full" src='https://i.redd.it/ttok7ngyylw91.jpg'></img>
      </div>
      <div className='h-52 w-72 max-w-xs rounded bg-blue-300'>
        <img className="object-contain rounded h-full w-full" src='https://i.redd.it/vldfqmszljy91.jpg'></img>
      </div> */}
    </div>
  );
}
