// @flow
import * as React from 'react';
import { throttle, isEqual } from 'lodash';
import withGoogle from '../functions/withGoogle.js';
import { metersToMiles, distanceToPrice, secondsToMinutes } from '../functions/functions.js';

type Props = {
  google: {},
  origin: {},
  destination: {},
  waypoints: Array<{}>,
  totalDistance: number,
  totalDuration: number,
  setDuration: Function,
  setDistance: Function,
};

type State = {
  hasFetchedDirectionsBefore: boolean,
}


class Map extends React.Component<Props, State> {
  state = {
    hasFetchedDirectionsBefore: false,
  };

  hasFetchedDirectionsBefore = false;

  mapElement = null;

  map = null;

  directionsService = null;

  directionsRenderer = null;

  totalDuration = 0;

  constructor(props) {
    super(props);

    this.sendGMapsRequest = throttle(this.sendGMapsRequest, 200);
  }

  componentDidMount() {
    this.renderMap();
    this.sendGMapsRequest();
  }

  componentDidUpdate(prevProps) {
    const {
      origin: prevOrigin,
      destination: prevDestination,
      waypoints: prevWaypoints,
    } = prevProps;

    const {
      google,
      origin,
      destination,
      waypoints,
    } = this.props;

    if (google && !this.map) {
      this.renderMap();
    }

    if (!this.hasFetchedDirectionsBefore) {
      this.hasFetchedDirectionsBefore = true;
      this.sendGMapsRequest();
    }

    if (!isEqual(origin, prevOrigin)
      || !isEqual(destination, prevDestination)
      || !isEqual(waypoints, prevWaypoints)
    ) {
      this.sendGMapsRequest();
    }
  }


  sendGMapsRequest = () => {
    const {
      origin,
      destination,
      waypoints,
      google,
    } = this.props;

    if (!origin || !destination || !google) {
      return;
    }

    const routeInfo = {
      origin,
      destination,
      travelMode: 'DRIVING',
    };

    if (waypoints) {
      routeInfo.waypoints = waypoints.map(waypoint => ({
        location: waypoint,
        stopover: false,
      }));
    }

    if (!this.directionsService) {
      this.directionsService = new google.maps.DirectionsService();
    }
    console.log('running again', routeInfo);

    this.directionsService.route(routeInfo, this.processResults);
  };


  processResults = (results, status) => {
    const { google, setDuration, setDistance } = this.props;

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
    }

    this.directionsRenderer.setDirections(results);

    setDistance(totalDistance);
    setDuration(totalDuration);
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
    const { totalDistance, totalDuration } = this.props;

    return (
      <div>
        <div id="map" ref={(element) => { this.mapElement = element; }} />
        <div>
          <span>
            Distance:&nbsp;
            {metersToMiles(totalDistance)}
            miles
          </span>
          <span>
            Duration:&nbsp;
            {secondsToMinutes(totalDuration)}
            mins
          </span>
          <span>
            cost: $
            {distanceToPrice(totalDuration, 2.5)}
          </span>
        </div>
      </div>
    );
  }
}

export default withGoogle(Map);
