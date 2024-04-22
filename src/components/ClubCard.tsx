import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";

interface ClickableClubCard {
  onClick: () => void;
}

export const ClubCard: React.FC<ClickableClubCard> = ({ onClick }) => {
  return (
    <IonCard onClick={onClick}>
      <IonCardHeader>
        <IonCardTitle>Club 1</IonCardTitle>
        <IonCardSubtitle className="club-subtitle">
          {/* Render information in a horizontal row */}
          <span>1234 Mystery Way</span>
          <span>State</span>
          <span>Distance</span>
          {/* Add more elements as needed */}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {/* Apply styling to center the photo */}
        <div className="club-photo-container">
          <img src="\assets\Wikipedia_space_ibiza(03).jpg" alt="Club" />
        </div>
      </IonCardContent>
    </IonCard>
  );
};
