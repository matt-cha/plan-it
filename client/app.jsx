import React from 'react';
/* import Home from './pages/home'; */
import Navbar from './components/navbar';
import CreateEvent from './pages/create-event';
import Events from './pages/events';
import Event from './pages/event';
import NotFound from './pages/not-found';

import { Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <div className='App '>
      <Navbar />
      <div className='pt-10'>
        <Routes>
          {/* <Route path='/' element={ <Home />} /> */}
          <Route path='/' element={<CreateEvent />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:eventId' element={<Event />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </div>
  );
}
