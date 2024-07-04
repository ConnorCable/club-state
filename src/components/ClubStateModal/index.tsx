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
  useIonViewWillEnter,
  IonAlert,
  IonicSafeString,
  IonBadge,
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
import useClubStore from "../../models/ClubStore";
import { ShazamResponse } from "../../models/ShazamResponse";
import { ShazamModal } from "../ShazamModal";
import { TruncateText } from "../../helpers/TextTruncation";
import { CalculateTimeDifference } from "../../helpers/TimeSinceCaptured";
import './index.css';

const ClubAccordionItem: React.FC<{ item: any }> = ({ item }) => (
  <IonAccordion value={item.id}>
    <IonItem slot="header" color="light">
      <IonGrid className="ion-padding">
        <IonRow>
            <IonCol>
              <IonLabel><h6><sup>{CalculateTimeDifference(item.data().captureTime.seconds)}</sup></h6></IonLabel>
            </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
              <div>
                <sup className="song-info"><em>{item.data().song}</em> - <em>{item.data().artist}</em></sup>
            </div>
          </IonCol>
          <IonCol size="auto" className="genre-col">
            <IonBadge color="dark" className="genre-badge">{TruncateText(item.data().genre, 8)}</IonBadge>
          </IonCol>
        </IonRow>
        <IonRow>
        </IonRow>
      </IonGrid>
    </IonItem>
    <div slot="content">
      <ClubStateCard data = {item.data()}/>
    </div>
  </IonAccordion>
);

const ClubModal: React.FC<{ isOpen: boolean; setIsOpen: (arg0: boolean) => void; activeClub: string | undefined}> = ({ isOpen, setIsOpen, activeClub }) => {
  const [items, setItems] = useState<any[]>([]);
  const [captureEligbility, setCaptureEligibility] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const accordionContentRef = useRef<HTMLDivElement>(null);
  const screenHeight = window.innerWidth;
  const { location, setLocation, isLocationLoading, setIsLocationLoading  } = useDataStore();
  const {getClubRef} = useClubStore();

  const [isShazamCaptured, setIsShazamCaptured] = useState(false);
  const [shazamResponse, setShazamResponse] = useState<ShazamResponse | null>(null);
  const [shazamError, setShazamError] = useState<string | null>(null);

  const [recordingStatus, setRecordingStatus] = useState("");
  const [recordedData, setRecordedData] = useState("");
  const [recordingCaptured, setRecordingCaptured] = useState(true);
  const [detectedSong, setDetectedSong] = useState<string | undefined>("")

  useEffect(() => {

    const getStates = async () => {
      const ref = getClubRef(activeClub!)
      if(ref){
        const unsubscribe = await ref.collection("states").onSnapshot(snapshot => {
          const states = snapshot.docs;
          const sortedStates = states.sort((a, b) => b.data().captureTime.seconds - a.data().captureTime.seconds);
          setItems(sortedStates.map((doc) => doc));
        });
        return () => unsubscribe();
      }
    }

    getStates()
  },[ activeClub])

  const captureState = async () => {
      startRecording();
      setTimeout(stopRecording, 4000);
  }

  const startRecording = async () => {
      setRecordingCaptured(true);
      try 
      {
          const permissionResult = await VoiceRecorder.requestAudioRecordingPermission();
          
          if (!permissionResult.value) 
          {
              console.error('Permission denied to record audio');
              return;
          }
  
          const result: GenericResponse = await VoiceRecorder.startRecording();
          console.log('Recording started:', result.value);
          setRecordingStatus('RECORDING');
      } catch (error) 
      {
          console.error('Failed to start recording:', error);
      }
  };
  
  const stopRecording = async () => {
      try 
      {
        const result: RecordingData = await VoiceRecorder.stopRecording();
        setRecordingStatus('NONE');
         
        if(result.value.recordDataBase64)
        {
          console.log("valid data");
          setRecordedData(result.value.recordDataBase64);
          setRecordingCaptured(false);
          setCaptureEligibility(false);
        }
        sendAudio();
      } catch (error) 
      {
        console.error('Failed to stop recording:', error);
      }
  };
  
  const sendAudio = async () => {
      const shazamResponse = await songDetect2(recordedData)
      console.log(shazamResponse)
      setShazamResponse(shazamResponse!);
      setIsShazamCaptured(true);
      
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
      
      if (recordingStatus === 'RECORDING') 
      {
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

const loadMore = () => {

  setPageNumber(pageNumber + 1);

};

const handleRecordClick = async () => {
  setCaptureEligibility(false);
}

const handleContinue = () => {

  setIsShazamCaptured(false);
  setShazamResponse(null);
  setShazamError(null);

};

const handleCancel = () => {

  setIsShazamCaptured(false);
  setShazamResponse(null);
  setShazamError(null);

};

const handleCloseShazamModal = () => {

  setIsShazamCaptured(false);
  setShazamResponse(null);
  setShazamError(null);

};

const handleLocationClick = async () => {

  setIsLocationLoading(true);
  setIsShazamCaptured(false);

  // Handle Geoverification
  const position = await Geolocation.getCurrentPosition();

  const firestore = firebase.firestore();

  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(firestore);

  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('geo-clubs');

  // 1609 km roughly 1 mi (Currently testing 0.02km ~ 0.01 miles)
  const query = geocollection.near({ center: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude), radius: 0.86});

  query.get().then((value) => {
    const valueCount = value.docs.length;
    // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    try
    {
      var nearestClubs = value.docs.filter((element) => {
        return element.distance <= 0.05;
      });
      if(nearestClubs.length > 0)
      {
        nearestClubs.sort((a, b) => a.distance - b.distance);
        console.log(nearestClubs[0].distance);
      }
      
      (nearestClubs[0].distance) < 0.1 ? setCaptureEligibility(true)
    : console.log(false);

    }catch(e)
    {
      setCaptureEligibility(false);
      setIsLocationLoading(false);
    }

  });

  setLocation(position);
  setIsLocationLoading(false);
}

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false} className="modal">
      {isShazamCaptured && shazamResponse && (
        <ShazamModal
          isOpen={true}
          onClose={handleCloseShazamModal}
          shazamResponse={shazamResponse}
        />
      )}

      {isShazamCaptured && shazamError && (
        <IonAlert
          isOpen={true}
          header="Error"
          message={shazamError}
          buttons={[
            {
              text: "OK",
              handler: handleCancel,
            },
          ]}
        />
      )}
       <IonHeader >
          <IonToolbar color="light"  >
            <IonButton className="ion-padding-start " color={"transparent"} onClick={() => setIsOpen(false)}>
              <IonIcon icon={arrowBack}/>
            </IonButton>
          </IonToolbar>
        </IonHeader>
      <IonContent> 
        <div style={{ maxHeight: screenHeight * 1.6, overflowY: 'scroll' }}>
          <IonAccordionGroup expand="inset">
            {items.map((item, index) => (
              <ClubAccordionItem key={item.id} item={item} />
            ))}
          </IonAccordionGroup>
        </div>
        
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
      <LoadingOverlay isOpen={isLocationLoading} message="Verifying Location" />
    </IonModal>
  );
};

export default ClubModal;