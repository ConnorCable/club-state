import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "./components.css";
import { useState } from "react";
export const SurveyModal: React.FC = () => {
    const [surveyState, setSurveyState] = useState({
        cover: false,
        line: 0,
        cleanliness: 0,
        hostility: 0,
        ratio: 0,
        loudness: 0
    })

 const addToSurvey: any = (quality: string , amount: boolean | number) => {
     setSurveyState( prevState => ({
            ...prevState,
         [quality] : amount
   }))
     }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Club State</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="centeredSurvey">
        <IonCardContent>
          <Swiper>
            <SwiperSlide>
            <IonCard>
                <IonCardHeader className="ion-text-center">
                 Was there a cover charge?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton color="danger" onClick={addToSurvey("cover" , true)}>Yes</IonButton>
                  <IonButton color="success" onClick={addToSurvey("cover" , true)}>No</IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide>
            <IonCard>
                <IonCardHeader className="ion-text-center">
                 How long was the line?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton color="danger">Long</IonButton>
                  <IonButton color="warning">Medium</IonButton>
                  <IonButton color="success">Short</IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  How clean was the club?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton color="danger">Dirty</IonButton>
                  <IonButton color="warning">Decent</IonButton>
                  <IonButton color="success">Clean</IonButton>
                </IonCardContent>
              </IonCard>

            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  How Hostile Was The Club?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton color="danger">Dangerous</IonButton>
                  <IonButton color="warning">Decent</IonButton>
                  <IonButton color="success">Peaceful</IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  What was the Ratio?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton color="danger">Dickfest</IonButton>
                  <IonButton color="warning">Decent</IonButton>
                  <IonButton color="success">Dames</IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  How loud was the Club?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton color="danger">Loud</IonButton>
                  <IonButton color="warning">Medium</IonButton>
                  <IonButton color="success">Quiet</IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                  <IonButton color="success">Submit</IonButton>
              </IonCard>
            </SwiperSlide>
          </Swiper>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};
