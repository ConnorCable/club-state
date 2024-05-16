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
  console.log(ClubProps.Image)
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
              <IonIcon icon={checkmark}></IonIcon>
            </IonChip>
            </IonCol>
            <IonCol>
              <IonChip color="success">$$$</IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCardSubtitle className="club-subtitle">
          <span>{ClubProps.Address}</span>
          <span>Genre</span>
          <span>Distance</span>
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
                <IonChip>Fullness: 5 </IonChip>
                <IonChip>Hostility: 5</IonChip>
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
