import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import GoogleMap from "google-maps-react-markers";
import { homeOutline, homeSharp, pin } from "ionicons/icons";
import { useRef, useState } from "react";

interface MarkerProps {
  lat: number;
  lng: number;
}

const LocationChip: React.FC<MarkerProps> = () => {
  return (

    <IonChip color="primary" >
      <IonIcon icon={homeSharp} />
    </IonChip>

  );
};

export const MarkerMap = (coordinates: any) => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);


  const onGoogleApiLoaded = ({ map, maps }: any) => {
    mapRef.current = map;
    setMapReady(true);
  };

  return (
    <>
      <GoogleMap
        apiKey="AIzaSyA09rOO1u5io_qURoy9I3bKWEf1kv5oWrQ"
        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
        defaultZoom={5}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map: any) => console.log("Map moved", map)}
      >
        <LocationChip lat={38.581573} lng={-121.4944} />
      </GoogleMap>
    </>
  );
};
