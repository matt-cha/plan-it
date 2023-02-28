import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

export default function Events() {
  const [events, setEvents] = useState();

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((events) => setEvents(events));
  }, []);

  return (
    <div className="">
      <h1>All Events</h1>

      <div className="">
        {
          events?.map((event) => (
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
  const { eventId, name, startDate, endDate, location, details, image } = event;
  return (
    <Link to={`/events/${eventId}`}>
      <div className='h-52 w-72 max-w-xs rounded bg-blue-300'>
        <img src={image} className="object-contain rounded h-full w-full" />
      </div>
      <div>
        <h5 className="">{name}</h5>
      </div>
      <div>
        <p className="">{startDate} - {endDate}</p>
      </div>
      <div>
        <p className="" >{location}</p>
      </div>
    </Link>
  );
}
