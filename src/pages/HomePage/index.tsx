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
import { ClubProps } from "../../models/ClubProps";
import {nanoid} from 'nanoid';
import { getDistance } from "geolib";
import { getRTLTextPluginStatus } from "mapbox-gl";

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubStats, setClubStats] = useState({});
  const [userLocation, setUserLocation]: any = useState({lat: 0, lng: 0});
  const {location, setLocation, currentClubs, setCurrentClubs} = useDataStore();
  const [clubCards, setClubCards] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState<any>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [activeClub, setActiveClub] = useState<string | undefined>();
  const [filterSetting , setFilterSetting] = useState<string>("")
  const [activeButton , setActiveButton] = useState<number>()
  
  


  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const filterClubs = (genre : any) => {
    const filtered = currentClubs?.filter((club: any) => club.recentCapture.genre === genre.genre)
    setFilteredClubs(filtered)
    setActiveButton(genre.index)
  }

  const setClubGenres = (nearbyClubs : any) => {
    let index = 0
    const newGenres: any[] = []
    nearbyClubs?.forEach((club: any) => { 

      let genre = club.recentCapture.genre

      newGenres.push({genre: genre, index: index})
      index++
    })
    setGenres(newGenres)
    
  }


  const removeFilter = () => {
    setFilteredClubs(currentClubs)
  }

  const filterSettings = (setting : string) => {
    setFilteredClubs(filteredClubs?.sort((a: any, b: any) => { 
      if (setting === "money") {
        return a.recentCapture.price.length - b.recentCapture.price.length
      } else if (setting === "fullness") {
        return a.recentCapture.ratio - b.recentCapture.ratio
      } else if (setting === "hostility") {
        return a.recentCapture.cover - b.recentCapture.cover
      } else if (setting === "distance") {
        return getDistance(location!.coords, a.coordinates) - getDistance(location!.coords, b.coordinates)
      }
      return 0; // Add a default return value of 0
    }))
  }

  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  
  useIonViewWillEnter(() => {
    if (!filteredClubs || filteredClubs.length === 0) {
      fetchClubCardCollection();
    }
  }, [currentClubs]);

  const fetchClubCardCollection = async () => {
    var nearbyClubs: any =  await getClubCardCollection();
    setCurrentClubs(nearbyClubs);
    setFilteredClubs(nearbyClubs)
    setClubGenres(nearbyClubs)
    console.log(filteredClubs)
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
    const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude), radius: 200 });
  
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

    // for each card get its genre and append it to a state of genres (array)
    // dynamically spawn a genre card for each genre in the genres array
    // give it a random color from a collection of colors
    // once a genre is clicked, filter the cards based on the genre
    // this will happen by filtering the club cards from the clubCardArray state 
    // We will need to create a new state for the filtered clubs
  };
  
  return (
    <IonPage>
      <IonHeader>
        {/* CLUB CARD GENRE FILTERS */}
        <Swiper className="genreSwiper " spaceBetween={7} slidesPerView={4} loop={true} >
          {genres.map((genre: any) => {
            return(
            <SwiperSlide key={genre.index}>
            <IonCard className="genreCard" color={genre.index === activeButton ? "success" : "dark"} onClick={() => filterClubs(genre)}>
              <IonCardTitle className="genreTitle">{genre.genre}</IonCardTitle>
            </IonCard>
          </SwiperSlide>)
})}
          
        </Swiper>
        
        {/* CLUB CARD SOCIAL FILTERS */}
        <div className="filterButtons">
          <IonChip className="ion-text-center ion-text-capitalize " outline={true} onClick={() => filterSettings("money")}>$$$</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize "outline={true} onClick={() => filterSettings("fullness")}>Fullness</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize " outline={true} onClick={() => filterSettings("hostility")}>Hostility</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize " outline={true} onClick={() => filterSettings("distance")}>Distance</IonChip>
          <IonChip  color= "danger" className="ion-text-center ion-text-capitalize " outline={true} onClick={() => removeFilter}>X</IonChip>
        </div>
      </IonHeader>
      <IonContent fullscreen> 

        {/* CLUB CARD SWIPABLE*/}
        <div className="swiperContainer">
          {(currentClubs!.length > 0) ? (
            <Swiper direction={"horizontal"} className="cardSwiper">
              {filteredClubs?.map((club: any) => (
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
