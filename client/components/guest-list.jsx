import React, { useState } from 'react';

export default function GuestList({ guests }) {
  const [showGuestList, setShowGuestList] = useState(false);

  function handleClick() {
    setShowGuestList(!showGuestList);
  }

  return (
    <>
      <div className=''>
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
