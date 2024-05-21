import { IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { Geolocation } from '@capacitor/geolocation';
import "./index.css";
import MapGL from "../../components/Map/index";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDataStore } from "../../models/DataStore";

const Tab2: React.FC = () => {
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
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <MapGL />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;