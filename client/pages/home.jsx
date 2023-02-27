import React from 'react';
import Navbar from '../components/navbar';
import CreateEvent from '../components/create-event';

export default function Home(props) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <CreateEvent />
      </div>
    </>

  );
}
