import React, { useEffect, useRef, useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";
import { useIonAlert } from '@ionic/react';
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
  IonRange,
  IonCard,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  arrowBack,
  cropOutline,
  femaleOutline,
  femaleSharp,
  maleOutline,
  maleSharp,
  navigateCircleOutline,
  personAdd,
  personAddOutline,
  personRemoveOutline,
  radioButtonOnOutline,
  recordingOutline,
  ticketSharp,
} from "ionicons/icons";
import "swiper/css";
import "swiper/css/grid";
import { SwiperSlide, Swiper } from "swiper/react";
import { ClubStateCard } from "../ClubStateCard";
import { initializeApp } from "firebase/app";
import { useDataStore } from "../../models/DataStore";
import LoadingOverlay from "../LoadingOverlay";
import { ClubModalProps } from "../../models/ClubModalProps";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import * as geofirestore from "geofirestore";
import {
  VoiceRecorder,
  VoiceRecorderPlugin,
  RecordingData,
  GenericResponse,
  CurrentRecordingStatus,
} from "capacitor-voice-recorder";
import songDetect2 from "../../helpers/RecordingAPI";
import useClubStore from "../../models/ClubStore";
import { ShazamResponse } from "../../models/ShazamResponse";
import { ShazamModal } from "../ShazamModal";
import { TruncateText } from "../../helpers/TextTruncation";
import { CalculateTimeDifference } from "../../helpers/TimeSinceCaptured";
import "./index.css";
import { ClubProps } from "../../models/ClubProps";
import haversine from "haversine-distance";
import FormModal from "../FormModal";
import "swiper/css";
import "swiper/css/pagination";
import RecordingOverlay from "../RecordingOverlay";

interface ClubStateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ClubStateModal: React.FC<ClubStateModalProps> = ({ isOpen, onClose, data }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Club State Details</IonTitle>
          <IonButton className="close-button" slot="start" onClick={onClose} color="light">
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonRange
              label="Fullness"
              className="fullnessIndicator"
              disabled={true}
            >
              <IonIcon slot="start" icon={personRemoveOutline} />
              <IonIcon slot="end" icon={personAdd} />
            </IonRange>
            <IonRange
              label="Ratio"
              className="fullnessIndicator"
              disabled={true}
            >
              <IonIcon slot="start" icon={maleSharp} color="secondary" />
              <IonIcon slot="end" icon={femaleSharp} color="danger" />
            </IonRange>
            <IonList className="admin-grid ion-padding-top">
            <IonItem className="compact-item">
            <IonTitle  slot="start" className="ion-padding-right">COVER</IonTitle>
            
            </IonItem>
            <IonItem className="compact-item">
            <IonTitle className="ion-padding-right" slot="start">LINE</IonTitle>
              <IonSegment slot="end" >
                <IonSegmentButton value="yes" disabled={true}>
                  <IonLabel>Yes</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="no" >
                  <IonLabel color={"primary"}>No</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
            <IonItem className="compact-item-3">
              <IonTitle >PRICE</IonTitle>
              <IonSegment>
                <IonSegmentButton value="1" disabled>
                  <IonLabel>$</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="2">
                  <IonLabel>$$</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="3">
                  <IonLabel>$$$</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
            <IonItem className="compact-item-3">
            <IonTitle className="ion-padding-right" >CLEAN?</IonTitle>
              <IonSegment>
                <IonSegmentButton value="1">
                  <IonLabel><h1>🤢</h1></IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="2">
                  <IonLabel><h1>😐</h1></IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="3">
                  <IonLabel><h1>🤩</h1></IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
            <IonItem className="compact-item-6">
            <IonTitle className="ion-padding-right" >HOSTILE?</IonTitle>
              <IonSegment>
                <IonSegmentButton value="1">
                  <IonLabel><h1>🫶</h1></IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="2">
                  <IonLabel><h1>😳</h1></IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="3">
                  <IonLabel><h1>🤬</h1></IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
            <IonItem className="compact-item-3">
            <IonTitle className="ion-padding-right">LOUD?</IonTitle>
              <IonSegment >
                <IonSegmentButton value="1">
                  <IonLabel><h1>🔇</h1></IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="2">
                  <IonLabel><h1>🔈</h1></IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="3">
                  <IonLabel><h1>🔊</h1></IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
          </IonList>
      </IonContent>
    </IonModal>
  );
};

const ClubAccordionItem: React.FC<{ item: any }> = ({ item }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setShowModal(true);
    };

    return (
      <>
        <IonItem button onClick={handleClick} color="light">
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol>
                <IonLabel>
                  <h6>
                    <sup>
                      {CalculateTimeDifference(item.data().captureTime.seconds)}
                    </sup>
                  </h6>
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <div>
                  <sup className="song-info">
                    <em>{item.data().song}</em> - <em>{item.data().artist}</em>
                  </sup>
                </div>
              </IonCol>
              <IonCol size="auto" className="genre-col">
                <IonBadge color="dark" className="genre-badge">
                  {TruncateText(item.data().genre, 8)}
                </IonBadge>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
        <ClubStateModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          data={item.data()}
        />
      </>
    );
  };

const ClubModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  activeClub: string | undefined;
}> = ({ isOpen, setIsOpen, activeClub }) => {
  const [items, setItems] = useState<any[]>([]);
  const [captureEligbility, setCaptureEligibility] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const accordionContentRef = useRef<HTMLDivElement>(null);
  const screenHeight = window.innerWidth;
  const { location, setLocation, isLocationLoading, setIsLocationLoading } =
    useDataStore();
  const { getClubRef } = useClubStore();

  const { isShazamCorrect, setIsShazamCorrect } = useDataStore();
  const { isShazamCaptured, setIsShazamCaptured } = useDataStore();
  const [shazamResponse, setShazamResponse] = useState<ShazamResponse | null>(
    null
  );
  const [shazamError, setShazamError] = useState<string | null>(null);

  const [recordingStatus, setRecordingStatus] = useState("");
  const [recordedData, setRecordedData] = useState("");
  const [recordingCaptured, setRecordingCaptured] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isLocationFailed, setIsLocationFailed] = useState(false);
  const [detectedSong, setDetectedSong] = useState<string | undefined>("");
  const [distanceAway, setDistanceAway] = useState<string>("");
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    const getStates = async () => {
      const ref = getClubRef(activeClub!);
      if (ref) {
        const unsubscribe = await ref
          .collection("states")
          .onSnapshot((snapshot) => {
            const states = snapshot.docs;
            const sortedStates = states.sort(
              (a, b) =>
                b.data().captureTime.seconds - a.data().captureTime.seconds
            );
            setItems(sortedStates.map((doc) => doc));
          });
        return () => unsubscribe();
      } else {
        console.error("No Club Ref Found");
      }
    };

    getStates();
  }, [activeClub]);

  const handleShazamCancel = () => {
    setIsShazamCorrect(false);
    setCaptureEligibility(false);
  };

  const captureState = async () => {
    setIsRecording(true);
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      await startRecording();
      await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for 4 seconds
      const success = await stopRecording();
      
      if (success) {
        break;
      } else if (attempts === maxAttempts) {
        presentAlert({
          header: 'Recording Failed',
          message: 'Unable to capture audio after multiple attempts. Please try again.',
          buttons: ['OK']
        });
        setCaptureEligibility(false);
      } else {
        console.log(`Attempt ${attempts} failed. Retrying...`);
      }
    }
    setIsRecording(false);
  };

  const startRecording = async () => {
    setRecordingCaptured(true);
    try {
      const permissionResult = await VoiceRecorder.requestAudioRecordingPermission();
  
      if (!permissionResult.value) {
        console.error("Permission denied to record audio");
        return false;
      }
  
      const result: GenericResponse = await VoiceRecorder.startRecording();
      console.log("Recording started:", result.value);
      setRecordingStatus("RECORDING");
      return true;
    } catch (error) {
      console.error("Failed to start recording:", error);
      return false;
    }
  };

  const stopRecording = async () => {
    try {
      const result: RecordingData = await VoiceRecorder.stopRecording();
      setRecordingStatus("NONE");
  
      if (result.value && result.value.recordDataBase64 && result.value.recordDataBase64.length > 0) {
        console.log("valid data");
        setRecordedData(result.value.recordDataBase64);
        await sendAudio(result.value.recordDataBase64);
        return true;
      } else {
        console.error("Recording failed: No data captured");
        return false;
      }
    } catch (error) {
      console.error("Failed to stop recording:", error);
      return false;
    }
  };

  
const sendAudio = async (audioData: string) => {
  try {
    const shazamResponse = await songDetect2(audioData);
    console.log(shazamResponse);
    if (shazamResponse) {
      setShazamResponse(shazamResponse);
      setIsShazamCaptured(true);
    } else {
      throw new Error("No response from Shazam");
    }
  } catch (error) {
    console.error("Error in sendAudio:", error);
    setShazamError("Failed to identify the song. Please try again.");
    setIsShazamCaptured(false);
    setCaptureEligibility(false);
  }
};

  const resumeRecording = async () => {
    try {
      const result: GenericResponse = await VoiceRecorder.resumeRecording();
      console.log("Recording resumed:", result.value);
      setRecordingStatus("RECORDING");
    } catch (error) {
      console.error("Failed to resume recording:", error);
    }
  };

  const handleRecordingButton = () => {
    if (recordingStatus === "RECORDING") {
      console.log("stopping");
      stopRecording();
    } else if (recordingStatus === "PAUSED") {
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
  };

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

    const docRef = firestore.collection("geo-clubs").doc(activeClub);

    const doc = await docRef.get();

    if (doc.exists) {
      const { coordinates } = doc.data()!;

      if (coordinates && "_lat" in coordinates && "_long" in coordinates) {
        const clubCords = {
          latitude: coordinates["_lat"],
          longitude: coordinates["_long"],
        };
        const userCords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const haversineDistance = haversine(userCords, clubCords);

        if (haversineDistance < 50) {
          setCaptureEligibility(true);
          setIsLocationLoading(false);
        } else {
          setDistanceAway((haversineDistance - 50).toFixed(2));
          setIsLocationLoading(false);
          setCaptureEligibility(false);
          setIsLocationFailed(true);
        }
      }
    }
  };

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false} className="modal">
      <IonAlert
        isOpen={isLocationFailed}
        header="Unable to Record"
        message={`${distanceAway} meters away`}
        buttons={["Dismiss"]}
        onDidDismiss={() => setIsLocationFailed(false)}
      ></IonAlert>
      {isShazamCaptured && shazamResponse && !isShazamCorrect && (
        <ShazamModal
          isOpen={true}
          onClose={handleCloseShazamModal}
          shazamResponse={shazamResponse}
        />
      )}

      {isShazamCorrect && (
        <FormModal isOpen={true} onClose={handleCloseShazamModal} />
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

      {isRecording && <RecordingOverlay />}

      <IonHeader>
        <IonToolbar color="light">
          <IonButton
            className="ion-padding-start "
            color={"transparent"}
            onClick={() => {
              setIsOpen(false);
              setCaptureEligibility(false);
            }}
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ maxHeight: screenHeight * 1.6, overflowY: "scroll" }}>
          {items.map((item, index) => (<ClubAccordionItem key={item.id} item={item} />))}
        </div>
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-padding-bottom">
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <div className="ion-activatable ripple-parent">
                <IonButton
                  size="large"
                  color="dark"
                  fill="outline"
                  onClick={handleLocationClick}
                  disabled={captureEligbility}
                >
                  <IonIcon slot="start" icon={navigateCircleOutline} />
                  Seek Bid
                </IonButton>
              </div>
            </IonCol>
            <IonCol>
              <div>
                <IonButton
                  size="large"
                  color="danger"
                  fill="outline"
                  disabled={!captureEligbility}
                  onClick={handleRecordingButton}
                >
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
