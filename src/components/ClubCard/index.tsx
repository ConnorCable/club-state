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
import { checkmark, closeOutline, playCircleOutline, square } from "ionicons/icons";
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';
import { Position } from "@capacitor/geolocation";
import { ClubModalProps } from "../../models/ClubModalProps";
import { ClubProps } from "../../models/ClubProps";


interface ClickableClubCard {
  onClick: () => void;
  ClubModalProps: ClubModalProps
  ClubProps: ClubProps
}

const click = () => {
  console.log("Clicked");
}


export const ClubCard: React.FC<ClickableClubCard> = ({ onClick, ClubModalProps, ClubProps}) => {
  const recentState = ClubProps.RecentCapture;
  
  const ratio = recentState.ratio == "1"? "Bad" : recentState.ratio == "2" ? "Okay" : "Good"
  return (
    <>
    <IonCard>
      <IonCardHeader onClick={onClick}>
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol><IonCardTitle>{ClubProps.Name}</IonCardTitle></IonCol>
            </IonRow>
          <IonRow className="ion-justify-content-start">
            <IonCol>
            <IonChip>
              Cover
              <IonIcon color={recentState.cover === false? "danger" : "success"} icon={recentState.cover === false ? closeOutline : checkmark}></IonIcon>
            </IonChip>
            </IonCol>
            <IonCol>
              <IonChip color="success">{recentState.price}</IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCardSubtitle className="club-subtitle">
          <span>Address: {ClubProps.Address} | </span>
          <span>Genre: {recentState.genre} | </span>
          <span>Distance: 999</span>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="club-photo-container" onClick={onClick}>
          <img src={ClubProps.Image} alt="Club" />
      </div>
      <div>
      <IonGrid className="overlay-grid">
            <IonRow>
              <IonCol size="13">
                <IonChip>Fullness: {recentState.fullness}</IonChip>
                <IonChip>Hostility: {recentState.hostility}</IonChip>
                <IonChip>Ratio: {recentState.ratio}</IonChip>
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
