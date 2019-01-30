import React from 'react';
import BookingForm from './components/BookingForm.js';
import Checkbox from './components/Checkbox.js';
import { loadGoogle } from './functions/functions.js';


function App() {
  loadGoogle();

  return (
    <div>
      <Checkbox />
      <BookingForm />
    </div>
  );
}

export default App;
