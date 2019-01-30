import React from 'react';
import { isError } from 'lodash';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { addMinutes, isBefore } from 'date-fns';

import Autocomplete from './Autocomplete.js';
import Map from './Map.js';
import Vehicles from './Vehicles.js';
import DateTime from './DateTime.js';
import Checkbox from './Checkbox.js';
import Slider from './Slider.js';


class BookingForm extends React.Component {
  dateDelay = 30;

  defaultState = {
    origin: null,
    destination: null,
    waypoints: [],
    hasSubmited: false,
    addViaInputs: 0,
    date: addMinutes(new Date(), this.dateDelay),
    dateError: '',
    isReturnJourney: false,
    passengers: 1,
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  setPlace = (placesData, place, waypointIndex) => {
    if (!placesData || isError(placesData) || !placesData.geometry) {
      return;
    }

    const { waypoints } = this.state;
    const { geometry } = placesData;
    let { location } = geometry;

    if (place === 'waypoints') {
      const newWaypoints = waypoints.slice();

      newWaypoints[waypointIndex] = location;
      location = newWaypoints;
    }

    this.setState({
      [place]: location,
    });
  };


  setDateTime = (date) => {
    const futureDate = addMinutes(new Date(), this.dateDelay);
    let dateError = '';

    if (isBefore(date, futureDate)) {
      dateError = 'Set a time that is in the future';
    }

    this.setState({ date, dateError });
  };


  addWaypoint = () => {
    this.setState((prevState) => {
      const { waypoints } = prevState;
      const newWaypoints = waypoints.slice();

      newWaypoints.push(null);

      return {
        waypoints: newWaypoints,
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


  getQuote = () => {
    this.setState({
      hasSubmited: true,
    });
  }


  render() {
    const {
      origin,
      destination,
      waypoints,
      hasSubmited,
      date,
      dateError,
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
            <Autocomplete label="Pick up" setPlace={places => this.setPlace(places, 'origin')} />
            <Autocomplete label="Destination" setPlace={places => this.setPlace(places, 'destination')} />
            <br />

            <Fab
              size="small"
              color="primary"
              variant="extended"
              aria-label="add via location"
              onClick={this.addWaypoint}
            >
              Add Via
            </Fab>
            <br />

            {waypoints.map((waypoint, index) => (
              <Autocomplete
                key={index}
                label={`Via ${index + 1}`}
                setPlace={places => this.setPlace(places, 'waypoints', index)}
              />
            ))}

            <DateTime
              date={date}
              label={dateError || 'Departure time'}
              onChange={this.setDateTime}
              minDate={addMinutes(new Date(), this.dateDelay)}
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

            <Button
              variant="contained"
              color="primary"
              onClick={this.getQuote}
              disabled={!(origin && destination)}
            >
              Get Quotes
            </Button>
            <Button
              onClick={() => this.setState(this.defaultState)}
              disabled={!(origin && destination)}
            >
              Reset
            </Button>
          </div>
        </div>
        { hasSubmited && (
          <div className="col-sm-6">
            <Map origin={origin} destination={destination} waypoints={waypoints} />
            <Vehicles />
          </div>
        )}
      </div>
    );
  }
}

export default BookingForm;
