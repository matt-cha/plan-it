import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import CreateEvent from './pages/create-event';
import Events from './pages/events';
import Event from './pages/event';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
        <div className='App'>
          <Navbar />
          <div className='content'>
            <Routes>
              <Route path='/' element={ <Home />}></Route>
              <Route path='/create-event' element={<CreateEvent />}></Route>
              <Route path='/events' element={<Events />}></Route>
              <Route path='/event' element={<Event />}></Route>
              <Route path='/test' element={<h1>test</h1>}></Route>
            </Routes>
          </div>
        </div>
    )
  }
}
