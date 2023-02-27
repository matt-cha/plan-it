import React from 'react';
import Navbar from '../components/navbar';
import CreateEvent from '../components/create-event';
import Event from '../components/event';
import Events from '../components/events';

export default function Home(props) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <CreateEvent />
      </div>
      <div>
        <Events />
      </div>
      <div>
        <Event />
      </div>
    </>

  );
}
