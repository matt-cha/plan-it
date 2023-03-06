import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../lib/format-date';

export default function Events() {
  const [events, setEvents] = useState();

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(events => setEvents(events));
  }, []);

  return (
    <div className="flex-wrap justify-center flex m-3">
      <div className='w-full max-w-3xl'>
        {
          events?.length > 0
            ? events?.map(event => (
              <div key={event.eventId} className="">
                <EventCard event={event} />
              </div>
            ))
            : <p>No events have been made. Click <Link to='/'><span className='text-6xl'>here</span></Link> to make one!</p>
        }
      </div>
    </div>
  );
}

function EventCard({ event }) {
  const { eventId, name, startDate, location, image } = event;
  return (
    <Link to={`/events/${eventId}`}>
      <div className='h-96 min-w-min max-w-3xl mx-auto rounded shadow-lg bg-gradient-to-b from-[#f2dec8] to-[#C8F2DE] hover:from-[#edd2b3] hover:to-[#b3edd2] transition-all duration-1000'>
        <img src={`/images/${image}`} className="object-contain rounded h-full w-full" />
      </div>
      <div className='my-1'>
        <p className="text-3xl py-2 font-bold text-[#0d2137]">{name}</p>
      </div>
      <div className='flex my-2'>
        <p className='flex'>
          <i className="fa-regular fa-clock mr-2 mt-1 text-[#5f6e82]" />
          <span className=' '>{formatDate(startDate)}</span>
        </p>
      </div>
      <div className='flex my-2'>
        <p className='flex'>
          <i className="fa-solid fa-location-dot mr-2.5 text-lg text-[#EA4335]" />
          <span className=' text-[#0d2137] font-bold'>{location}</span>
        </p>
      </div>
    </Link>
  );
}
