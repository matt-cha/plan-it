import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

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
      <p>showing</p>
    </>
  );
}
