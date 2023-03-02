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
          events?.map(event => (
            <div key={event.eventId} className="">
              <EventCard event={event} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

function EventCard({ event }) {
  const { eventId, name, startDate, location, image } = event;
  return (
    <Link to={`/events/${eventId}`}>
      <div className='h-96 min-w-min max-w-3xl mx-auto rounded bg-gradient-to-r from-[#f2dec8] to-[#C8F2DE]'>
        <img src={image} className="object-contain rounded h-full w-full" />
      </div>
      <div>
        <h5 className="mx-auto">
          <i className="fa-solid fa-calendar-days" />
          {name}</h5>
      </div>
      <div>
        <p className="mx-auto">
          <i className="fa-solid fa-clock" />
          {formatDate(startDate)}</p>
      </div>
      <div>
        <p className="mx-auto" >
          <i className="fa-solid fa-location-dot" />
          {location}</p>
      </div>
    </Link>
  );
}
