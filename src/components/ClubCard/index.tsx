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
  IonChip,
} from "@ionic/react";
import { checkmark, playCircleOutline, square } from "ionicons/icons";
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';

interface ClickableClubCard {
  onClick: () => void;
  
}

const click = () => {
  console.log("Clicked");
}


export const ClubCard: React.FC<ClickableClubCard> = ({ onClick }) => {
  return (
    <>
    <IonCard>
      <IonCardHeader onClick={onClick}>
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol>
            <IonCardTitle>Club 1</IonCardTitle>
            </IonCol>
            <IonCol>
            <IonChip>
              Cover
              <IonIcon icon={checkmark}></IonIcon>
            </IonChip>
            </IonCol>
            <IonCol>
              <IonChip color="success">$$$</IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCardSubtitle className="club-subtitle">
          <span>1234 Mystery Way</span>
          <span>Genre</span>
          <span>Distance</span>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="club-photo-container" onClick={onClick}>
          <img src="\assets\Wikipedia_space_ibiza(03).jpg" alt="Club" />
      </div>
      <div>
      <IonGrid className="overlay-grid">
            <IonRow>
              <IonCol size="13">
                <IonChip>Fullness: 5 </IonChip>
                <IonChip>Hositlity: 5</IonChip>
                <IonChip>Ratio: 4</IonChip>
              </IonCol>
            </IonRow>
          </IonGrid>
      </div>
        <div>
          <IonGrid>
            <IonRow>
              <IonCol>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonButton size="small" onClick={click}>
                  <IonIcon aria-hidden="true" icon={playCircleOutline} />
              </IonButton>
              <IonCol>
                <IonText class="ion-text-small">
                  <h3>Recently Played: Circles (Oppidan Remix)</h3>
                  </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonCardContent>
    </IonCard>
    </>
  );
};
