import React from 'react';
import Navbar from '../components/navbar';
import Event from '../components/create-event';

export default function Home(props) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Event />
      </div>
    </>

  );
}
