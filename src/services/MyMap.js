// https://github.com/parcel-bundler/parcel/issues/1128
// import mapboxgl from 'mapbox-gl';

export default class MyMap {
  constructor(initCenter = [-39.11133, 36.66842], style = 'mapbox://styles/mapbox/dark-v9') {
    const accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'your token';
    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style,
      center: initCenter, // [lng, lat]
      zoom: 1,
    });
  }

  mapTo(center, zoom = 13) {
    this.map.flyTo({
      center,
      zoom,
    });
  }
}
