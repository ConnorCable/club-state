import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import Map, {Marker} from 'react-map-gl';
import { homeOutline, homeSharp, locationOutline, pinSharp } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { useDataStore } from '../../models/DataStore';


const MapGL: React.FC = () => {
    const [locationChips, setLocationChips] = React.useState<any>([]);
    const {location} = useDataStore();
    

const getChipCollection = async () => {

  const firestore = firebase.firestore();

  const GeoFirestore = geofirestore.initializeApp(firestore);

  const geocollection = GeoFirestore.collection('geo-clubs');
  
  // 1609 km roughly 1 mi
  const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude), radius: 200 });
  let chipsArray: any[] = []
  query.get().then((value : any) => {
      value.docs.forEach((doc : any) => {
      chipsArray.push(doc.data() );
      });
  });
  
  return chipsArray;
}

    useEffect(() => {
        const fetchData = async () => {
            let chips = await getChipCollection();
            setLocationChips(chips);
        };

        fetchData();
        },[]);


  return (
    <div>
        <div id="map-container" style={{ height: '100vh', width: '100vh' }}>
          <Map
              mapboxAccessToken="pk.eyJ1IjoibXVra29pIiwiYSI6ImNsczhlNm85eDJnanYya2xkaGZsOTVtM24ifQ.EIQu35Kqy8hO7CH_m2W0MQ"
              initialViewState={{
              longitude: location?.coords.longitude,
              latitude: location?.coords.latitude,
              zoom: 15
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              scrollZoom={true}
          >
              
              {locationChips.map((chip: any) => (
                <Marker key={chip.g.geohash} longitude={chip.coordinates._long} latitude={chip.coordinates._lat} anchor="bottom" >
                  <IonIcon icon={pinSharp} size="large" color='danger' />
                </Marker>
              ))}

          </Map>
        </div>
    </div>
  );
};

export default MapGL;
