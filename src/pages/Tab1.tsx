import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Tab1.css";
import { ClubCard } from "../components/ClubCard";
import { useState } from "react";
import ClubModal from "../components/ClubModal";

const Tab1: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubStats, setClubStats] = useState({})
  

  const closeModal = () => {
    setIsOpen(false)
    console.log("Modal Closed")
    console.log(isOpen)
  }

  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
            <IonSearchbar />
          </IonToolbar>
        </IonHeader>
        <Swiper className="genreSwiper" slidesPerView={2} loop={true}>
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
        </Swiper>
        <div className="ion-text-center ion-text-capitalize ion-padding clubDivider" >Clubs Near You</div>
        <IonList>
          <ClubCard  onClick={() => setIsOpen(true)} />
          <ClubCard  onClick={() => setIsOpen(true)}/>
          <ClubCard  onClick={() => setIsOpen(true)}/>
        </IonList>
      </IonContent>
      <ClubModal  isOpen={isOpen} setIsOpen={setIsOpen}/>
    </IonPage>
  );
};

export default Tab1;
