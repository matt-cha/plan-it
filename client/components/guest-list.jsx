import React, { useState } from 'react';

export default function GuestList({ guests }) {
  const [showGuestList, setShowGuestList] = useState(false);

  function handleClick() {
    setShowGuestList(!showGuestList);
  }

  return (
    <>
      <div className='flex justify-center items-center mt-2'>
        <button onClick={handleClick} className='rounded border w-full px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300' >{showGuestList ? 'Hide Guests' : 'Show Guests'}</button>
      </div>
      <div className="">
        {
          guests?.map(guest => (
            <div key={guest.guestId}
              className={`overflow-hidden transition-ease-in-out-1 ${showGuestList ? 'max-h-28' : 'max-h-0 text-transparent'}`}>
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
