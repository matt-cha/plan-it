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
      <div className='h-96 min-w-min max-w-3xl mx-auto rounded bg-gradient-to-b from-[#f2dec8] to-[#C8F2DE]'>
        <img src={`/images/${image}`} className="object-contain rounded h-full w-full" />
      </div>
      <div className='my-2'>
        <p className=" text-2xl text-[#0d2137]">{name}</p>
      </div>
      <div className='my-2'>
        <p className=" text-[#0d2137]">
          <i className="fa-solid fa-clock mr-2" />
          {formatDate(startDate)}</p>
      </div>
      <div className='my-2'>
        <p className="mx-auto" >
          <i className="fa-solid fa-location-dot mr-2 text-lg" />
          {location}</p>
      </div>
    </Link>
  );
}
