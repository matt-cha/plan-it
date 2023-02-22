import React from 'react';
import HelloWorld from '../components/hello-world';
import Navbar from '../components/navbar';
import Event from '../components/create-event';

export default function Home(props) {
  return (
    <>
      <div>
        <HelloWorld />
      </div>
      <div>
        <Navbar />
      </div>
      <div>
        <Event />
      </div>
    </>

  );
}
