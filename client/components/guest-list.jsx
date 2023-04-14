import React, { useState, useEffect } from 'react';

export default function GuestList({ guests }) {
  const [showGuestList, setShowGuestList] = useState(false);
  const [guestList, setGuestList] = useState([]);

  /*   useEffect(() => {
    setGuestList(guests || []);
  }, [guests]); */
  useEffect(() => {
    if (guests) {
      setGuestList(guests);
    }
  }, [guests]);
  function handleClick() {
    setShowGuestList(!showGuestList);
  }

  return (
    <>
      <div className='flex justify-center items-center mt-2'>
        <button onClick={handleClick} className='rounded border w-full px-4 py-2 border-[#C8F2DE] bg-[#C8F2DE] hover:bg-[#8ae3b9] hover:border-[#8ae3b9] transition-colors duration-300' >{showGuestList ? 'Hide Guests' : 'Show Guests'}</button>
      </div>
      <div className={`overflow-hidden transition-ease-in-out-1 ${showGuestList ? 'max-h-60' : 'max-h-0 text-transparent'}`}>
        {guestList.map(guest => (
          <div key={guest.guestId}>
            <GuestCard guest={guest} />
          </div>
        ))}
        {guestList.length === 0 && <p className='my-2 text-red-500'>No guests have been added</p>}
      </div>
    </>
  );
}

function GuestCard({ guest }) {
  const { guestName, phoneNumber } = guest;
  return (
    <>
      <div className='my-2'>
        <p>Name: {guestName}</p>
      </div>
      <div className='my-2'>
        <p>Phone Number: {phoneNumber}</p>
      </div>
    </>
  );
}
