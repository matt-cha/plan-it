import React, { useState } from 'react';

export default function GuestList({ guests }) {
  const [showGuestList, setShowGuestList] = useState(false);

  function handleClick() {
    setShowGuestList(!showGuestList);
  }

  return (
    <>
      <div className='flex justify-center items-center mt-2'>
        <button onClick={handleClick} className='rounded border w-full px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#4bffa8] hover:border-[#4bffa8] transition-colors duration-300' >{showGuestList ? 'Hide Guests' : 'Show Guests'}</button>
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
