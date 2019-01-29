import React from 'react';
import BookingForm from './components/BookingForm.js';
import { loadGoogle } from './functions/functions.js';

function App() {
  loadGoogle();

  return <BookingForm />;
}

export default App;