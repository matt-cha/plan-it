import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const burger = menu ? 'hide-burger' : 'show-burger';
  const menuModal = menu ? ' show-menu' : 'hide-menu';
  const overlay = menu ? 'show-overlay' : 'hide-overlay';

  function handleBurgerOpenClick() {
    setMenu(true);
  }
  function handleBurgerCloseClick() {
    setMenu(false);
  }

  return (
    <div>
      <nav className='fixed top-0 z-10 w-full'>
        <div className="mx-auto p-2 bg-[#f2dec8] flex justify-center flex-wrap ">
          <Link to='/events'>
            {/* <p className='bg-[#c8dcf2] text-[#0d213] rounded-md absolute top-2 left-2'>Events</p> */}
            <i className={`${burger} fa-solid fa-burger bg-[#c8dcf2] text-[#0d213] rounded-md absolute top-3 left-2`}
              onClick={handleBurgerOpenClick}
            />
          </Link>

          <p className='bg-[#C8DCF2]'>acoolprojectname</p>
          <Link to='/create-event'>
            <button className='absolute top2 right-2 bg-[#C8DCF2] rounded-md'>?</button>
          </Link>

        </div>
      </nav>
      <div className={`menu ${menuModal}`}>
        <div>
          <Link to='/events'>
            <p onClick={handleBurgerCloseClick}>Events</p>
          </Link>
        </div>
        <div>
          <Link to='/create-event'>
            <p onClick={handleBurgerCloseClick}>New Event</p>
          </Link>
        </div>
      </div>
      <div className={`${overlay}`} onClick={handleBurgerCloseClick} />
    </div>
  );
}
