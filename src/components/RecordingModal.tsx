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
} from "@ionic/react";

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
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recording</IonTitle>
          <IonButton slot="end" onClick={handleClose}>Close</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Add your recording component or content here */}
        <IonTitle>This is the recording modal</IonTitle>
      </IonContent>
    </IonModal>
  );
};

export default RecordingModal;
