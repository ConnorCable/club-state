import React, { useEffect, useRef, useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";
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
  IonFooter,
  IonToast,
  useIonLoading,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonChip,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { arrowBack, navigateCircleOutline, radioButtonOnOutline, recordingOutline } from "ionicons/icons";
import "swiper/css";
import "swiper/css/grid";
import { SwiperSlide, Swiper } from "swiper/react";
import { ClubStateCard } from "../ClubStateCard";
import { initializeApp } from "firebase/app";
import { useDataStore } from "../../models/DataStore";
import LoadingOverlay from "../LoadingOverlay";
import { ClubModalProps } from "../../models/ClubModalProps";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
import songDetect2 from "../../helpers/RecordingAPI";




const ClubAccordionItem: React.FC<{ id: string }> = ({ id }) => (
  <IonAccordion value={id}>
    <IonItem slot="header" color="light">
      <IonLabel>Track ID: {id}</IonLabel>
      <IonChip>Genre</IonChip>
    </IonItem>
    <div className="ion-padding" slot="content">
      <ClubStateCard />
    </div>
  </IonAccordion>
);

const ClubModal: React.FC<{ isOpen: boolean; setIsOpen: (arg0: boolean) => void; clubProps: ClubModalProps }> = ({ isOpen, setIsOpen, clubProps }) => {
  const [items, setItems] = useState<string[]>([]);
  const [captureEligbility, setCaptureEligibility] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const accordionContentRef = useRef<HTMLDivElement>(null);
  const screenHeight = window.innerWidth;
  const { location, setLocation, isLoading, setIsLoading  } = useDataStore();

  const [recordingStatus, setRecordingStatus] = useState("");
  const [recordedData, setRecordedData] = useState("");
  const [recordingCaptured, setRecordingCaptured] = useState(true);
  const [detectedSong, setDetectedSong] = useState<string | undefined>("")


  const captureState = async () => {
      
      startRecording();
      setTimeout(stopRecording, 4000);
  }

  const startRecording = async () => {
      setRecordingCaptured(true);
      try {
          const permissionResult = await VoiceRecorder.requestAudioRecordingPermission();
          if (!permissionResult.value) {
              console.error('Permission denied to record audio');
              return;
          }
  
          const result: GenericResponse = await VoiceRecorder.startRecording();
          console.log('Recording started:', result.value);
          setRecordingStatus('RECORDING');
      } catch (error) {
          console.error('Failed to start recording:', error);
      }
  };
  
  const stopRecording = async () => {
      try {
          const result: RecordingData = await VoiceRecorder.stopRecording();
          // console.log('Recording stopped:', result.value.recordDataBase64);
          setRecordingStatus('NONE');
         
          if(result.value.recordDataBase64){
              console.log("valid data");
              setRecordedData(result.value.recordDataBase64);
              setRecordingCaptured(false);
              setCaptureEligibility(false);
          }
          
          sendAudio();
  
      } catch (error) {
          console.error('Failed to stop recording:', error);
      }
  };
  
  const sendAudio = async () => {
      songDetect2(recordedData)
  }

  const resumeRecording = async () => {
      try {
          const result: GenericResponse = await VoiceRecorder.resumeRecording();
          console.log('Recording resumed:', result.value);
          setRecordingStatus('RECORDING');
      } catch (error) {
          console.error('Failed to resume recording:', error);
      }
  };

  const handleRecordingButton = () => {
      
      if (recordingStatus === 'RECORDING') {
          console.log("stopping");
          stopRecording();
      } else if (recordingStatus === 'PAUSED') {
          resumeRecording();
          console.log("paused");
      } else {
          console.log("playing");
          captureState();
      }
  };


  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 10; i++) {
      newItems.push(`Item ${items.length + i + 1}`);
    }
    setItems([...items, ...newItems]);
  };

  useEffect(() => {
    generateItems();
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber(pageNumber + 1);
  };

const handleRecordClick = async () => {
  console.log(true);
  setCaptureEligibility(false);
}

const handleLocationClick = async () => {
  // Activate Loading Components 
  setIsLoading(true);

  // Handle Geoverification
  const position = await Geolocation.getCurrentPosition();
  console.log(position.coords);
  const firestore = firebase.firestore();

  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(firestore);

  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('geo-clubs');

  // 1609 km roughly 1 mi
  const query = geocollection.near({ center: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude), radius: 2 });

    // Get query (as Promise)
  query.get().then((value) => {
    const valueCount = value.docs.length;
    // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    console.log(value.docs[valueCount-1].distance);
    
    (value.docs[valueCount-1].distance) < 0.00883427277203622 ? setCaptureEligibility(true)
    : console.log(false);

  });
    
  setLocation(position);
  setCaptureEligibility(true);

  // Finish Loading
  setIsLoading(false);
}

  return (
    <IonModal isOpen={isOpen} canDismiss>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButton color={"primary"} onClick={() => setIsOpen(false)}>
              <IonIcon icon={arrowBack} />
            </IonButton>
            <IonTitle>State Started: Timestamp</IonTitle>
          </IonToolbar>
        </IonHeader>       
        <IonCardTitle className="ion-padding ion-text-center">
          Last Capture: Timestamp
        </IonCardTitle>
        
        <div style={{ maxHeight: screenHeight * 1.6, overflowY: 'scroll' }}>
          <IonAccordionGroup expand="inset">
            {items.map((item, index) => (
              <ClubAccordionItem key={item} id={item} />
            ))}
          </IonAccordionGroup>
        </div>
        
        <IonInfiniteScroll threshold="100px" disabled={!hasMore} onIonInfinite={loadMore}>
          <IonInfiniteScrollContent loadingText="Loading more items..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <div  className="ion-activatable ripple-parent">
                <IonButton size="large" color="dark" fill="outline" onClick={handleLocationClick} disabled={captureEligbility}>
                  <IonIcon slot="start" icon={navigateCircleOutline} />
                  Seek Bid
                </IonButton>
              </div>
            </IonCol>
            <IonCol>
              <div>
                <IonButton size="large" color="danger" fill="outline" disabled={!captureEligbility} onClick={handleRecordingButton}>
                  <IonIcon slot="start" icon={radioButtonOnOutline} />
                  REC
                </IonButton>
              </div>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
      <LoadingOverlay isOpen={isLoading} message="Veryfing Location" />
    </IonModal>
  );
};

export default ClubModal;