import React, { useEffect, useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { accessibilityOutline, homeOutline, homeSharp, locationOutline, navigateCircleOutline, person, pinSharp } from 'ionicons/icons';
import { IonIcon, IonProgressBar, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { useDataStore } from '../../models/DataStore';
import logo from "../../../assets/clubStateLogo.gif";
import MapCard from './MapCard';
import './index.css'

const MapGL: React.FC = () => {
  const [locationChips, setLocationChips] = useState<any>([]);
  const { location } = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const getChipCollection = async () => {
      const firestore = firebase.firestore();
      const GeoFirestore = geofirestore.initializeApp(firestore);
      const geocollection = GeoFirestore.collection('geo-clubs');
      const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude), radius: 200 });

      let chipsArray: any[] = [];
      const snapshot = await query.get();
      snapshot.docs.forEach((doc: any) => {
          chipsArray.push(doc.data());
      });

      return chipsArray;
  }

  useEffect(() => {
      const fetchData = async () => {
          let chips = await getChipCollection();
          setLocationChips(chips);
          setIsLoading(false);
      };

      fetchData();
  }, [location]);

  const handleMapLoad = () => {
    
    setMapLoaded(true);
  };

  if (isLoading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <img src={logo} style={{width:  500, height: 500}}></img>
          <IonProgressBar type="indeterminate"/>
        </div>
      );
  }

  return (
      <div id="map-container" style={{ height: "85vh", width: "90vh", visibility: mapLoaded ? 'visible' : 'hidden'}}>
          <Map
              mapboxAccessToken="pk.eyJ1IjoibXVra29pIiwiYSI6ImNsdng1bTZwczBnbWoydm82bTE1MXN5YmEifQ.jVrPQmWmp5xMxQamxdASVA"
              initialViewState={{
                  longitude: location?.coords.longitude,
                  latitude: location?.coords.latitude,
                  zoom: 12.5
              }}
              mapStyle={"mapbox://styles/mukkoi/clvx641jj01qd01q1dh0074ny"}
              scrollZoom={true}
              onRender={(event) => event.target.resize()}
              onLoad={handleMapLoad}
          >
            
              {mapLoaded && locationChips.map((chip: any) => (
                  <Marker key={chip.g.geohash} longitude={chip.coordinates._long} latitude={chip.coordinates._lat} anchor="bottom"  onClick={(e) => {e.originalEvent.stopPropagation; setPopupInfo(chip)}}>
                      <IonIcon icon={pinSharp} size="large" color='tertiary' style={{ cursor: 'pointer' }} />
                  </Marker>
              ))}
                {popupInfo && (
                    <Popup
                        anchor='top'
                        longitude={popupInfo.coordinates._long}
                        latitude={popupInfo.coordinates._lat}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => setPopupInfo(null)}
                    >
                        <IonCardSubtitle className='mapPinSubtitle'>{popupInfo.name}</IonCardSubtitle>
                        <IonCardContent>
                            <IonCardSubtitle>{popupInfo.address.toUpperCase()}</IonCardSubtitle>
                        </IonCardContent>
                    </Popup>
                )}
              {
              (mapLoaded && location?.coords.longitude != undefined && location.coords.latitude != undefined) ? <Marker latitude={location.coords.latitude} longitude={location.coords.longitude}> <IonIcon icon={navigateCircleOutline} size="large" color='tertiary' /></Marker>  : <></>
              } 

          </Map>
                 
      </div>
  );
};

export default MapGL;