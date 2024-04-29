import React, { useEffect, useRef, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
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
  IonFooter,
  useIonLoading,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonChip,
} from "@ionic/react";
import { arrowBack, navigateCircleOutline, radioButtonOnOutline } from "ionicons/icons";
import "swiper/css";
import "swiper/css/grid";
import { ClubStateCard } from "../ClubStateCard";
import RecordingModal from "../RecordingModal";
import { useHistory } from 'react-router-dom';


const ClubModal: React.FC<{ isOpen: boolean; setIsOpen: (arg0: boolean) => void; }> = ({ isOpen, setIsOpen }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false); // State for recording modal visibility
  const [present, dismiss] = useIonLoading();
  const [isLoading, setIsLoading] = useState(true);
  const [captureEligibility, setCaptureElgibility] = useState(false);
  const accordionContentRef = useRef<HTMLDivElement>(null); // Ref for accordion content
  const [isSurveyModalOpen,setIsSurveyModalOpen] = useState(false)
  const history = useHistory();
  
  const goToSurveyPage = () => {
    history.push('/survey');
  };

  const handleScroll = (e: CustomEvent) => {
    // Check if the user is scrolling
    if (e.detail.scrollTop > 0 && !isScrolling) {
      setIsScrolling(true); // User started scrolling
    } else if (e.detail.scrollTop === 0 && isScrolling) {
      setIsScrolling(false); // User stopped scrolling
    }
  };  

  const handleRecordClick = () => {
    present({
      message: 'Capturing Audio...',
      duration: 1000,
      onDidDismiss: () => openSurveyModal(),
    }); 
    
  }

  const handleLocationClick = () => {
    console.log(Geolocation.getCurrentPosition);
    present({
      message: 'Looking for coordinate match...',
      duration: 1000,
      onDidDismiss: () => setCaptureElgibility(true),
    }); 
  }

  const openRecordingModal = () => {
    setIsRecordingModalOpen(true);
  };

  const closeRecordingModal = () => {
    setIsRecordingModalOpen(false);
  };

  const openSurveyModal = () => {
    setCaptureElgibility(false)
    setIsOpen(false)
    history.push('/survey');
  }

  const closeSurveyModal = () => {
    setIsSurveyModalOpen(false)
  }

  useEffect(() => {
    // Scroll to center of accordion content when expanded
    if (accordionContentRef.current) {
      accordionContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isScrolling]); // Trigger effect when accordion is expanded

  return (
    <IonModal isOpen={isOpen} canDismiss>
      <IonContent onIonScroll={(e: CustomEvent) => handleScroll(e)}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButton color={"primary"} onClick={() => setIsOpen(false)}>
              <IonIcon icon={arrowBack} />
            </IonButton>
            <IonTitle >Club Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonCardTitle className="ion-padding ion-text-center">
          1234 Mystery Way
        </IonCardTitle>
        {/* <Swiper>
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
              className="ion-padding club-image"
              src="\assets\Wikipedia_space_ibiza(03).jpg"
            ></img>
          </SwiperSlide>
        </Swiper> */}

        <IonAccordionGroup expand="inset">
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>Track ID: </IonLabel>
              <IonLabel>Unknown</IonLabel>
              <IonLabel>Timestamp</IonLabel>
              <IonChip>Genre</IonChip>
            </IonItem>
            <div className="ion-padding" slot="content" ref={accordionContentRef}>
              <ClubStateCard />
            </div>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" color="light">
              <IonLabel>Track ID: </IonLabel>
              <IonLabel>Unknown</IonLabel>
              <IonChip>Genre</IonChip>
            </IonItem>
            <div className="ion-padding" slot="content" ref={accordionContentRef}>
              <ClubStateCard />
            </div>
          </IonAccordion>
          <IonAccordion value="third">
            <IonItem slot="header" color="light">
              <IonLabel>Track ID: </IonLabel>
              <IonLabel>Unknown</IonLabel>
              <IonChip>Genre</IonChip>
            </IonItem>
            <div className="ion-padding" slot="content" ref={accordionContentRef}>
              <ClubStateCard />
            </div>
          </IonAccordion>
          <IonAccordion value="fourth">
            <IonItem slot="header" color="light">
              <IonLabel>Track ID: </IonLabel>
              <IonLabel>Unknown</IonLabel>
              <IonChip>Genre</IonChip>
            </IonItem>
            <div className="ion-padding" slot="content" ref={accordionContentRef}>
              <ClubStateCard />
            </div>
          </IonAccordion>
        </IonAccordionGroup>
        
      </IonContent>
      {/* Hide the footer when scrolling */}
      {!isScrolling && (
        <IonFooter>
          {/* Open recording modal on IonFabButton click */}
          <IonGrid>
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <div  className="ion-activatable ripple-parent">
                  <IonButton size="large" color="dark" fill="outline" onClick={handleLocationClick} disabled={captureEligibility}>
                    <IonIcon slot="start" icon={navigateCircleOutline} />
                    Seek Bid
                  </IonButton>
                </div>
              </IonCol>
              <IonCol>
                <div>
                  <IonButton id="headerAnchor" size="large" color="danger" fill="outline" onClick={handleRecordClick} disabled={!captureEligibility}>
                    <IonIcon slot="start" icon={radioButtonOnOutline} />
                    REC
                  </IonButton>
                </div>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        </IonFooter>
      )}
      {/* Rendering RecordingModal */}
      <RecordingModal isOpen={isRecordingModalOpen} onClose={closeRecordingModal} />
    </IonModal>
  );
};

export default ClubModal;