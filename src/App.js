import React from 'react';
import BookingForm from './components/BookingForm.js';
import { loadGoogle } from './functions/functions.js';


function App() {
  loadGoogle();

  return (
    <div>
      <BookingForm />
    </div>
  );
}

export default App;
