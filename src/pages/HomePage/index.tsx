import {
  IonCard,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonPage,
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
        <IonChip className="ion-text-center ion-text-capitalize " outline={true}>$$$</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize "outline={true} >Fullness</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize " outline={true}>Hostility</IonChip>
        <IonChip className="ion-text-center ion-text-capitalize " outline={true}>Distance Away</IonChip>
        
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
