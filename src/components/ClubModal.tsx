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
  IonFabButton,
  IonFab,
  IonFooter
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import "swiper/css";
import "swiper/css/grid";
import { SwiperSlide, Swiper } from "swiper/react";
import { ClubStateCard } from "./ClubStateCard";
import RecordingModal from "./RecordingModal";

const ClubModal: React.FC<{ isOpen: boolean; setIsOpen: (arg0: boolean) => void; }> = ({ isOpen, setIsOpen }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false); // State for recording modal visibility

  const handleScroll = (e: CustomEvent) => {
    // Check if the user is scrolling
    if (e.detail.scrollTop > 0 && !isScrolling) {
      setIsScrolling(true); // User started scrolling
    } else if (e.detail.scrollTop === 0 && isScrolling) {
      setIsScrolling(false); // User stopped scrolling
    }
  };

  const openRecordingModal = () => {
    setIsRecordingModalOpen(true);
  };

  const closeRecordingModal = () => {
    setIsRecordingModalOpen(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonContent onIonScroll={(e: CustomEvent) => handleScroll(e)}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButton color={"primary"} onClick={() => setIsOpen(false)}>
              <IonIcon icon={arrowBack} />
            </IonButton>
            <IonTitle>Club Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCardTitle className="ion-padding ion-text-center">
          1234 Mystery Way
        </IonCardTitle>
        <Swiper>
          <SwiperSlide>
            <img
              className="ion-padding"
              src="\assets\Wikipedia_space_ibiza(03).jpg"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="ion-padding"
              src="\assets\Wikipedia_space_ibiza(03).jpg"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="ion-padding"
              src="\assets\Wikipedia_space_ibiza(03).jpg"
            ></img>
          </SwiperSlide>
        </Swiper>

        <div className="ion-text-center">Club Stats</div>
        <IonGrid>
          <IonRow>
            {/* Your IonCol components */}
          </IonRow>
        </IonGrid>
        <div className="ion-text-center">Current Club States</div>
        <ClubStateCard />
        <ClubStateCard />
      </IonContent>
      {/* Hide the footer when scrolling */}
      {!isScrolling && (
        <IonFooter>
          {/* Open recording modal on IonFabButton click */}
          <IonFabButton className="ion-fab-button" onClick={openRecordingModal}>Record</IonFabButton>
        </IonFooter>
      )}

      {/* Rendering RecordingModal */}
      <RecordingModal isOpen={isRecordingModalOpen} onClose={closeRecordingModal} />
    </IonModal>
  );
};

export default ClubModal;
