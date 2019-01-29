import React from 'react';
import { isError } from 'lodash';
import Autocomplete from './Autocomplete.js';
import Map from './Map.js';
import Vehicles from './Vehicles.js';
import DateTime from './DateTime.js';

class BookingForm extends React.Component {
  placesLocation = {
    origin: null,
    destination: null,
    via: null,
  };


  setPlace = (place, placesData) => {
    console.log(placesData);
    if (!placesData || isError(placesData)) {
      return;
    }

    this.places[place] = placesData.geometry.location;

    this.sendRequest();
  };

  calculateDistance() {
    this.sendRequest();
  }


  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <form>
            <header>
              <h1>Book in under a minute</h1>
              <p>Airport transfers, taxis and executive cars</p>
            </header>
            <div>
              <Autocomplete label="Pick up" setPlace={places => this.setPlace('origin', places)} />
              <Autocomplete label="Destination" setPlace={places => this.setPlace('destination', places)} />
              <br />

              <Autocomplete label="Via" setPlace={places => this.setPlace('via', places)} />
              <br />

              <DateTime />
              <br />

              <label htmlFor="return-journey">
                Return Journey
                <input type="checkbox" name="returnJourney" />
              </label>
              <br />

              <label htmlFor="return-journey">
                Passengers
                <input type="number" name="returnJourney" />
              </label>
              <br />

              <button type="submit">Get Quotes</button>
              <button type="reset">Reset</button>
            </div>
          </form>
        </div>
        <div className="col-sm-6">
          <Map />
          <Vehicles />
        </div>
      </div>
    );
  }
}

export default BookingForm;
