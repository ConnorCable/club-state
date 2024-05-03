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
// import Map from "../../components/Map";
import { MarkerMap } from "../../components/MarkerMap";
 import MapGL from "../../components/mapbox-gl-map";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";



const Tab2: React.FC = () => {
  const [userLocation, setUserLocation]: any = useState({lat: 0, lng: 0})
  
  const fetchUserLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    setUserLocation({ lat: coordinates.coords.latitude, lng: coordinates.coords.longitude });
  };
  useIonViewWillEnter(() => {
    const fetchUserLocation = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      setUserLocation({ lat: coordinates.coords.latitude, lng: coordinates.coords.longitude });
    };

    fetchUserLocation()
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
                <IonContent fullscreen>
                    <div>
                      <MapGL>
                      </MapGL>
                    </div>
                </IonContent>
    </IonPage>  
  );
};

export default Tab2;
