import React, { useEffect, useState } from 'react';

export default function Event({ eventId}) {
  const [event, setEvent] = useState();

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((event) => setEvent(event));
  }, []);

  if (!event) return null;
  const {
    name, startDate, endDate, location, details, image,
  } = event;
// test

  return (
    <>
      <div>
        <box-icon name='chevron-left' ></box-icon>
        <p>back arrow here </p>
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
      </div>


      <div>
        <img src={image}></img>
      </div>
      <div>
        <h2>{name}</h2>
      </div>
      <div>
        <p>{startDate} - {endDate}</p>
      </div>
      <div>
        <p>{location}</p>
      </div>
    </>

  );
}
