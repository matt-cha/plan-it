
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import formatDate from '../lib/format-date';

export default function Event( ) {
  const [event, setEvent] = useState();
  const { eventId } = useParams();

  useEffect(() => {
    console.log('line:9 eventId::: ', eventId);
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((event) => {
        setEvent(event)
        console.log('line:10 event::: ', event);
      })
  }, []);

  if (!event) return null;
  const { name, startDate, endDate, location, details, image } = event;

  return (
    <>
      <div>
        <box-icon name='chevron-left' ></box-icon>
      </div>
      <div className='items-center content-center flex h-52 w-72 max-w-xs rounded bg-blue-300'>
        <img className="object-contain rounded h-full w-full" src={image}></img>
      </div>
      <div className='flex m-2'>
        <box-icon name='calendar-event'></box-icon>
        <h2>{name}</h2>
      </div>
      <div className='flex m-2'>
        <box-icon name='time' type='solid' ></box-icon>
        <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
      </div>
      <div className='flex m-2'>
        <box-icon name='map' ></box-icon>
        <p>{location}</p>
      </div>
      <div className='flex m-2 '>
        <box-icon name='detail' type='solid' ></box-icon>
        <p>{details}</p>
      </div>

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

    </>
  );
}
