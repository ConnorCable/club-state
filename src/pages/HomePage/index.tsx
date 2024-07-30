import {
  IonCard,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonPage,
  useIonViewWillEnter,
  RefresherEventDetail,
} from "@ionic/react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper/modules";
import "./index.css";
import { ClubCard } from "../../components/ClubCard";
import { useState } from "react";
import ClubModal from "../../components/ClubStateModal";
import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { useDataStore } from "../../models/DataStore";
import LoadingOverlay from "../../components/LoadingOverlay";
import useClubStore from "../../models/ClubStore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDistance } from "geolib";
import { getClubCardCollection } from "../../helpers/getClubCardCollection";
import { LazySwiper } from "../../helpers/LazerSwiper";



const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubStats, setClubStats] = useState({});
  const [userLocation, setUserLocation]: any = useState({lat: 0, lng: 0});
  const {location, setLocation, currentClubs, setCurrentClubs, radius, setChosenClub} = useDataStore();
  const [clubCards, setClubCards] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState<any>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [activeClub, setActiveClub] = useState<string | undefined>();
  const [filterSetting , setFilterSetting] = useState<string>("")
  const [activeButton , setActiveButton] = useState<number | null>(null)
  const [activeFilter , setActiveFilter] = useState<string>("")
  
  
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  // TODO: Use a dictionary instead of a list of dictionaries
  
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

  const transformCoordinates = (coords: any) => {
    return {
      latitude: coords._lat as number,
      longitude: coords._long as number,
    };
  };


  const removeFilter = () => {
    setFilteredClubs(currentClubs)
    setActiveButton(null)
    setActiveFilter("")
    setFilterSetting("")
  }

  const filterSettings = (setting: string) => {
    let copy_filtered = [...filteredClubs].sort((a: any, b: any) => { 
      if (setting === "money") {
        return a.recentCapture.price - b.recentCapture.price;
      } else if (setting === "fullness") {
        return a.recentCapture.ratio - b.recentCapture.ratio;
      } else if (setting === "hostility") {
        return a.recentCapture.cover - b.recentCapture.cover;
      } else if (setting === "distance") {
        // Assuming getDistance is a synchronous function that returns a number
      console.log('Location:', location!.coords);
      console.log('Club A Coordinates:', a.coordinates);
      console.log('Club B Coordinates:', b.coordinates);
      
      const transformedLocation = {
        latitude: location!.coords.latitude,
        longitude: location!.coords.longitude
      }
      const transformedA = transformCoordinates(a.coordinates);
      const transformedB = transformCoordinates(b.coordinates);
      console.log('transFormedA:', transformedA)
      console.log('transformedB:', transformedB)
      const distanceA = getDistance(transformedLocation, transformedA);
      const distanceB = getDistance(transformedLocation, transformedB);

      console.log('Distance A:', distanceA);
      console.log('Distance B:', distanceB);

      return distanceA - distanceB;
        
      }
      return 0; // Default return value of 0
    });
    setFilteredClubs(copy_filtered); // This now sets a new array reference, triggering a re-render
    setActiveFilter(setting) // Logging the new sorted array
}

  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  
  useIonViewWillEnter(() => {
    if (!filteredClubs || filteredClubs.length === 0) {
      fetchClubCardCollection();
    }
  }, [currentClubs]);

  const fetchClubCardCollection = async () => {
    if (location) {
      var nearbyClubs: any =  await getClubCardCollection(location, radius);
      setCurrentClubs(nearbyClubs);
      setFilteredClubs(nearbyClubs)
      setClubGenres(nearbyClubs)
      console.log(filteredClubs)
    }
  }

  

  
  
  return (
    <IonPage className="ion-safe-area">
      <IonHeader>
        {/* CLUB CARD GENRE FILTERS */}
        
        <Swiper className="genreSwiper "spaceBetween={7} slidesPerView={4} loop={true} autoplay={{delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false}} modules={[Autoplay]}>
          {genres.map((genre: any) => {
            if(!genre.genre) return null
            return(
            
            <SwiperSlide key={genre.index}>
            <IonCard className="genreCard" color={genre.index === activeButton ? "dark" : "light"} onClick={() => filterClubs(genre)}>
              <IonCardTitle className="genreTitle ">{genre.genre.length > 5 ? <sup><h3>{genre.genre.substring(0,7)}</h3></sup>: <sup><sup><h1>{genre.genre}</h1></sup></sup>}</IonCardTitle>
            </IonCard>
          </SwiperSlide>)
          
        })}
        </Swiper>
        
        
        {/* CLUB CARD SOCIAL FILTERS */}
        <div className="filterButtons" >
          <IonChip className="ion-text-center ion-text-capitalize " outline={true} color={activeFilter == "money" ? "success" :"dark"} onClick={() => filterSettings("money")}>$$$</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize "outline={true} color={activeFilter == "fullness" ? "success" :"dark"} onClick={() => filterSettings("fullness")}>Fullness</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize " outline={true} color={activeFilter == "hostility" ? "success" :"dark"} onClick={() => filterSettings("hostility")}>Hostility</IonChip>
          <IonChip className="ion-text-center ion-text-capitalize " outline={true} color={activeFilter == "distance" ? "success" :"dark"} onClick={() => filterSettings("distance")}>Distance</IonChip>
          <IonChip  color= "danger" className="ion-text-center ion-text-capitalize " outline={true} onClick={removeFilter}>X</IonChip>
        </div>
      </IonHeader>
      <IonContent fullscreen={false}> 

        {/* CLUB CARD SWIPABLE*/}
        <div className="swiperContainer">
          {(currentClubs!.length > 0) ? (
            <LazySwiper direction={"horizontal"} className="cardSwiper">
            {filteredClubs.map((club: any) => (
              <SwiperSlide key={club.id}>
                <ClubCard
                  onClick={() => {
                    setActiveClub(club.id);
                    setIsOpen(true);
                    setChosenClub(club.id);
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
          </LazySwiper>
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
