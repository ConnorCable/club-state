import React, { useEffect } from "react";
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


declare const confetti: (options?: any) => void;


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

  const { isShazamCorrect, isShazamCaptured, isCompletingForm, setIsShazamCorrect, setIsShazamCaptured, setIsCompletingForm, setRecordedSong} = useDataStore();
  

  const cancelShazam = () => {
    setIsShazamCaptured(false);
    setIsShazamCorrect(false);
    onClose();
  }

  const acceptShazam = () => {
    setRecordedSong(
      {artist: shazamResponse.subTitle, song: shazamResponse.title, genre: shazamResponse.genre}
    );
    setIsShazamCorrect(true);
    setIsCompletingForm(true);
    onClose();
    
    
  }

  useEffect(() => {
    if (isOpen) {
      confetti({
        angle: 90,
        spread: 360,
        particleCount: 100,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  
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
        <IonGrid className="ion-padding extra-top-padding ion-no-margin">
          <div className="image-container">
            <img src={shazamResponse.imageUrl} alt="photo" />
          </div>
          <div className="text-container">
            <IonRow>
              <IonCol size="12">
                <div className="info-line">
                  <span className="info-label">Artist:</span>
                  <span className="info-content">{shazamResponse.subTitle}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <div className="info-line">
                  <span className="info-label">Song:</span>
                  <span className="info-content">{shazamResponse.title}</span>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <div className="info-line">
                  <span className="info-label">Genre:</span>
                  <span className="info-content">{shazamResponse.genre}</span>
                </div>
              </IonCol>
            </IonRow>
          </div>
          <IonRow className="handling-button-padding">
            <IonCol></IonCol>
            <IonButton color="success" onClick={acceptShazam}>Continue</IonButton>
            <IonButton color="danger" onClick={cancelShazam}>Cancel</IonButton>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </IonModal>
  );
};

export default ShazamModal;