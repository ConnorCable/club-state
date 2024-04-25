import React, { useState } from "react";
import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonTitle,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardSubtitle,
  IonLoading,
  IonItemDivider,
  IonText,
  useIonLoading,
} from "@ionic/react";
import { arrowBack, arrowBackCircleOutline } from "ionicons/icons";
import { RecordingPage } from "../pages/RecordingPage";

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecordingModal: React.FC<RecordingModalProps> = ({ isOpen, onClose }) => {
  // Function to handle the close button click event
  const handleClose = () => {
    onClose();
  };

  
  return (
    <IonModal isOpen={isOpen} animated={false}>
      <IonHeader>
        <IonToolbar>
          <IonIcon size="large" slot="end" onClick={handleClose} icon={arrowBackCircleOutline}></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RecordingPage></RecordingPage>
      </IonContent>
    </IonModal>
  );
};

export default RecordingModal;
