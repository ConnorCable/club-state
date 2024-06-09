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
  ClubProps: ClubProps
}

const click = () => {
  console.log("Clicked");
}

export const ClubCard: React.FC<ClickableClubCard> = ({ onClick,  ClubProps}) => {
  const recentState = ClubProps.RecentCapture;

  const ratio = recentState.ratio == "1"? "Bad" : recentState.ratio == "2" ? "Okay" : "Good"
  return (
    <>
    <IonCard>
      <IonCardHeader onClick={onClick} class="ion-no-padding">
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol class="ion-text-center ion-text-nowrap"><IonCardTitle><IonText><strong>{ClubProps.Name}</strong></IonText></IonCardTitle></IonCol>
          </IonRow>
          <IonRow>
              <IonCol> <IonCardSubtitle className="club-subtitle">
              <span>{ClubProps.Address} | </span>
              <span>| 0.25 Miles</span>
              </IonCardSubtitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol><IonChip>GENRE</IonChip></IonCol>
            <IonCol>
              <IonChip>
                Cover<IonIcon color={recentState.cover === false? "danger" : "success"} icon={recentState.cover === false ? closeOutline : checkmark}></IonIcon>
              </IonChip>
            </IonCol>
            <IonCol>
              <IonChip color="success">{recentState.price === "$" ? "💲" : recentState.price === "$$" ? "💲💲": "💲💲💲"}</IonChip>
            </IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonCardHeader>
      <IonCardContent>
        <div className="club-photo-container" onClick={onClick}>
          <img src={ClubProps.Image} alt="Club" style={{width: 300, height: 185, objectFit: "cover"}} />
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
