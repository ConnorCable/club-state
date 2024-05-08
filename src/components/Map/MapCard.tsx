import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import React from "react";

interface MapCardProps {
  name: String;
  address: String;
  genre: String
}

const MapCard: React.FC<MapCardProps> = ({ name, address }) => {
  // Implement the MapCard component logic here

  return (
    <IonCard>
      <IonCardTitle>
        <h3>{name}</h3>
        <p>{address}</p>
    <IonC
      </IonCardTitle>
    </IonCard>
  );
};

export default MapCard;
