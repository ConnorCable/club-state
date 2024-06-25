import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonText,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import "swiper/css";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "./index.css";
import { ClubCard } from "../../components/ClubCard";
import { useState } from "react";
import ClubModal from "../../components/ClubStateModal";
import React, { useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Geolocation, Position } from "@capacitor/geolocation";
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { useDataStore } from "../../models/DataStore";
import { ClubModalProps } from "../../models/ClubModalProps";
import LoadingOverlay from "../../components/LoadingOverlay";
import useClubStore from "../../models/ClubStore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ur } from "@faker-js/faker";


const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubStats, setClubStats] = useState({});
  const [userLocation, setUserLocation]: any = useState({lat: 0, lng: 0});
  const {location, setLocation, currentClubs, setCurrentClubs} = useDataStore();
  const [clubCards, setClubCards] = useState([]);
  const [activeClub, setActiveClub] = useState<string | undefined>();
  

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  
  useEffect(() => {
  })

  useIonViewWillEnter(() => {
    if (!currentClubs || currentClubs.length === 0) {
      fetchClubCardCollection();
    }
  }, [currentClubs]);

  const fetchClubCardCollection = async () => {
    var nearbyClubs: any =  await getClubCardCollection();
    setCurrentClubs(nearbyClubs);
  }

  const getStorageURL = async (imagePath: string): Promise<string> => {
    
    const storage = getStorage();
    try {
      if (imagePath) {
        const url = await getDownloadURL(ref(storage, imagePath));
        return url;
      } else {
        const defaultImagePath = "static-club-photos/NV/Cypress.jpg";
        const defaultUrl = await getDownloadURL(ref(storage, defaultImagePath));
        return defaultUrl;
      }

    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getClubCardCollection = async () => {
    const firestore = firebase.firestore();
    const GeoFirestore = geofirestore.initializeApp(firestore);
    const geocollection = GeoFirestore.collection('geo-clubs');
  
    // 1609 km roughly 1 mi
    const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude), radius: 100 });
  
    const value = await query.get();
    const clubCardPromises = value.docs.map(async (doc) => {
      const clubData = doc.data();
      const clubId = doc.id;
      const clubUrl = await getStorageURL(clubData['imageStoragePath']);
      const clubRef = firestore.collection('geo-clubs').doc(clubId);
      useClubStore.getState().updateClubRefs(clubId, clubRef);
      const docData = await clubRef.get();
      
      return { imagePath: clubUrl, id: doc.id, ...doc.data() };
    });
  
    const clubCardArray = await Promise.all(clubCardPromises);
    return clubCardArray
  };
  
  return (
    <IonPage>
      <IonHeader>
        {/* CLUB CARD GENRE FILTERS */}
        <Swiper className="genreSwiper " spaceBetween={0} slidesPerView={2} loop={true}>
          <SwiperSlide>
            <IonCard className="genreCard" color={"primary"} onClick={() => {console.log(currentClubs)}}>
              <IonCardTitle className="genreTitle">House</IonCardTitle>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard className="genreCard" color={"secondary"}>
              <IonCardTitle className="genreTitle">Techno</IonCardTitle>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard className="genreCard" color={"danger"}>
              <IonCardTitle className="genreTitle">Rap</IonCardTitle>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard className="genreCard" color={"success"}>
              <IonCardTitle className="genreTitle">Trance</IonCardTitle>
            </IonCard>
          </SwiperSlide>
        </Swiper>
        
        {/* CLUB CARD SOCIAL FILTERS */}
        <div className="filterButtons">
          <IonChip className="ion-text-center ion-text-capitalize " outline={true}>$$$</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize "outline={true} >Fullness</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize " outline={true}>Hostility</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize " outline={true}>Distance</IonChip>
        </div>
      </IonHeader>
      <IonContent fullscreen> 

        {/* CLUB CARD SWIPABLE*/}
        <div className="swiperContainer">
          {(currentClubs!.length > 0) ? (
            <Swiper direction={"horizontal"} className="cardSwiper">
              {currentClubs?.map((club: any) => (
                <SwiperSlide key={club.name}>
                  <ClubCard
                    onClick={() => {
                      setActiveClub(club.id);
                      setIsOpen(true);
                    }}
                    ClubProps={{
                      Id: club.id,
                      Name: club.name,
                      Address: club.address,
                      Coordinates: club.coordinates,
                      ImageStoragePath: club.imagePath,
                      RecentCapture: club.recentCapture,
                      ResidingState: club.residingState
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <LoadingOverlay isOpen={true} message="Retrieving Clubs" />
          )}
        </div>        
      </IonContent>
      {activeClub && <ClubModal isOpen={isOpen} setIsOpen={setIsOpen} activeClub={activeClub}/>}
      
    </IonPage>
  );
};

export default HomePage;
