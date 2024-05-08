import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  withIonLifeCycle
} from "@ionic/react";

import { Geolocation } from '@capacitor/geolocation';
import { useEffect, useRef, useState } from "react";
import "./index.css";
import MapGL from "../../components/Map/index";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useDataStore } from "../../models/DataStore";



const Tab2: React.FC = () => {
  const {location, setLocation} = useDataStore();
  
  useIonViewWillEnter(() => {

    const fetchUserLocation = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      setLocation(coordinates);
    };

    fetchUserLocation()
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MapGL>
        </MapGL>
      </IonContent>
    </IonPage>  
  );
};

export default Tab2;
