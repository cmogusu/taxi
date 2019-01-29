import React from 'react';

export function withGoogle(Component) {
  return class extends React.Component {
    state = {
      google: null,
    }

    componentDidMount() {
      if (window.tomtom) {
        this.init();
      } else {
        window.addEventListener('googleReady', this.init);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('googleReady', this.init);
    }

    init = () => {
      setTimeout(() => {
        const { google } = window;

        this.setState({ google });
      }, 100);
    }

    render() {
      const { google } = this.state;
      return <Component google={google} {...this.props} />;
    }
  };
}

export const loadScript = (script) => {
  const theScript = document.createElement('script');
  theScript.setAttribute('src', script);
  document.head.appendChild(theScript);
};


export const createMapsReadyEvent = (eventName) => {
  const triggerEvent = () => {
    const mapsReadyEvent = new Event(eventName);
    window.dispatchEvent(mapsReadyEvent);
  };

  if (window.google) {
    triggerEvent(window, eventName);
  } else {
    window.initMap = () => {
      triggerEvent(window, eventName);
    };
  }
};

export function loadGoogle() {
  loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBGraz0piF8xyoi2zAdb8xKTooF_8wqunc&callback=initMap&libraries=places');
  createMapsReadyEvent('googleReady');
}
