import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-2xl font-semibold text-gray-700">Oops! The page you're looking for doesn't exist.</p>
      <p className="mt-4 text-lg text-gray-600">
        Click <Link to="/events" className="text-blue-600 font-bold hover:underline">here</Link> to return to the Events page.
      </p>
    </div>
  );
}
