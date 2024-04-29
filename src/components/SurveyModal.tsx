import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./components.css";
import { useState } from "react";
export const SurveyModal: React.FC = () => {
  const [surveyState, setSurveyState] = useState({
    cover: false,
    line: 0,
    cleanliness: 0,
    hostility: 0,
    ratio: 0,
    loudness: 0,
  });

  const addToSurvey: any = (quality: string, amount: boolean | number) => {
    setSurveyState((prevState) => ({
      ...prevState,
      [quality]: amount,
    }));
  };

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
                  <IonButton
                    color="danger"
                    onClick={() => addToSurvey("cover", true)}
                  >
                    Yes
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("cover", true)}
                  >
                    No
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide>
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  How long was the line?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton
                    color="danger"
                    onClick={() => addToSurvey("line", 2)}
                  >
                    Long
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("line", 1)}
                  >
                    Medium
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("line", 0)}
                  >
                    Short / None
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  How clean was the club?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton
                    color="danger"
                    onClick={() => addToSurvey("cleanliness", 2)}
                  >
                    Dirty
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("cleanliness", 1)}
                  >
                    Decent
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("cleanliness", 0)}
                  >
                    Clean
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  How Hostile Was The Club?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton
                    color="danger"
                    onClick={() => addToSurvey("hostility", 2)}
                  >
                    Dangerous
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("hostility", 1)}
                  >
                    Decent
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("hostility", 0)}
                  >
                    Peaceful
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  What was the Ratio?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton
                    color="danger"
                    onClick={() => addToSurvey("ratio", 2)}
                  >
                    Dickfest
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("ratio", 1)}
                  >
                    Decent
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("ratio", 0)}
                  >
                    Dames
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  How loud was the Club?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton
                    color="danger"
                    onClick={() => addToSurvey("loudness", 2)}
                  >
                    Loud
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("loudness", 2)}
                  >
                    Medium
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("loudness", 2)}
                  >
                    Quiet
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonList >
                  <IonItem>
                    <IonLabel>Cover Charge:  {surveyState.cover.toString()}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Line: {surveyState.line == 0 ? "None" : surveyState.line == 1 ? "Medium" : "Long" }</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Cleanliness : {surveyState.cleanliness == 0 ? "Clean" : surveyState.cleanliness == 1 ? "Decent" : "Dirty"}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Hostility : {surveyState.hostility == 0 ? "Peaceful" : surveyState.cleanliness == 1 ? "Decent" : "Dangerous"}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Ratio : {surveyState.ratio == 0 ? "Dames" : surveyState.cleanliness == 1 ? "Decent" : "Dickfest"}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Loudness : {surveyState.loudness == 0 ? "Loud" : surveyState.cleanliness == 1 ? "Decent" : "Quiet"}</IonLabel>
                  </IonItem>
                </IonList>
                <div className="surveySubmit">
                    <IonButton color="success" className="surveySubmit" >Submit</IonButton>
                </div>
                
              </IonCard>
            </SwiperSlide>
          </Swiper>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};
