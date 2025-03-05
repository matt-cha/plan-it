import React, { useState, useEffect } from 'react';

export default function GuestList({ guests }) {
  const [showGuestList, setShowGuestList] = useState(false);
  const [guestList, setGuestList] = useState([]);

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
      <button onClick={handleClick}>
        {showGuestList ? 'Hide Guests' : 'Show Guests'}
      </button>
      <div className={`overflow-hidden transition-ease-in-out-1 ${showGuestList ? 'max-h-60' : 'max-h-0 text-transparent'}`}>
        {guestList.map(guest => (
          <div key={guest.guestId}>
            <p>Name: {guest.guestName}</p>
            <p>Phone Number: {guest.phoneNumber}</p>
          </div>
        ))}
        {guestList.length === 0 && <p>No guests have been added</p>}
      </div>
    </>
  );
}
