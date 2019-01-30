import React from 'react';
import { isError } from 'lodash';
import Button from '@material-ui/core/Button';

import Autocomplete from './Autocomplete.js';
import Map from './Map.js';
import Vehicles from './Vehicles.js';
import DateTime from './DateTime.js';
import Checkbox from './Checkbox.js';
import Slider from './Slider.js';
import Fab from './Fab.js';


class BookingForm extends React.Component {
  state = {
    origin: null,
    destination: null,
    via: null,
    hasSubmited: false,
    addViaInputs: 0,
    dateTime: new Date(),
    isReturnJourney: false,
    passengers: 1,
  };


  setPlace = (place, placesData) => {
    if (!placesData || isError(placesData) || !placesData.geometry) {
      return;
    }

    this.setState({
      [place]: placesData.geometry.location,
    });
  };

  addViaCount = () => {
    this.setState((prevState) => {
      const { addViaInputs: newViaInputs } = prevState;

      return {
        addViaInputs: newViaInputs + 1,
      };
    });
  };

  getViaInputs = () => {
    const { addViaInputs } = this.state;
    const inputs = [];
    let i = 0;

    while (i < addViaInputs) {
      i += 1;

      inputs.push(
        <Autocomplete key={i} label={`Via ${i}`} setPlace={places => this.setPlace('via', places)} />,
      );
    }

    return inputs;
  }


  render() {
    const {
      origin,
      destination,
      via,
      hasSubmited,
      dateTime,
      isReturnJourney,
      passengers,
    } = this.state;

    return (
      <div className="row">
        <div className="col-sm-6">
          <header>
            <h1>Book in under a minute</h1>
            <p>Airport transfers, taxis and executive cars</p>
          </header>
          <div>
            <Autocomplete label="Pick up" setPlace={places => this.setPlace('origin', places)} />
            <Autocomplete label="Destination" setPlace={places => this.setPlace('destination', places)} />
            <br />

            <Fab onClick={this.addViaCount} />
            {this.getViaInputs()}

            <DateTime
              date={dateTime}
              onChange={newDateTime => this.setState({ dateTime: newDateTime })}
            />
            <br />


            <Checkbox
              label="Return Journey"
              isChecked={isReturnJourney}
              onChange={event => this.setState({ isReturnJourney: event.currentTarget.checked })}
            />
            <br />

            <span>Passengers</span>
            <br />
            <Slider
              value={passengers}
              onChange={(event, value) => this.setState({ passengers: value })}
            />
            <br />

            <Button variant="contained" color="primary">
              Get Quotes
            </Button>
            <Button>
              Reset
            </Button>
          </div>
        </div>
        { hasSubmited && (
          <div className="col-sm-6">
            <Map origin={origin} destination={destination} via={via} />
            <Vehicles />
          </div>
        )}
      </div>
    );
  }
}

export default BookingForm;
