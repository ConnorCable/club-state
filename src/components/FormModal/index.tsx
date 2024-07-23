import React, { useState } from "react";
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
  IonSegment,
  IonSegmentButton,
  IonRange,
  IonFooter,
  IonButtons,
} from "@ionic/react";
import { closeOutline, femaleOutline, maleOutline, personAddOutline, personRemoveOutline } from "ionicons/icons";
import "./index.css";
import { useDataStore } from "../../models/DataStore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { Timestamp } from "firebase/firestore";
import { ClubStateProps } from "../../models/ClubStateProps";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const {
    isShazamCorrect,
    isShazamCaptured,
    setIsShazamCorrect,
    setIsShazamCaptured,
    setIsCaptureEligibile,
    chosenClub
  } = useDataStore();
  const [isFormCompleted, setIsFormCompleted] = useState<boolean>(false);

  // FORM STATES
  const [clubName, setClubName] = useState("");
  const [clubAddress, setClubAddress] = useState("");
  const [clubLongitude, setClubLongitude] = useState("");
  const [clubLatitude, setClubLatitude] = useState("");
  const {recordedSong} = useDataStore();
  const [cleanliness, setCleanliness] = useState<number>(1);
  const [clubID, setClubID] = useState("");
  const [cover, setCover] = useState(false);
  const [fullness, setFullness] = useState<number>(1);
  const [genre, setGenre] = useState("");
  const [hostility, setHostility] = useState<number>(1);
  const [latitude, setLatitude] = useState("30");
  const [line, setLine] = useState(false);
  const [longitude, setLongitude] = useState("30");
  const [loudness, setLoudness] = useState<number>(0);
  const [price, setPrice] = useState<number>(1);
  const [ratio, setRatio] = useState<number>(1);
  const [songAudioData, setSongAudioData] = useState("");
  const [song, setSongTitle] = useState("");
  const [artist, setSongArtist] = useState("");

  const handleCancel = () => {
    setIsCaptureEligibile(false);
    setIsShazamCaptured(false);
    setIsShazamCorrect(false);
    setIsFormCompleted(true);
    onClose();
  };

  const handleSubmit = () => {
    const newState: ClubStateProps = {
      cleanliness: cleanliness,
      clubId: clubID,
      cover: cover,
      fullness: fullness,
      genre: recordedSong!.genre,
      hostility: hostility,
      latitude: latitude,
      line: line,
      loudness: loudness,
      longitude: longitude,
      price: price,
      ratio: ratio,
      song: recordedSong!.song,
      artist: recordedSong!.artist,
    };

    setIsShazamCorrect(false);
    setIsShazamCaptured(false);
    setIsFormCompleted(true);
    setIsCaptureEligibile(false);
    CreateNewClubState(newState);
    onClose();
  };

  const CreateNewClubState = async (stateProps: ClubStateProps) => {
    try {
      const firestore = firebase.firestore();
      const GeoFirestore = geofirestore.initializeApp(firestore);
      const clubGeoCollection = GeoFirestore.collection('geo-clubs');
      const docRef = clubGeoCollection.doc(chosenClub);

      const captureTime = Timestamp.now();
      
      docRef.collection("states").add({
        captureTime: captureTime,
        cleanliness: stateProps.cleanliness,
        cover: stateProps.cover,
        fullness: stateProps.fullness,
        genre: stateProps.genre,
        line: stateProps.line,
        hostility: stateProps.hostility,
        coordinates: new firebase.firestore.GeoPoint(parseFloat(stateProps.latitude), parseFloat(stateProps.longitude)),
        loudness: stateProps.loudness,
        price: stateProps.loudness,
        ratio: stateProps.ratio,
        song: stateProps.song,
        artist: stateProps.artist,
      });

      const state = {
        cleanliness: stateProps.cleanliness,
        cover: stateProps.cover,
        fullness: stateProps.fullness,
        genre: stateProps.genre,
        line: stateProps.line,
        coordinates: new firebase.firestore.GeoPoint(parseFloat(stateProps.latitude), parseFloat(stateProps.longitude)),
        loudness: stateProps.loudness,
        hostility: stateProps.hostility,
        price: stateProps.loudness,
        ratio: stateProps.ratio,
        song: stateProps.song,
        artist: stateProps.artist,
      }

      docRef.update({
        recentCapture: state
      });

    } catch (error) {
      console.error('Error creating club state:', error);
    }
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} backdropDismiss={false} className="custom-modal">
      <div className="modal-wrapper">
        <div className="lava-lamp-background"></div>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large" style={{
              textAlign: "center", 
              fontSize: "1.5em", 
              paddingLeft: "40px", 
              fontFamily: "Inter", 
              fontWeight: "bold"
            }}>
              Your State
            </IonTitle>
            <IonButton slot="end" fill="clear" onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="modal-content">
          <IonList className="admin-grid ion-padding-top">
          <IonItem className="compact-item">
        <IonCol size="4">
          <IonLabel>
            <h6>
              <sup>
                COVER?
              </sup>
            </h6>
          </IonLabel>               
        </IonCol>
        <IonCol size="8">
          <IonSegment value={cover ? "yes" : "no"} onIonChange={(e) => setCover(e.detail.value === "yes")}>
            <IonSegmentButton value="yes">
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
              <sup>
                LINE?
              </sup>
            </h6>
          </IonLabel>
        </IonCol>
        <IonCol size="8">
          <IonSegment value={line ? "yes" : "no"} onIonChange={(e) => setLine(e.detail.value === "yes")}>
            <IonSegmentButton value="yes">
              <IonLabel>Yes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="no">
              <IonLabel>No</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonCol>
      </IonItem>
            <IonItem className="compact-item-3">
              <IonCol size="4">
                <IonLabel>
                    <h6>
                    <sup>
                      PRICE?
                    </sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment value={price.toString()} onIonChange={(e) => {
                  const value = e.detail.value;
                  if (typeof value === 'string') {
                    setPrice(parseInt(value));
                  }
                }}>
                  <IonSegmentButton value="1">
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
                    <sup>
                      CLEAN?
                    </sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment value={cleanliness.toString()} onIonChange={(e) => {
                  const value = e.detail.value;
                  if (typeof value === 'string') {
                    setCleanliness(parseInt(value));
                  }
                }}>
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
              </IonCol>
            </IonItem>
            <IonItem className="compact-item-6">
              <IonCol size="4">
                <IonLabel>
                    <h6>
                    <sup>
                      HOSTILE?
                    </sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment value={hostility.toString()} onIonChange={(e) => {
                  const value = e.detail.value;
                  if (typeof value === 'string') {
                    setHostility(parseInt(value));
                  }
                }}>
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
              </IonCol>
            </IonItem>
            <IonItem className="compact-item-3">
              <IonCol size="4">
                <IonLabel>
                    <h6>
                    <sup>
                      LOUD?
                    </sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonSegment value={loudness.toString()} onIonChange={(e) => {
                  const value = e.detail.value;
                  if (typeof value === 'string') {
                    setLoudness(parseInt(value));
                  }
                }}>
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
              </IonCol>
            </IonItem>
            <IonItem className="compact-item-3">
              <IonCol size="4">
              <IonLabel>
                    <h6>
                    <sup>
                      FULLNESS?
                    </sup>
                  </h6>
                </IonLabel>
              
              </IonCol>
              <IonCol size="8">
                <IonRange 
                  defaultValue={50} 
                  pin={true} 
                  pinFormatter={(value: number) => `${value}%`}
                  style={{ width: '100%', maxWidth: '200px' }}
                  onIonChange={(e) => {setFullness(e.detail.value as number)}}
                >
                  <IonIcon slot="start" icon={personRemoveOutline} />
                  <IonIcon slot="end" icon={personAddOutline} />
                </IonRange>
              </IonCol>
            </IonItem>
            <IonItem className="compact-item-3">
              <IonCol size="4">
              <IonLabel>
                    <h6>
                    <sup>
                      RATIO?
                    </sup>
                  </h6>
                </IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonRange 
                  defaultValue={50} 
                  pin={true} 
                  pinFormatter={(value: number) => `${value}%`}
                  style={{ width: '100%', maxWidth: '200px' }}
                  onIonChange={(e) => {setRatio(e.detail.value as number)}}
                >
                  <IonIcon slot="start" icon={maleOutline} color="secondary" />
                  <IonIcon slot="end" icon={femaleOutline} color="danger" />
                </IonRange>
              </IonCol>
            </IonItem>
          </IonList>
        </IonContent>
        <IonToolbar>
            <IonButtons slot="start">
              <IonButton size="small" onClick={handleSubmit}>Submit</IonButton>
              <IonButton size="small" onClick={handleCancel}>Cancel</IonButton>
            </IonButtons>
            <IonButtons slot="end">
            </IonButtons>
          </IonToolbar>
      </div>
    </IonModal>
  );
};

export default FormModal;