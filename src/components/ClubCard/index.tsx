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
import { getDistance, convertDistance } from 'geolib';
import { useDataStore } from "../../models/DataStore";
import "./index.css";
interface ClickableClubCard {
  onClick: () => void;
  ClubProps: ClubProps
}

const click = () => {
  console.log("Clicked");
}

export const ClubCard: React.FC<ClickableClubCard> = ({ onClick,  ClubProps}) => {
  const {location} = useDataStore();
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
              <span>| {location != null ? `${convertDistance(getDistance(
                {latitude: location.coords.latitude, longitude: location.coords.longitude},
                {latitude: ClubProps.Coordinates.latitude, longitude: ClubProps.Coordinates.longitude}
              ), 'mi').toFixed(3)} mi` : "N/A"}</span>
              </IonCardSubtitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol><IonChip  className="ion-text-nowrap">{recentState.genre}</IonChip></IonCol>
            <IonCol>
              <IonChip>
                Cover<IonIcon color={recentState.cover === false? "danger" : "success"} icon={recentState.cover === false ? closeOutline : checkmark}></IonIcon>
              </IonChip>
            </IonCol>
            <IonCol>
              <IonChip className="ion-text-nowrap" >{recentState.price === "$" ? "$" : recentState.price === "$$" ? "$$": "$$$"}</IonChip>
            </IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonCardHeader>
      <IonCardContent>
        <div className="club-photo-container" onClick={onClick}>
          <img src={ClubProps.ImageStoragePath} alt="Club" />
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
              <IonButton size="small" color="primary" href={`https://www.google.com/search?q=${recentState.song}+${recentState.artist}`}>
                  <IonIcon aria-hidden="true" icon={playCircleOutline}/>
              </IonButton>
              <IonCol>
                <IonText class="ion-text-small">
                  <h3><strong> Recently Played: </strong> {recentState.song} by {recentState.artist}</h3>
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
