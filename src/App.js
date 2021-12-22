import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoibnRob21hczA4MCIsImEiOiJja3hmaG85OXcwNGxuMndtYXIyMmZ4a3RvIn0.8D8wEzr8RPis8iw06_AFCA';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: -98,
      lat:  38.88,
      zoom: 3
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

        map.on('load', () => {
        map.addSource('block-groups', {
            'type': 'vector',
            'url': 'mapbox://nthomas080.5pbq698c'
        });

        map.addSource('tracts', {
            'type': 'vector',
            'url': 'mapbox://nthomas080.309kqirq'
        });

        map.addSource('counties', {
            'type': 'vector',
            'url': 'mapbox://nthomas080.ahf8gqi4'
        });

        map.addSource('states', {
            'type': 'vector',
            'url': 'mapbox://nthomas080.dph9vxz2'
        });

        map.addLayer(
            {
                'id': 'block-groups',
                'source': 'block-groups',
                'source-layer': 'cb_2019_us_bg_500k-c6i5za',
                'minzoom': 8,
                'type': 'fill',
                'layout': {},
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.5
                }
            }
        );

        map.addLayer(
            {
                'id': 'tracts',
                'source': 'tracts',
                'source-layer': 'cb_2019_us_tract_500k-4s31ti',
                'minzoom': 6,
                'type': 'fill',
                'layout': {},
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.5
                }
            }
        );

        map.addLayer(
            {
                'id': 'counties',
                'source': 'counties',
                'source-layer': 'cb_2019_us_county_500k-b4tpx7',
                'minzoom': 4,
                'type': 'fill',
                'layout': {},
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.5
                }
            }
        );

        map.addLayer(
            {
                'id': 'states',
                'source': 'states',
                'source-layer': 'cb_2019_us_state_500k-4hnmhq',
                'type': 'fill',
                'layout': {},
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.5
                }
            }
        );

        map.addLayer(
            {
                'id': 'block-group-outline',
                'source': 'block-groups',
                'source-layer': 'cb_2019_us_bg_500k-c6i5za',
                'minzoom': 8,
                'type': 'line',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-width': 0.2
                }
            }
        );

        map.addLayer(
            {
                'id': 'tract-outline',
                'source': 'tracts',
                'source-layer': 'cb_2019_us_tract_500k-4s31ti',
                'minzoom': 6,
                'type': 'line',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-width': 0.4
                }
            }
        );

        map.addLayer(
            {
                'id': 'county-outline',
                'source': 'counties',
                'source-layer': 'cb_2019_us_county_500k-b4tpx7',
                'minzoom': 6,
                'type': 'line',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-width': 0.6
                }
            }
        );

        map.addLayer(
            {
                'id': 'state-outline',
                'source': 'states',
                'source-layer': 'cb_2019_us_state_500k-4hnmhq',
                'type': 'line',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-width': 1.2
                }
            }
        );

    });

  }
  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}