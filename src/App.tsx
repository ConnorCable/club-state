import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
  setupIonicReact,
  IonProgressBar,
  IonLoading,
  IonSelect,
  IonList,
  IonSelectOption,
  IonItem,
  IonChip,
  IonRange,
  IonAlert,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  homeOutline,
  mapOutline,
  personOutline,
  square,
  triangle,
} from "ionicons/icons";
import HomePage from "./pages/HomePage";
import Map from "./pages/MapPage";
import Tab3 from "./pages/AdminPage";
import FakeAdminPage from "./pages/FakeAdminPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { Geolocation } from "@capacitor/geolocation";
import { useDataStore } from "./models/DataStore";
/* Theme variables */
import "./theme/variables.css";
import { useEffect, useState } from "react";
import { create } from "zustand";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import * as geofirestore from "geofirestore";
import logo from "../assets/clubStateLogo.gif";
import "./App.css";
import { doc, onSnapshot } from "firebase/firestore";
import AdminPage from "./pages/AdminPage";
import { GoogleGenerativeAI } from "@google/generative-ai";



setupIonicReact();

const App: React.FC = () => {
  const [geolocationFetched, setGeolocationFetched] = useState(false);
  const { location, setLocation, radius, setRadius, googleAPIKey, setGoogleGenerativeAI, isMapModalOpen, setIsMapModalOpen } = useDataStore();
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
 // const {setGoogleGenerativeAI, googleGenerativeAI, googleAPIKey} = useDataStore();


  useEffect(() => {
   const genAI = new GoogleGenerativeAI(googleAPIKey);
  const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"})
  setGoogleGenerativeAI(model)
  }, []);
  firebase.initializeApp({
    apiKey: "AIzaSyA09rOO1u5io_qURoy9I3bKWEf1kv5oWrQ",

    authDomain: "clubstate.firebaseapp.com",

    projectId: "clubstate",

    storageBucket: "clubstate.appspot.com",

    messagingSenderId: "689308612538",

    appId: "1:689308612538:web:2ff89cd3549a2614b30f83",
  });

  const firestore = firebase.firestore();

  const handleEnterClick = async () => {

    setIsEntering(true);
    fetchGeolocation();

  }

  const fetchGeolocation = async () => {
    try {

      if (await Geolocation.checkPermissions()) {
        const coordinates = await Geolocation.getCurrentPosition();
        setLocation(coordinates);
        setGeolocationFetched(true);
        setIsEntering(false);
      }

    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }
  };

  return (
    
    <IonApp
      style={{ maxWidth: 450, maxHeight: 1050, margin: "auto", padding: "70px" }}
    >
      <IonReactRouter>
        {geolocationFetched ? (
          <IonTabs>
            <IonRouterOutlet className="ion-page">
              <Route exact path="/Main">
                <HomePage />
              </Route>
              <Route exact path="/Map">
                <Map />
              </Route>
              <Route path="/Admin">
                <FakeAdminPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/Main" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar className="" slot="bottom">
              <IonTabButton tab="Main" href="/Main" onClick={() => setIsMapModalOpen(false)}>
                <IonIcon icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Map" href="/Map" onClick={ () => {setIsMapModalOpen(true)}}>
                <IonIcon icon={mapOutline} />
                <IonLabel>Map</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Admin" href="/Admin" onClick={() => setIsMapModalOpen(false)}>
                <IonIcon  icon={personOutline} />
                <IonLabel>Admin</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : (
          <div className="ion-padding-top">
            <IonGrid fixed={true}>
              <IonRow>
                <IonCol>
                  <div style={{ textAlign: "center", paddingTop: "0%"}}>
                    <em style={{fontSize: "1.8em", color: "white"}}>Clubs Within</em>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "20%",
                }}
              >
                <div style={{ position: "relative", display: "inline-block", height: "100px" }}>
                  {" "}
                  {}
                  <div
                    className="radius-circle"
                    style={{
                      width: `170px`, 
                      height: `150px`,
                      borderRadius: "20%",
                      backgroundColor: "transparent",
                      border: "4px solid var(--glow-color)", 
                      transition: "width 0.7s, height 0.7s",
                    }}
                  ></div>
                  <h1
                    style={{
                      fontSize: "3.0em",
                      position: "absolute",
                      top: "70%", 
                      left: radius === 200 ? "58%" : "53%", 
                      transform: "translate(-50%, -50%)", 
                      margin: 1, // Remove default margin
                      color: "var(--ion-color-secondary)", 
                    }}
                  >
                    {radius} miles
                  </h1>
                </div>
              </IonRow>
              <IonRow></IonRow>
              <IonRow>
                <IonCol style={{ paddingTop: "70%" }}>
                  <IonRange
                    label-placement="end"
                    min={5}
                    max={200}
                    defaultValue={75}
                    color="secondary"
                    onIonInput={(e) => setRadius(e.detail.value as number)}
                    value={radius}
                    debounce={0}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol></IonCol>
                <IonCol className="button-container">
                  <button className="glowing-btn" onClick={handleEnterClick}>
                    <span className="glowing-txt">
                      E<span className="faulty-letter">N</span>TER
                    </span>
                  </button>
                  {showProgressBar && <IonProgressBar type="indeterminate" />}
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>
          </div>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
