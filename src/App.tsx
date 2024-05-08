import { Redirect, Route } from 'react-router-dom';
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
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, homeOutline, mapOutline, personOutline, square, triangle } from 'ionicons/icons';
import HomePage from './pages/HomePage';
import Tab2 from './pages/MapPage';
import Tab3 from './pages/AdminPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { Geolocation } from '@capacitor/geolocation';
import { useDataStore } from './models/DataStore';
/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import { create } from 'zustand'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import logo from "../assets/clubStateLogo.gif";

setupIonicReact();

const App: React.FC = () => {
  const [geolocationFetched, setGeolocationFetched] = useState(false);
  const { location, setLocation } = useDataStore();


  firebase.initializeApp({

    apiKey: "AIzaSyA09rOO1u5io_qURoy9I3bKWEf1kv5oWrQ",
  
    authDomain: "clubstate.firebaseapp.com",
  
    projectId: "clubstate",
  
    storageBucket: "clubstate.appspot.com",
  
    messagingSenderId: "689308612538",
  
    appId: "1:689308612538:web:2ff89cd3549a2614b30f83"
  
  });

  
  
  const fetchGeolocation = async () => {
    try {
      // HOME ACCESS GEOFENCE
      if(await Geolocation.checkPermissions())
        {
          const coordinates = await Geolocation.getCurrentPosition();      
          setLocation(coordinates);
          setGeolocationFetched(true);
        }
      
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };

  return (
    <IonApp style={{ maxWidth: 400, maxHeight: 900, margin: 'auto', padding: '50px' }}>
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
                <Tab3 />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={mapOutline} />
                <IonLabel>Map</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={personOutline} />
                <IonLabel>Admin</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : (
          <div>
                <img src={logo}></img>
                <IonGrid>
                  <IonRow>
                    <IonCol></IonCol>
                    <IonCol>
                      <IonButton color="light" onClick={fetchGeolocation}>E N T E R</IonButton>
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