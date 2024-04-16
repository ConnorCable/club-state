import { GoogleMap } from '@capacitor/google-maps';
import { IonButton } from '@ionic/react';
import { useEffect, useRef } from 'react';

const MapComponent = () => {
    useEffect(() => {
      const createMap = async () => {
        const mapRef = document.getElementById('map');
        if (mapRef){
            const map = await GoogleMap.create({
                element: mapRef,
                apiKey: 'YOUR_API_KEY', // Replace with your API key
                config: {
                    center: {
                        lat: 37.7749, // Initial latitude
                        lng: -122.4194 // Initial longitude
                    },
                    zoom: 12 // Initial zoom level
                },
                id: ''
            });
        }
        else{
            console.error('Element with id "map" not found');
        }
        
      };
  
      createMap();
    }, []);
  
    return <div id="map" style={{ width: '100%', height: '300px' }}></div>;
  };
  
  export default MapComponent;