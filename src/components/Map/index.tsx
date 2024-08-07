import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl';
import { pinSharp, navigateCircleOutline, layers } from 'ionicons/icons';
import { IonIcon, IonProgressBar, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { useDataStore } from '../../models/DataStore';
import logo from "../../../assets/clubStateLogo.gif";
import './index.css'
import type { CircleLayer } from 'react-map-gl';
import { getClubStateCoords } from '../../helpers/getClubStateCoords';
import { heatmapLayer } from './map-style';

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};


const MapGL: React.FC = () => {
  const [locationChips, setLocationChips] = useState<any>([]);
  const { location, radius} = useDataStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [geoJson, setGeoJson] = useState<any>(null);
  const [geoJsonLoaded, setGeoJsonLoaded] = useState(false);
  

  const getChipCollection = useCallback(async () => {
    const firestore = firebase.firestore();
    const GeoFirestore = geofirestore.initializeApp(firestore);
    const geocollection = GeoFirestore.collection('geo-clubs');
    const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude), radius: radius }).limit(50); // Limit added
    const snapshot = await query.get();

    return snapshot.docs.map((doc: any) => {

      return doc.data();
    });
  }, [location, radius,]);


  useEffect(() => {
    const fetchData = async () => {
      const chips = await getChipCollection();
      setLocationChips(chips);
      setIsLoading(false);
      const geoJsonData = await getClubStateCoords(location, radius);
      setGeoJson(geoJsonData);
      console.log(geoJsonData);
      setGeoJsonLoaded(true);
      
      
    };

    

    fetchData();
  }, [getChipCollection, location, radius]);

  

  const handleMapLoad = useCallback(() => {
    console.log('GeoJSON Loaded:', geoJsonLoaded);
    if (geoJsonLoaded) {
      setMapLoaded(true);
    }
    
  }, [geoJsonLoaded]);

  useEffect(() => {
    if (geoJsonLoaded) {
      handleMapLoad();
    }
  }, [geoJsonLoaded, handleMapLoad]);


  const memoizedMarkers = useMemo(() =>
    locationChips.map((chip: any) => (
      <Marker
        key={chip.g.geohash}
        longitude={chip.coordinates._long}
        latitude={chip.coordinates._lat}
        anchor="bottom"
        onClick={(e) => { e.originalEvent.stopPropagation(); setIsOpen(true) }}
      >
        <IonIcon icon={pinSharp} size="large" color='tertiary' style={{ cursor: 'pointer' }} />
      </Marker>
    ))
    , [locationChips]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <img src={logo} alt="Loading" style={{ width: 500, height: 500 }} />
        <IonProgressBar type="indeterminate" />
      </div>
    );
  }

  return (
    <div id="map-container" style={{ height: "90vh", width: "90vh", visibility: mapLoaded ? 'visible' : 'hidden', overflow: "hidden" }}>
      <Map
        mapboxAccessToken="pk.eyJ1IjoibXVra29pIiwiYSI6ImNsdng1bTZwczBnbWoydm82bTE1MXN5YmEifQ.jVrPQmWmp5xMxQamxdASVA"
        initialViewState={{
          longitude: location?.coords.longitude,
          latitude: location?.coords.latitude,
          zoom: 12.5
        }}
        mapStyle="mapbox://styles/mukkoi/clvx641jj01qd01q1dh0074ny"
        scrollZoom={true}
        onRender={(event) => event.target.resize()}
        onLoad={handleMapLoad}
      >
        {mapLoaded && geoJsonLoaded && (
          <Source type="geojson" data={geoJson}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
        {mapLoaded && memoizedMarkers}
        {mapLoaded && location?.coords.longitude != undefined && location.coords.latitude != undefined && (
          <Marker latitude={location.coords.latitude} longitude={location.coords.longitude} onClick={() => {console.log("Hello")}}>
            <IonIcon icon={navigateCircleOutline} size="large" color='tertiary' />
          </Marker>
        )}
      </Map>

      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButton slot='end' onClick={()=> setIsOpen(false)}>BACK</IonButton>
            <IonTitle>Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {popupInfo && (
            <>
              <IonCardTitle className='mapPinSubtitle'>{popupInfo.name}</IonCardTitle>
              <IonCardSubtitle>{popupInfo.address.toUpperCase()}</IonCardSubtitle>
              <IonCardContent>
                <IonButton className="getDirections" color="warning">
                  <a
                    className='directionsButton'
                    href={`https://www.google.com/maps/dir/?api=1&destination=${popupInfo.coordinates._lat},${popupInfo.coordinates._long}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2>Get Directions</h2>
                  </a>
                </IonButton>
              </IonCardContent>
            </>
          )}
        </IonContent>
      </IonModal>
    </div>
  );
};

export default MapGL;