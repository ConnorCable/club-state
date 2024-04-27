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
} from "@ionic/react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./index.css";
import { ClubCard } from "../../components/ClubCard";
import { useState } from "react";
import ClubModal from "../../components/ClubModal";
import React, { useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';





const Tab1: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clubStats, setClubStats] = useState({})
  

  const closeModal = () => {
    setIsOpen(false)
    console.log("Modal Closed")
    console.log(isOpen)
  }

  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);

  useEffect(() => {
    if (!accordionGroup.current) {
      return;
    }

    accordionGroup.current.value = ['first', 'third'];
  }, []);

  return (
    <IonPage >
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen>
      
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
        
       <div className="filterButtons">
        <IonChip className="ion-text-center ion-text-capitalize " >Clubs Near You</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize " >$$$</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize " >Fullness</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize " >Hostility</IonChip>
      </div>

        
        
    
        <Swiper direction={"horizontal"} className="clubSwiper">
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)}/> 
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)}/>  
          </SwiperSlide>
          <SwiperSlide>
          <ClubCard  onClick={() => setIsOpen(true)}/>  
          </SwiperSlide>
          
        </Swiper>
        
      </IonContent>
      <ClubModal  isOpen={isOpen} setIsOpen={setIsOpen}/>
    </IonPage>
  );
};

export default Tab1;
