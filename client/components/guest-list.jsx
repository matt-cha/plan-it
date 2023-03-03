import React, { useState } from 'react';

export default function GuestList({ guests }) {
  const [showGuestList, setShowGuestList] = useState(false);

  function handleClick() {
    setShowGuestList(!showGuestList);
  }

  return (
    <>
      <div className='flex justify-center items-center mt-2'>
        <button onClick={handleClick} className='bg-[#C8F2DE] hover:bg-blue-700  py-2 px-4 w-full rounded' >{showGuestList ? 'Hide Guests' : 'Show Guests'}</button>
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
