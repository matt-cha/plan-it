import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import CreateEvent from './pages/create-event';
import Events from './pages/events';
import Event from './pages/event';
import NotFound from './pages/not-found';
import Loader from './components/loader';

import { Routes, Route, useLocation } from 'react-router-dom';

export default function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [location]);

  return (
    <div className='App '>
      <Navbar />
      <div className='pt-24'>
        {loading && (
          <Loader />
        )}
        <Routes>
          <Route path='/' element={<CreateEvent />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:eventId' element={<Event />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </div>
  );
}
