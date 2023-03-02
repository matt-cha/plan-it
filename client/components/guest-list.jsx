import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function GuestList() {
  const [guests, setGuests] = useState();
  const { eventId } = useParams();
  const [showGuestList, setShowGuestList] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${eventId}/guests`)
      .then(res => res.json())
      .then(guests => setGuests(guests));
  }, [eventId]);

  function handleClick() {
    setShowGuestList(!showGuestList);
  }

  return (
    <>
      <div className='mx-2'>
        <button onClick={handleClick} className='bg-blue-400' >{showGuestList ? 'Show Guests' : 'Hide Guests'}</button>
      </div>
      <div className="">
        {
          guests?.map(guest => (
            <div key={guest.guestId}
              className={`${showGuestList ? 'test1' : 'test2 '}`}>
              <GuestCard guest={guest} />
            </div>
          ))
        }
      </div>
    </>
  );
}

function GuestCard({ guest }) {
  const { guestName, phoneNumber } = guest;
  return (
    <>
      <div>
        <p>{guestName}</p>
      </div>
      <div>
        <p>{phoneNumber}</p>
      </div>
    </>
  );
}
