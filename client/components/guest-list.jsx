import React, { useState } from 'react';

export default function GuestList({ guests }) {
  const [showGuestList, setShowGuestList] = useState(false);

  function handleClick() {
    setShowGuestList(!showGuestList);
  }

  return (
    <>
      <div className=''>
        <button onClick={handleClick} className='bg-blue-400' >{showGuestList ? 'Hide Guests' : 'Show Guests'}</button>
      </div>
      <div className="">
        {
          guests?.map(guest => (
            <div key={guest.guestId}
              className={`${showGuestList ? 'test2' : 'test1 '}`}>
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
        <p>Name: {guestName}</p>
      </div>
      <div>
        <p>Phone Number: {phoneNumber}</p>
      </div>
    </>
  );
}
