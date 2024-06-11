import React from "react";
import {
  IonModal,
  IonContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { ShazamResponse } from "../../models/ShazamResponse";
import "./index.css";

interface ShazamModalProps {
  isOpen: boolean;
  onClose: () => void;
  shazamResponse: ShazamResponse;
}

export const ShazamModal: React.FC<ShazamModalProps> = ({
  isOpen,
  onClose,
  shazamResponse,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="custom-modal" backdropDismiss={false}>
      <div className="wrapper">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Track ID</IonTitle>
            <IonButton slot="end" fill="clear" onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
            <div className="image-container">
              <img src={shazamResponse.imageUrl} alt="photo" />
            </div> 
            <IonRow><IonLabel>Artist: {shazamResponse.subTitle}</IonLabel></IonRow>
            <IonRow><IonLabel>Song: {shazamResponse.title}</IonLabel></IonRow>
            <IonRow><IonLabel>Genre: {shazamResponse.genre}</IonLabel></IonRow>
            <IonCol></IonCol>
            <IonRow><IonCol></IonCol><IonButton>Continue</IonButton> <IonButton>Cancel</IonButton><IonCol></IonCol></IonRow>
          </IonGrid>
      </div>
    </IonModal>
  );
};

export default ShazamModal;