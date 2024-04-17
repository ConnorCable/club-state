import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,

} from "@ionic/react";

import { useEffect, useRef, useState } from "react";
import "./Tab2.css";
import Map from "../components/Map";
import { MarkerMap } from "../components/MarkerMap";


const Tab2: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MarkerMap  coordinate={{lat: 38.581573, lng: -121.494400 }}/>
      </IonContent>
      
    </IonPage>
    
  );
};

export default Tab2;
