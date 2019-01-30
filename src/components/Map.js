// @flow
import * as React from 'react';
import withGoogle from '../functions/withGoogle.js';
import { metersToMiles, distanceToPrice, secondsToMinutes } from '../functions/functions.js';

type Props = {
  google: {},
  origin?: {},
  destination?: {},
  via?: {},
};

type State = {
  isLoading: boolean,
  totalDistance: number,
  totalDuration: number,
}


class Map extends React.Component<Props, State> {
  static defaultProps = {
    origin: null,
    destination: null,
    via: null,
  };

  state = {
    isLoading: false,
    totalDistance: 0,
    totalDuration: 0,
  }

  mapElement = null;

  map = null;

  directionsService = null;

  directionsRenderer = null;

  totalDuration = 0;

  componentDidUpdate(prevProps) {
    const {
      google: prevGoogle,
      origin: prevOrigin,
      destination: prevDestination,
      via: prevVia,
    } = prevProps;

    const {
      google,
      origin,
      destination,
      via,
    } = this.props;

    if (google && prevGoogle !== google) {
      this.renderMap();
    }

    if (origin
      && destination
      && (origin !== prevOrigin || destination !== prevDestination || via !== prevVia)
    ) {
      this.displayRoute();
    }
  }


  displayRoute = () => {
    const {
      origin,
      destination,
      via,
      google,
    } = this.props;
    const { isLoading } = this.state;

    if (isLoading || !origin || !destination || !google) {
      return;
    }

    const routeInfo = {
      origin,
      destination,
      travelMode: 'DRIVING',
    };

    if (via) {
      routeInfo.waypoints = [{
        location: via,
        stopover: false,
      }];
    }

    if (!this.directionsService) {
      this.directionsService = new google.maps.DirectionsService();
    }

    this.directionsService.route(routeInfo, this.processResults);

    this.setState({
      isLoading: true,
    });
  };


  processResults = (results, status) => {
    const { google } = this.props;

    if (status !== 'OK') {
      console.log('unable to get directons');
      return;
    }

    const totalDistance = results.routes.reduce((distance, route) => (
      distance + route.legs.reduce((innerDistance, leg) => (innerDistance + leg.distance.value), 0)
    ), 0);

    const totalDuration = results.routes.reduce((duration, route) => (
      duration + route.legs.reduce((innerDuration, leg) => (innerDuration + leg.duration.value), 0)
    ), 0);


    if (!this.directionsRenderer) {
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: false,
        map: this.map,
      });

      this.directionsRenderer.setDirections(results);
    }
    console.log(results);

    this.setState({
      isLoading: false,
      totalDistance,
      totalDuration,
    });
  };


  renderMap() {
    const { google } = this.props;

    if (!google) {
      return;
    }

    const zoom = 15;
    this.map = new google.maps.Map(this.mapElement, {
      zoom,
      center: {
        lat: 52.639625,
        lng: -1.135978,
      },
    });
  }


  render() {
    const { totalDistance, totalDuration } = this.state;

    return (
      <div>
        <div id="map" ref={(element) => { this.mapElement = element; }} />
        <div>
          <span>
            {metersToMiles(totalDistance)}
            miles
          </span>
          <span>
            {secondsToMinutes(totalDuration)}
            mins
          </span>
          <span>
            {distanceToPrice(totalDuration, 2.5)}
            mins
          </span>
        </div>
      </div>
    );
  }
}

export default withGoogle(Map);
