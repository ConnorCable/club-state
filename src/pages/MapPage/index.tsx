import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { Geolocation } from '@capacitor/geolocation';
import "./index.css";
import MapGL from "../../components/Map/index";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDataStore } from "../../models/DataStore";
import { earOutline } from "ionicons/icons";
import firebase from "firebase/compat";

const Map: React.FC = () => {
  const { location, setLocation } = useDataStore();

  useIonViewWillEnter(() => {
    const fetchUserLocation = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      setLocation(coordinates);
    };
    fetchUserLocation();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><sup>Clubs Nearby</sup></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <MapGL />
      </IonContent>
    </IonPage>
  );
};

export default Map;