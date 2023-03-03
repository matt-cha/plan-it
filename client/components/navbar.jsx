import React/* , { useState } */ from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
/*   const [menu, setMenu] = useState(false);
  const burger = menu ? 'hide-burger' : 'show-burger';
  const menuModal = menu ? ' show-menu' : 'hide-menu';
  const overlay = menu ? 'show-overlay' : 'hide-overlay';

  function handleBurgerOpenClick() {
    setMenu(true);
  }
  function handleBurgerCloseClick() {
    setMenu(false);
  } */

  return (
    <div>
      <nav className='fixed top-0 z-10 w-full'>
        <div className=" p-3 bg-[#f2dec8] flex justify-between">
          <div className='flex '>
            <p className='bg-[#C8DCF2] '>acoolprojectname</p>
          </div>
          <div className='flex content-end '>
            <Link to='/events'>
              <p className=' text-[#0d213] mr-4'>All </p>
            </Link>
            <Link to='/'>
              <button className=''>New</button>
            </Link>
          </div>

          {/* <i className={`${burger} fa-solid fa-burger bg-[#c8dcf2] text-[#0d213] rounded-md absolute top-3`}
            onClick={handleBurgerOpenClick}
          /> */}

        </div>
      </nav>
      {/*    <div className={`menu ${menuModal}`}>
        <div>
          <Link to='/events'>
            <p onClick={handleBurgerCloseClick}>Events</p>
          </Link>
        </div>
        <div>
          <Link to='/'>
            <p onClick={handleBurgerCloseClick}>New Event</p>
          </Link>
        </div>
      </div>
      {menu && <div className={`${overlay}`} onClick={handleBurgerCloseClick} />} */}
    </div>
  );
}
