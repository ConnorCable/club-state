import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import GoogleMap from "google-maps-react-markers";
import { pin } from "ionicons/icons";
import { useRef, useState } from "react";

interface MarkerProps {
  lat: number;
  lng: number;
}

const Divcomp: React.FC<MarkerProps> = () => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    Marker
  </div>
);

const LocationChip: React.FC<MarkerProps> = () => {
  return (

    <IonChip color="success">Primary</IonChip>

  );
};

export const MarkerMap = (coordinates: any) => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = ({ map, maps }: any) => {
    mapRef.current = map;
    setMapReady(true);
  };

  return (
    <>
      <GoogleMap
        apiKey=""
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
