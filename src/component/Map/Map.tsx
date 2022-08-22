import React, {useEffect, useRef} from 'react';
import { 
    DivElement,
    MapDiv
} from '../../screens/home/styles';
import { Location } from "../../types/location.model";
import 'mapbox-gl/dist/mapbox-gl.css'

export default function Map() {
    const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_KEY;
    let mapboxgl = require("mapbox-gl")
    mapboxgl.accessToken = MAPBOX_KEY;
    const mapContainer = useRef(null);

    var retrievedObject: string = localStorage.getItem('location')!;
    let locationBern = JSON.parse(retrievedObject);

    const createMap = () => {
        console.log(locationBern);
        console.log(locationBern.coordinate);
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [locationBern.lng, locationBern.lat],
            zoom: 9
        })

        new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat([locationBern.lng, locationBern.lat])
                .setHTML(`<h3>${locationBern.city}, ${locationBern.canton}</h3><p>${locationBern.locality}</p>`)
                .addTo(map);

        new mapboxgl.Marker()
                .setLngLat([locationBern.lng, locationBern.lat])
                .addTo(map);

        map.on('load', () => {
            // Add a data source containing GeoJSON data.
            map.addSource('bern', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                        locationBern.coordinate //Parsirano u JSON -> [[lat, long]]
                        // [
                                //Koordinate koje sam dobio putem urla, koje se ne prikazuju na mapi, hadcode.
                                
                                // [47.040444, 7.619863],
                                // [47.040571, 7.62016],
                                // [47.040382, 7.620331],
                                // [47.040363, 7.620349],
                                // [47.040354, 7.620325],
                                // [47.040247, 7.620072],
                                // [47.040265, 7.620052],
                                // [47.040444, 7.619863]

                        //     //Test poyligon koji radi, US state Maine

                        //     // [-67.13734, 45.13745],
                        //     // [-66.96466, 44.8097],
                        //     // [-68.03252, 44.3252],
                        //     // [-69.06, 43.98],
                        //     // [-70.11617, 43.68405],
                        //     // [-70.64573, 43.09008],
                        //     // [-70.75102, 43.08003],
                        //     // [-70.79761, 43.21973],
                        //     // [-70.98176, 43.36789],
                        //     // [-70.94416, 43.46633],
                        //     // [-71.08482, 45.30524],
                        //     // [-70.66002, 45.46022],
                        //     // [-70.30495, 45.91479],
                        //     // [-70.00014, 46.69317],
                        //     // [-69.23708, 47.44777],
                        //     // [-68.90478, 47.18479],
                        //     // [-68.2343, 47.35462],
                        //     // [-67.79035, 47.06624],
                        //     // [-67.79141, 45.70258],
                        //     // [-67.13734, 45.13745]
                        // ]
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
