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
} from "@ionic/react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
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

const fakeClubPropData: ClubModalProps = {
  Name: "Club 1",
  Cleanliness: "Dirty",
  Cover: true,
  Line: true,
  Price: "$$$",
  Fullness: "Medium",
  Loudness: "Medium",
  Location: null,
  Hostility: "Dangerous",
  Ratio: "Decent",
  Genre: "House",
}

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubStats, setClubStats] = useState({});
  const [userLocation, setUserLocation]: any = useState({lat: 0, lng: 0});
  const {location, setLocation} = useDataStore();
  const [clubCards, setClubCards] = useState([]);

  const closeModal = () => {
    setIsOpen(false)
  }

  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  
  const {locationChips, setLocationChips} = useDataStore();

  useIonViewWillEnter( () => {

  const fetchClubCardCollection = async () => {
    var vals: any =  await getClubCardCollection();
    setClubCards(vals);
    console.log(clubCards)
  }

  const getChipCollection = async () => {

    const firestore = firebase.firestore();
  
    const GeoFirestore = geofirestore.initializeApp(firestore);
  
    const geocollection = GeoFirestore.collection('geo-clubs');
    
    // 1609 km roughly 1 mi
    const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude), radius: 200 });
    let chipsArray: any[] = []
    query.get().then((value : any) => {
        value.docs.forEach((doc : any) => {
        chipsArray.push(doc.data() );
        });
    });
    
    return chipsArray;
  }
    
    fetchClubCardCollection();
  })


  const getClubCardCollection = async () => {
    // Handle Geoverification

        const firestore = firebase.firestore();

        // Declare GeoFirestore variable
        const GeoFirestore = geofirestore.initializeApp(firestore);

        // Create a GeoCollection reference
        const geocollection = GeoFirestore.collection('geo-clubs');
        console.log("My location : {lat: " + location!.coords.latitude + ", lng: " + location!.coords.longitude )
        // 1609 km roughly 1 mi
        const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude), radius: 200 });
        let clubCardArray: any[] = []
        query.get().then((value : any) => {
            value.docs.forEach((doc : any) => {
            clubCardArray.push(doc.data() );
            });
        });
        return clubCardArray;
    }
  

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen>
        <Swiper className="genreSwiper "  spaceBetween={0} slidesPerView={2} loop={true}>
          <SwiperSlide>
            <IonCard className="genreCard" color={"primary"}>
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
        
       <div className="filterButtons ">
        <IonChip className="ion-text-center ion-text-capitalize " outline={true}>$$$</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize "outline={true} >Fullness</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize " outline={true}>Hostility</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize " outline={true}>Distance</IonChip>
      </div>

        <Swiper direction={"horizontal"} className="clubSwiper">
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)} ClubModalProps={fakeClubPropData}/> 
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)} ClubModalProps={fakeClubPropData}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)} ClubModalProps={fakeClubPropData}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)} ClubModalProps={fakeClubPropData}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)} ClubModalProps={fakeClubPropData}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)} ClubModalProps={fakeClubPropData}/>  
          </SwiperSlide>
        </Swiper>
      </IonContent>
      <ClubModal  isOpen={isOpen} setIsOpen={setIsOpen} clubProps={fakeClubPropData}/>
    </IonPage>
  );
};

export default HomePage;
