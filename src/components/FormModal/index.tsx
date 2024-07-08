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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItemDivider,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonFooter,
  IonRange,
  IonChip,
  IonItemOptions,
} from "@ionic/react";
import { closeOutline, femaleOutline, maleOutline, personAddOutline, personRemoveOutline } from "ionicons/icons";
import { ShazamResponse } from "../../models/ShazamResponse";
import "./index.css";
import { useDataStore } from "../../models/DataStore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { Timestamp } from "firebase/firestore";
import { ClubStateProps } from "../../models/ClubStateProps";


interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormModal: React.FC<any> = ({ isOpen, onClose }) => {
  const {
    isShazamCorrect,
    isShazamCaptured,
    setIsShazamCorrect,
    setIsShazamCaptured,
  } = useDataStore();
  const [isFormCompleted, setIsFormCompleted] = useState<boolean>(false);

  // FORM STATES
  const [clubName, setClubName] = useState("");
  const [clubAddress, setClubAddress] = useState("");
  const [clubLongitude, setClubLongitude] = useState("");
  const [clubLatitude, setClubLatitude] = useState("");

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
      genre: genre,
      hostility: hostility,
      latitude: latitude,
      line: line,
      loudness: loudness,
      longitude: longitude,
      price: price,
      ratio: ratio,
      song: song,
      artist: artist,
    };

    setIsShazamCorrect(false);
    setIsShazamCaptured(false);
    setIsFormCompleted(true);
    CreateNewClubState(newState);
    onClose();
  };

  const CreateNewClubState = async (stateProps: ClubStateProps) => {
    try {

            const firestore = firebase.firestore();
            const GeoFirestore = geofirestore.initializeApp(firestore);
            const clubGeoCollection = GeoFirestore.collection('geo-clubs');
            const docRef = clubGeoCollection.doc(stateProps.clubId);

            const captureTime = Timestamp.now();
            

            docRef.collection("states").add({
              captureTime: captureTime,
              cleanliness: stateProps.cleanliness,
              cover: stateProps.cover,
              fullness: stateProps.fullness,
              genre: stateProps.genre,
              line: stateProps.line,
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
              price: stateProps.loudness,
              ratio: stateProps.ratio,
              song: stateProps.song,
              artist: stateProps.artist,
            }

            docRef.update({
              recentCapture: state
            });

            // setIsAddingState(false);
    
    
          } catch (error) {
            console.error('Error creating club state:', error);
          }
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} backdropDismiss={false}>
      <div className="modal-wrapper">
        <div className="lava-lamp-background"></div>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large" style={{"text-align": "center", "font-size": "1.8em", "padding-left" : "71px", "font-family" : "Inter", "font-weight" : "bold"}}>Your State</IonTitle>
            <IonButton slot="end" fill="clear" onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="modal-content">
          <IonList className="admin-grid ion-padding-top">
            <IonItem className="compact-item">
            <IonTitle slot="start" className="ion-padding-right">COVER</IonTitle>
              <IonSegment slot="end" value={cover ? "yes" : "no"} onIonChange={(e) => setCover(e.detail.value === "yes")}>
                <IonSegmentButton value="yes">
                  <IonLabel>Yes</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="no">
                  <IonLabel>No</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
            <IonItem className="compact-item">
            <IonTitle className="ion-padding-right" slot="start">LINE</IonTitle>
              <IonSegment slot="end" value={line ? "yes" : "no"} onIonChange={(e) => setLine(e.detail.value === "yes")}>
                <IonSegmentButton value="yes">
                  <IonLabel>Yes</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="no">
                  <IonLabel>No</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
            <IonItem className="compact-item-3">
              <IonTitle >PRICE</IonTitle>
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
            </IonItem>
            <IonItem className="compact-item-3">
            <IonTitle className="ion-padding-right" >CLEAN?</IonTitle>
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
            </IonItem>
            <IonItem className="compact-item-6">
            <IonTitle className="ion-padding-right" >HOSTILE?</IonTitle>
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
            </IonItem>
            <IonItem className="compact-item-3">
            <IonTitle className="ion-padding-right">LOUD?</IonTitle>
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
            </IonItem>
            <IonItem className="compact-item-3">
              <IonTitle className="ion-padding-right">FULL?</IonTitle>
              <IonRange  defaultValue={50} pin={true} pinFormatter={(value: number) => `${value}%`}>
                <IonIcon slot="start" icon={personRemoveOutline} />
                <IonIcon slot="end" icon={personAddOutline} />
              </IonRange>
            </IonItem>
            <IonItem className="compact-item-3">
            <IonTitle className="ion-padding-right">RATIO?</IonTitle>
            <IonRange defaultValue={50} pin={true} pinFormatter={(value: number) => `${value}%`}>
              <IonIcon slot="start" icon={maleOutline} color="secondary" />
              <IonIcon slot="end" icon={femaleOutline} color = "danger" />
            </IonRange >
            </IonItem>
           
          </IonList>
        </IonContent>
        <IonFooter>
          <IonItem>
            <IonButton onClick={handleSubmit}>Submit</IonButton>
            <IonButton onClick={handleCancel}>Cancel</IonButton>
            <IonButton onClick={() => {}}>Fake Data</IonButton>
          </IonItem>
        </IonFooter>
      </div>
    </IonModal>
  );
};

export default FormModal;