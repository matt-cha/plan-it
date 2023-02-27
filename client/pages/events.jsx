import React, { useEffect, useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState();

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((events) => setEvents(events));
  }, []);

  return (
    <div className="container">
      <h1>All Events</h1>
      <hr />
      <div className="row">
        {
          events?.map((event) => (
            <div key={event.eventId} className="col-12 col-md-6 col-lg-4">
              <EventCard event={event} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

function EventCard({ event }) {
  // eslint-disable-next-line no-unused-vars
  const { eventId, name, startDate, endDate, location, details, image } = event;
  /* this anchor should go to event details at `#events?eventId=${eventId}` */
  return (
    <a
      href={`#events?eventId=${eventId}`}

      className="text-dark card mb-4 shadow-sm text-decoration-none">
      <div className='h-52 w-72 max-w-xs rounded bg-blue-300'>
        <img src={image} className="object-contain rounded h-full w-full" alt={name} />
        </div>


        <h5 className="card-title">{name}</h5>
        <p className="card-text text-secondary">{startDate} - {endDate}</p>
        <p className="card-text" >{location}</p>

    </a>
  );
}
