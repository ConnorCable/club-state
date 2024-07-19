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
import { useDataStore } from "../../models/DataStore";

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

  const { isShazamCorrect, isShazamCaptured, isCompletingForm, setIsShazamCorrect, setIsShazamCaptured, setIsCompletingForm} = useDataStore();
  

  const cancelShazam = () => {
    setIsShazamCaptured(false);
    setIsShazamCorrect(false);
    onClose();
  }

  const acceptShazam = () => {
    console.log(isShazamCorrect);
    setIsShazamCorrect(true);
    setIsCompletingForm(true);
    onClose();
    
  }
  
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="custom-modal" backdropDismiss={false}>
      <div className="wrapper">
      <div className="header-top-padding"></div>
      <div className="lava-lamp-background"></div>
        <IonHeader className="ion-padding">
          <IonToolbar>
            <IonTitle>Track ID</IonTitle>
            <IonButton slot="end" fill="clear" onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="ion-padding extra-top-padding">
            <div className="image-container">
              <img src={shazamResponse.imageUrl} alt="photo" />
            </div> 
            <IonRow><IonLabel>Artist: {shazamResponse.subTitle}</IonLabel></IonRow>
            <IonRow><IonLabel>Song: {shazamResponse.title}</IonLabel></IonRow>
            <IonRow><IonLabel>Genre: {shazamResponse.genre}</IonLabel></IonRow>
            <IonCol></IonCol>
            <IonRow className="handling-button-padding"><IonCol></IonCol><IonButton color="success" onClick={acceptShazam}>Continue</IonButton> <IonButton color="danger" onClick={cancelShazam}>Cancel</IonButton><IonCol></IonCol></IonRow>
          </IonGrid>
      </div>
    </IonModal>
  );
};

export default ShazamModal;