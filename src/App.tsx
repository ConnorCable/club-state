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
import Tab2 from "./pages/MapPage";
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


setupIonicReact();

const App: React.FC = () => {
  const [geolocationFetched, setGeolocationFetched] = useState(false);
  const { location, setLocation, radius, setRadius } = useDataStore();
  const [showProgressBar, setShowProgressBar] = useState(false);

  firebase.initializeApp({
    apiKey: "AIzaSyA09rOO1u5io_qURoy9I3bKWEf1kv5oWrQ",

    authDomain: "clubstate.firebaseapp.com",

    projectId: "clubstate",

    storageBucket: "clubstate.appspot.com",

    messagingSenderId: "689308612538",

    appId: "1:689308612538:web:2ff89cd3549a2614b30f83",
  });

  const firestore = firebase.firestore();

  const fetchGeolocation = async () => {
    try {
      // HOME ACCESS GEOFENCE
      setShowProgressBar(true);
      if (await Geolocation.checkPermissions()) {
        const coordinates = await Geolocation.getCurrentPosition();
        setLocation(coordinates);
        setGeolocationFetched(true);
      }
      setTimeout(() => {
        setShowProgressBar(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }
  };

  return (
    <IonApp
      style={{ maxWidth: 450, maxHeight: 740, margin: "auto", padding: "70px" }}
    >
      <IonReactRouter>
        {geolocationFetched ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <HomePage />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <FakeAdminPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar className="ion-padding-bottom footer-padding" slot="bottom"style={{ position: 'fixed', bottom: "0px", width: '100%' }}>
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={mapOutline} />
                <IonLabel>Map</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
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
                    <em style={{fontSize: "1.8em"}}>Clubs Within</em>
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
                  {/* Parent div with relative positioning */}
                  <div
                    className="radius-circle"
                    style={{
                      width: `170px`, // Ensure minimum size of 50px
                      height: `150px`, // Ensure minimum size of 50px
                      borderRadius: "20%",
                      backgroundColor: "transparent",
                      border: "4px solid var(--glow-color)", // Example color
                      transition: "width 0.7s, height 0.7s",

                      // Smooth transition for size change
                    }}
                  ></div>
                  <h1
                    style={{
                      fontSize: "3.0em",
                      position: "absolute", // Absolute positioning inside the parent div
                      top: "70%", // Center vertically
                      left: radius === 200 ? "58%" : "53%", // Center horizontally
                      transform: "translate(-50%, -50%)", // Adjust the centering
                      margin: 1, // Remove default margin
                      color: "var(--ion-color-secondary)", // Example text color, adjust as needed
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
                  <button className="glowing-btn" onClick={fetchGeolocation}>
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
