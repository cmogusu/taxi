// @flow
export const loadScript = (script: string): void => {
  const theScript = document.createElement('script');
  theScript.setAttribute('src', script);
  document.head.appendChild(theScript);
};


export const createMapsReadyEvent = (eventName: string): void => {
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

export function loadGoogle(): void {
  loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBGraz0piF8xyoi2zAdb8xKTooF_8wqunc&callback=initMap&libraries=places');
  createMapsReadyEvent('googleReady');
}


export function metersToMiles(distanceInMeters: number): number {
  if (distanceInMeters === 0) {
    return 0;
  }

  return Math.round(distanceInMeters / 160.9344) / 10;
}

export function distanceToPrice(distanceInMeters: number, costPerMile: number): number {
  if (distanceInMeters === 0 || costPerMile === 0) {
    return 0;
  }

  return Math.round(distanceInMeters / 16.09344 * costPerMile) / 100;
}

export function secondsToMinutes(timeInSeconds): number {
  return timeInSeconds / 60;
}
