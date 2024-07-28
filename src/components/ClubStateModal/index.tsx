import React, { useEffect, useRef, useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";
import { IonButtons, IonCardContent, useIonAlert } from "@ionic/react";
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
  closeOutline,
  cropOutline,
  femaleOutline,
  femaleSharp,
  informationCircle,
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

/*


*/

const ClubStateModal2: React.FC<ClubStateModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [fullnessValue, setFullnessValue] = useState(0);
  const [ratioValue, setRatioValue] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      startAnimation();
    } else {
      setFullnessValue(0);
      setRatioValue(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, data.fullness, data.ratio]);

  const startAnimation = () => {
    let startTime: number | null = null;
    const duration = 1000; // Animation duration in milliseconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setFullnessValue(Math.round(progress * data.fullness));
      setRatioValue(Math.round(progress * data.ratio));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      backdropDismiss={false}
    >
      <div className="modal-wrapper custom-modal">
        <IonHeader>
          <IonToolbar>
            <div className="toolbar-buttons-container">
              <IonButton slot="start" fill="clear" onClick={onClose}>
                <IonIcon icon={closeOutline} />
              </IonButton>
              <IonButton className="toolbar-button" color="light">
                <IonIcon icon={informationCircle}></IonIcon>
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="modal-content">
          <IonList className="admin-grid ion-padding-top">
            <div style={{height: "65px", width: "500px"}}>
              <IonItem className="compact-item-10">
                <IonCol size="2">
                  <IonLabel className="disabled-ion-label">
                    <h6>
                      <sup>FULLNESS?</sup>
                    </h6>
                  </IonLabel>
                </IonCol>
                <IonCol size="8" class="ion-padding-bottom">
                  <IonRange
                    label=""
                    disabled={true}
                    className="custom-range"
                    color="dark"
                    value={fullnessValue}
                    min={0}
                    max={100}
                    pinFormatter={(value: number) => `${value}%`}
                    pin={true}
                    style={{ width: "100%", maxWidth: "270px" }}
                  >
                    <IonIcon slot="start" icon={personRemoveOutline} />
                    <IonIcon slot="end" icon={personAddOutline} />
                  </IonRange>
                </IonCol>
              </IonItem>
            </div>
            <div style={{height: "80px", width: "500px"}}>
              <IonItem className="compact-item-10">
                <IonCol size="2">
                  <IonLabel className="disabled-ion-label">
                    <h6>
                      <sup>RATIO?</sup>
                    </h6>
                  </IonLabel>
                </IonCol>
                <IonCol size="8" className="ion-padding-bottom">
                  <IonRange
                    label=""
                    className="custom-range"
                    color="dark"
                    disabled={true}
                    value={ratioValue}
                    min={0}
                    max={100}
                    pin={true}
                    pinFormatter={(value: number) => `${value}%`}
                    style={{ width: "100%", maxWidth: "270px",}}
                  >
                    <IonIcon slot="start" icon={maleOutline} color="secondary" />
                    <IonIcon slot="end" icon={femaleOutline} color="danger" />
                  </IonRange>
                </IonCol>
              </IonItem>
            </div>
            <IonItem className="compact-item">
              <IonCol size="4">
                <IonLabel>
                  <h6>
                    <sup>COVER?</sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment
                  disabled={true}
                  value={true ? "yes" : "no"}
                >
                  <IonSegmentButton className="disabled-ion-segment" value="yes">
                    <IonLabel>Yes</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="no">
                    <IonLabel>No</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonItem>
            <IonItem className="compact-item">
              <IonCol size="4">
                <IonLabel>
                  <h6>
                    <sup>LINE?</sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment
                  disabled={true}
                  value={false ? "yes" : "no"}
                >
                  <IonSegmentButton value="yes">
                    <IonLabel>Yes</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton className="disabled-ion-segment" value="no">
                    <IonLabel>No</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonItem>
            <IonItem className="compact-item-3">
              <IonCol size="4">
                <IonLabel>
                  <h6>
                    <sup>PRICE?</sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment
                  value="1"
                  disabled={true}
                >
                  <IonSegmentButton className="disabled-ion-segment" value="1">
                    <IonLabel>$</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="2">
                    <IonLabel>$$</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="3">
                    <IonLabel>$$$</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonItem>
            <IonItem className="compact-item-3">
              <IonCol size="4">
                <IonLabel>
                  <h6>
                    <sup>CLEAN?</sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment
                  disabled={true}
                  value={data.cleanliness}
                >
                  <IonSegmentButton value="1" className={data.cleanliness == "1" ? "disabled-ion-segment": ""}>
                    <IonLabel>
                      <h1>🤢</h1>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="2" className={data.cleanliness == "2" ? "disabled-ion-segment": ""} >
                    <IonLabel>
                      <h1>😐</h1>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="3" className={data.cleanliness == "3" ? "disabled-ion-segment": ""}>
                    <IonLabel>
                      <h1>🤩</h1>
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonItem>
            <IonItem className="compact-item-6">
              <IonCol size="4">
                <IonLabel>
                  <h6>
                    <sup>HOSTILE?</sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment
                  disabled={true}
                >
                  <IonSegmentButton value="1" className={data.hostility == "1" ? "disabled-ion-segment": ""}>
                    <IonLabel>
                      <h1>🫶</h1>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="2" className={data.hostility == "2" ? "disabled-ion-segment": ""}>
                    <IonLabel>
                      <h1>😳</h1>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="3" className={data.hostility == "3" ? "disabled-ion-segment": ""}>
                    <IonLabel>
                      <h1>🤬</h1>
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonItem>
            <IonItem className="compact-item-3">
              <IonCol size="4">
                <IonLabel>
                  <h6>
                    <sup>LOUD?</sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment
                  disabled={true}
                >
                  <IonSegmentButton value="1" className={data.loudness == "1" ? "disabled-ion-segment": ""}>
                    <IonLabel>
                      <h1>🔇</h1>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="2" className={data.loudness == "2" ? "disabled-ion-segment": ""}>
                    <IonLabel>
                      <h1>🔈</h1>
                    </IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="3" className={data.loudness == "3" ? "disabled-ion-segment": ""}>
                    <IonLabel>
                      <h1>🔊</h1>
                    </IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonItem>
            <IonItem>
              <IonCard className="description-card">
                <IonCardContent>
                  <IonText color="dark">
                    <p>{data.aiResponse}</p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonItem>
          </IonList>
        </IonContent>
      </div>
    </IonModal>
  );
};
 

const ClubStateModal: React.FC<ClubStateModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  console.log(data);
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Club State Details</IonTitle>
          <IonButton
            className="close-button"
            slot="start"
            onClick={onClose}
            color="light"
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>     

            <IonCol size="3">
              <IonLabel>Fullness</IonLabel>
            </IonCol>
            
            <IonCol size="9">
              <IonRange
                className="fullnessIndicator custom-disabled-range"
                disabled={true}
                value={data.fullness}
              >
                <IonIcon slot="start" icon={personRemoveOutline} color="dark" />
                <IonIcon slot="end" icon={personAdd} color="dark" />
              </IonRange>
            </IonCol>

            <IonCol size="3">
              <IonLabel>Ratio</IonLabel>
            </IonCol>
            <IonCol size="9">
              <IonRange
                className="fullnessIndicator"
                disabled={true}
                value={data.ratio}
              >
                <IonIcon slot="start" icon={maleSharp} color="secondary" />
                <IonIcon slot="end" icon={femaleSharp} color="danger" />
              </IonRange>
            </IonCol>

            <IonItem className="compact-item">
              <IonCol size="3">
                <IonLabel>Cover</IonLabel>
              </IonCol>
              <IonCol>
                <IonSegment>
                  <IonSegmentButton value="yes" disabled className={data.cover ? "activeSurveyButton" : ""}>
                    <IonLabel>Yes</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="no" disabled className={!data.cover ? "activeSurveyButton" : ""}>
                    <IonLabel >No</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonItem>
          
            <IonItem>
            <IonCol size="3">
              <IonLabel>Line</IonLabel>
            </IonCol>
            </IonItem>

            <IonItem>
            <IonCol>
              <IonSegment>
                <IonSegmentButton value="yes" disabled className={data.line ? "activeSurveyButton" : ""}>
                  <IonLabel>Yes</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="no" disabled className={!data.line ? "activeSurveyButton" : ""}>
                  <IonLabel >No</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
            </IonItem>
          
            <IonItem>
            <IonCol size="3">
              <IonLabel>Price</IonLabel>
            </IonCol>
            </IonItem>

            <IonItem>
            <IonCol>
              <IonSegment>
                <IonSegmentButton
                  value="yes"
                  disabled
                  className={data.price == 1 ? "activeSurveyButton" : ""}
                >
                  <IonLabel>$</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="no"
                  disabled
                  className={data.price == 2 ? "activeSurveyButton" : ""}
                >
                  <IonLabel>$$</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="no"
                  disabled
                  className={data.price == 3 ? "activeSurveyButton" : ""}
                >
                  <IonLabel>$$</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
            </IonItem>
          
          
            <IonCol size="4">
              <IonLabel>Cleanliness</IonLabel>
            </IonCol>
            <IonCol size="8">
              <IonSegment>
                <IonSegmentButton
                  value="yes"
                  disabled
                  className={data.cleanliness == 1 ? "activeSurveyButton" : ""}
                >
                  <IonLabel color={data.clean ? "primary" : ""}>🤢</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="no"
                  disabled
                  className={data.cleanliness == 2 ? "activeSurveyButton" : ""}
                >
                  <IonLabel>😕</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="no"
                  disabled
                  className={data.cleanliness == 3 ? "activeSurveyButton" : ""}
                >
                  <IonLabel color={data.clean ? "" : "primary"}>😁</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          
          
            <IonCol size="3">
              <IonLabel>Hostility</IonLabel>
            </IonCol>
            <IonCol size="9">
              <IonSegment>
                <IonSegmentButton
                  value="yes"
                  disabled
                  className={data.hostility == 1 ? "activeSurveyButton" : ""}
                >
                  <IonLabel color={data.clean ? "primary" : ""}>🫶</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="no"
                  disabled
                  className={data.hostility == 2 ? "activeSurveyButton" : ""}
                >
                  <IonLabel>😳</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="no"
                  disabled
                  className={data.hostility == 3 ? "activeSurveyButton" : ""}
                >
                  <IonLabel color={data.clean ? "" : "primary"}>🤬</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          
          
            <IonCol size="3">
              <IonLabel>Loudness</IonLabel>
            </IonCol>
            <IonCol size="9">
              <IonSegment>
                <IonSegmentButton
                  value="yes"
                  disabled
                  className={data.loudness == 1 ? "activeSurveyButton" : ""}
                >
                  <IonLabel color={data.clean ? "primary" : ""}>🔇</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="no"
                  disabled
                  className={data.loudness == 2 ? "activeSurveyButton" : ""}
                >
                  <IonLabel>🔉</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
                  value="no"
                  disabled
                  className={data.loudness == 3 ? "activeSurveyButton" : ""}
                >
                  <IonLabel>🔊</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          
          <IonRow className="ion-justify-content-center">
            <IonCol size="9" className="ion-text-align ">
              <IonCard className="description-card blue-aura">
                <IonCardContent>
                  <IonText>
                    <p>{data.aiResponse}</p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
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

  if (item.data().captureTime === undefined) {
    return <></>;
  }

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
      <ClubStateModal2
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
  const { isCaptureEligible, setIsCaptureEligibile } = useDataStore();
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
            const sortedStates = states.sort((a, b) => {
              const aTime = a.data().captureTime?.seconds || 0;
              const bTime = b.data().captureTime?.seconds || 0;

              return bTime - aTime;
            });
            setItems(sortedStates.map((doc) => doc));
          });
        return () => unsubscribe();
      } else {
        console.error("No Club Ref Found");
      }
    };
    console.log();
    getStates();
  }, [activeClub]);

  const handleShazamCancel = () => {
    setIsShazamCorrect(false);
    setIsCaptureEligibile(false);
  };

  const captureState = async () => {
    setIsRecording(true);
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      await startRecording();
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Wait for 4 seconds
      const success = await stopRecording();

      if (success) {
        break;
      } else if (attempts === maxAttempts) {
        presentAlert({
          header: "Recording Failed",
          message:
            "Unable to capture audio after multiple attempts. Please try again.",
          buttons: ["OK"],
        });
        setIsCaptureEligibile(false);
      } else {
        console.log(`Attempt ${attempts} failed. Retrying...`);
      }
    }
    setIsRecording(false);
  };

  const startRecording = async () => {
    setRecordingCaptured(true);
    try {
      const permissionResult =
        await VoiceRecorder.requestAudioRecordingPermission();

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

      if (
        result.value &&
        result.value.recordDataBase64 &&
        result.value.recordDataBase64.length > 0
      ) {
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
      if (shazamResponse && shazamResponse.title) {
        setShazamResponse(shazamResponse);
        setIsShazamCaptured(true);
      } else {
        throw new Error("Song not recognized");
      }
    } catch (error) {
      setShazamError("Song not recognized. Please try again.");
      setIsShazamCaptured(false);
      setIsCaptureEligibile(false);

      // Show an alert dialog
      presentAlert({
        header: "Song Not Recognized",
        message: "Please try again.",
        buttons: ["OK"],
      });
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
    setIsCaptureEligibile(false);
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
          setIsCaptureEligibile(true);
          setIsLocationLoading(false);
        } else {
          setDistanceAway((haversineDistance - 50).toFixed(2));
          setIsLocationLoading(false);
          setIsCaptureEligibile(false);
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
              setIsCaptureEligibile(false);
            }}
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-bottom">
        <div style={{ maxHeight: screenHeight * 1.6, overflowY: "scroll" }}>
          {items.length === 0 ? (
            <IonTitle>No States!</IonTitle>
          ) : (
            (items || []).map((item, index) => (
              <ClubAccordionItem key={item.id} item={item} />
            ))
          )}
        </div>
      </IonContent>
      <IonFooter>
        <IonGrid className="">
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              <div className="ion-activatable ripple-parent">
                <IonButton
                  size="large"
                  color="dark"
                  fill="outline"
                  onClick={handleLocationClick}
                  disabled={isCaptureEligible}
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
                  disabled={!isCaptureEligible}
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
