import * as React from 'react';
import { isFunction } from 'lodash';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import apiKey from '../apiKey.js';
import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  zoom?: number,
  height?: number,
  width?: number,
};


class Map extends React.Component<Props> {
  static defaultProps = {
    zoom: 14,
    height: 400,
    width: 400,
  };

  map = null;

  element = null;

  componentDidMount() {
    mapboxgl.accessToken = apiKey;
    this.map = new mapboxgl.Map({
      container: this.element,
      style: 'mapbox://styles/mapbox/streets-v11',
    });
  }

  setZoom = (zoom) => {
    console.log(`zoom is set ${zoom}`);
  }

  setCenter = (center) => {
console.log(center);
    //this.map
  }

  render() {
    const { height, width, children } = this.props;

    return (
      <div>
        {isFunction(children) && this.map
          ? children({
            setZoom: this.setZoom,
            setCenter: this.setCenter,
          }) : null
        }

        <div
          id="map"
          ref={(element) => { this.element = element; }}
          style={{ height: `${height}px`, width: `${width}px` }}
        />
      </div>
    );
  }
}

export default Map;
