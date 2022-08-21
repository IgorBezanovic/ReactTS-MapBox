import React, {useEffect, useRef} from 'react';
import { 
    DivElement,
    MapDiv
} from '../../screens/home/styles';
import { Location } from "../../types/location.model";

export default function Map({locationValue} : {locationValue: Location}) {
    const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;
    let mapboxgl = require("mapbox-gl")
    mapboxgl.accessToken = MAPBOX_KEY;
    const mapContainer = useRef(null);

    const createMap = () => {
        console.log(locationValue);
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [locationValue.lng, locationValue.lat],
            zoom: 5
        })

        new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat([locationValue.lng, locationValue.lat])
                .setHTML(`<h1>${locationValue.city}, ${locationValue.canton}</h1><p>${locationValue.locality}</p>`)
                .addTo(map);

        new mapboxgl.Marker()
                .setLngLat([locationValue.lng, locationValue.lat])
                .addTo(map);

        map.on('load', () => {
            // Add a data source containing GeoJSON data.
            map.addSource('bern', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                            // These coordinates outline Bern.
                        'coordinates': [
                            locationValue.coordinate
                        ]
                    }
                }
            });
                     
            // Add a new layer to visualize the polygon.
            map.addLayer({
                'id': 'bern',
                'type': 'fill',
                'source': 'bern', // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': '#0080ff', // blue color fill
                    'fill-opacity': 0.5
                } 
            });
             // Add a black outline around the polygon.
            map.addLayer({
                'id': 'outline',
                'type': 'line',
                'source': 'bern',
                'layout': {},
                'paint': {
                    'line-color': '#000',
                    'line-width': 3
                }
            });
        });
    }

    useEffect(() => {
        setTimeout(() => {createMap()}, 1000)
    }, []);

    return (
        <MapDiv ref={mapContainer} />
    );
}
