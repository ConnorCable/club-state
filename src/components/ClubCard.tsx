import React, { useEffect, useRef } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { playCircleOutline, square } from "ionicons/icons";

interface ClickableClubCard {
  onClick: () => void;
  
}

const click = () => {
  console.log("Clicked");
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
        <div>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText class="ion-text-small">
                  <h3>Recently Played: Circles (Oppidan Remix)</h3>
                  
                  </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                  <IonButton size="small" onClick={click}>
                  <IonIcon aria-hidden="true" icon={playCircleOutline} />
                  </IonButton>
              </IonCol>
            </IonRow>
          <IonRow>

          </IonRow>
          </IonGrid>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
