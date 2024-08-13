import {
  IonCard,
  IonCardTitle,
  IonChip,
  IonContent,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./index.css";
import { ClubCard } from "../../components/ClubCard";
import { useState } from "react";
import ClubModal from "../../components/ClubStateModal";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "firebase/compat/firestore";

import { useDataStore } from "../../models/DataStore";
import LoadingOverlay from "../../components/LoadingOverlay";
import { getDistance } from "geolib";
import { getClubCardCollection } from "../../helpers/getClubCardCollection";
import { LazySwiper } from "../../helpers/LazerSwiper";
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { location, currentClubs, setCurrentClubs, radius, setChosenClub, genres, setGenres } =
    useDataStore();
  const [filteredClubs, setFilteredClubs] = useState<any>([]);
  const [activeClub, setActiveClub] = useState<string | undefined>();
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("");

  
  const filterClubs = (genre: any) => {
    const filtered = currentClubs?.filter(
      (club: any) => club.recentCapture.genre === genre.genre
    );
    setFilteredClubs(filtered);
    setActiveButton(genre.index);
  };

  const setClubGenres = (nearbyClubs: any) => {
    let index = 0;
    const newGenres: any[] = [];
    const seenGenres = new Set();
    nearbyClubs?.forEach((club: any) => {
      let genre = club.recentCapture.genre;
      
      if(!seenGenres.has(genre))
      {
        newGenres.push({ genre: genre, index: index });
        seenGenres.add(genre);
        index++;
      }
      
    });
    setGenres(newGenres);
  };

  const transformCoordinates = (coords: any) => {
    return {
      latitude: coords._lat as number,
      longitude: coords._long as number,
    };
  };

  const removeFilter = () => {
    setFilteredClubs(currentClubs);
    setActiveButton(null);
    setActiveFilter("");
  };

  const vibrateCard = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  const vibrateHard = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
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

        const transformedLocation = {
          latitude: location!.coords.latitude,
          longitude: location!.coords.longitude,
        };
        const transformedA = transformCoordinates(a.coordinates);
        const transformedB = transformCoordinates(b.coordinates);

        const distanceA = getDistance(transformedLocation, transformedA);
        const distanceB = getDistance(transformedLocation, transformedB);
        return distanceA - distanceB;
      }
      return 0; // Default return value of 0
    });
    setFilteredClubs(copy_filtered); // This now sets a new array reference, triggering a re-render
    setActiveFilter(setting); // Logging the new sorted array
  };

  useIonViewWillEnter(() => {
    if (!filteredClubs || filteredClubs.length === 0) {
      fetchClubCardCollection();
    }
  }, [currentClubs]);

  const fetchClubCardCollection = async () => {
    if (location) {
      var nearbyClubs: any = await getClubCardCollection(location, radius);
      setCurrentClubs(nearbyClubs);
      setFilteredClubs(nearbyClubs);
      setClubGenres(nearbyClubs);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen={true} forceOverscroll={false}>
      
        <Swiper
          className="genreSwiper"
          spaceBetween={7}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          modules={[Autoplay]}
        >
          {genres.map((genre: any) => {
            if (!genre.genre) return null;
            return (
              <SwiperSlide key={genre.index} style={{height: "85px"}}>
                <IonCard
                  className="genreCard"
                  color={genre.index === activeButton ? "dark" : "light"}
                  onClick={() => { filterClubs(genre); vibrateCard(); }}
                >
                  <IonCardTitle className="genreTitle ">
                    {genre.genre.length > 5 ? (
                      <sup>
                        <h3>{genre.genre.substring(0, 7)}</h3>
                      </sup>
                    ) : (
                      <sup>
                        <sup>
                          <h1>{genre.genre}</h1>
                        </sup>
                      </sup>
                    )}
                  </IonCardTitle>
                </IonCard>
              </SwiperSlide>
            );
          })}

          <div className="filterButtons">
            <IonChip
              className={`ion-text-center ion-text-capitalize filter-chip ${activeFilter === "money" ? "active" : ""}`}
              outline={true}
              color={activeFilter === "money" ? "success" : "warning"}
              onClick={() => filterSettings("money")}
            >
              $$$
            </IonChip>
            <IonChip
              className={`ion-text-center ion-text-capitalize filter-chip ${activeFilter === "fullness" ? "active" : ""}`}
              outline={true}
              color={activeFilter === "fullness" ? "success" : "warning"}
              onClick={() => filterSettings("fullness")}
            >
              Fullness
            </IonChip>
            <IonChip
              className={`ion-text-center ion-text-capitalize filter-chip ${activeFilter === "hostility" ? "active" : ""}`}
              outline={true}
              color={activeFilter === "hostility" ? "success" : "warning"}
              onClick={() => filterSettings("hostility")}
            >
              Hostility
            </IonChip>
            <IonChip
              className={`ion-text-center ion-text-capitalize filter-chip ${activeFilter === "distance" ? "active" : ""}`}
              outline={true}
              color={activeFilter === "distance" ? "success" : "warning"}
              onClick={() => filterSettings("distance")}
            >
              Distance
            </IonChip>
            <IonChip
              color="danger"
              className="ion-text-center ion-text-capitalize"
              outline={true}
              onClick={removeFilter}
            >
              X
            </IonChip>
          </div>
        </Swiper>


        {/* CLUB CARD SOCIAL FILTERS */}
        

        {/* CLUB CARD SWIPABLE*/}
        <div className="swiperContainer">
          {currentClubs!.length > 0 ? (
            <LazySwiper direction={"horizontal"}>
              {filteredClubs.map((club: any) => (
                <SwiperSlide key={club.id}>
                  <ClubCard
                    onClick={() => {
                      setActiveClub(club.id);
                      setIsOpen(true);
                      setChosenClub(club.id);
                      vibrateHard();
                    }}
                    ClubProps={{
                      Id: club.id,
                      Name: club.name,
                      Address: club.address,
                      Coordinates: club.coordinates,
                      ImageStoragePath: club.imagePath,
                      RecentCapture: club.recentCapture,
                      ResidingState: club.residingState,
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
      {activeClub && (
        <ClubModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeClub={activeClub}
        />
      )}
    </IonPage>
  );
};

export default HomePage;
