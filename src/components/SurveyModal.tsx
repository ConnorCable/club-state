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
import React from "react";
export const SurveyModal: React.FC = () => {
  const [surveyState, setSurveyState] = useState({
    cover: false,
    line: false,
    price: "",
    cleanliness: "",
    hostility: "",
    ratio: "",
    loudness: "",
  });

  const addToSurvey: any = (quality: string, amount: boolean | number) => {
    setSurveyState((prevState: any) => ({
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
                    onClick={() => addToSurvey("cover", false)}
                  >
                    No
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide>
              <IonCard>
                <IonCardHeader className="ion-text-center">
                  Was there a line?
                </IonCardHeader>
                <IonCardContent className="ion-text-center">
                  <IonButton
                    color="danger"
                    onClick={() => addToSurvey("line", "Yes")}
                  >
                    Yes
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("line", "No")}
                  >
                    No
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
                    onClick={() => addToSurvey("cleanliness", "Dirty")}
                  >
                    Dirty
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("cleanliness", "Decent")}
                  >
                    Decent
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("cleanliness", "Clean")}
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
                    onClick={() => addToSurvey("hostility", "Dangerous")}
                  >
                    Dangerous
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("hostility", "Decent")}
                  >
                    Decent
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("hostility", "Peaceful")}
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
                    onClick={() => addToSurvey("ratio", "Dickfest")}
                  >
                    Dickfest
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("ratio", "Decent")}
                  >
                    Decent
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("ratio", "Dames")}
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
                    onClick={() => addToSurvey("loudness", "Loud")}
                  >
                    Loud
                  </IonButton>
                  <IonButton
                    color="warning"
                    onClick={() => addToSurvey("loudness", "Medium")}
                  >
                    Medium
                  </IonButton>
                  <IonButton
                    color="success"
                    onClick={() => addToSurvey("loudness", "Quiet")}
                  >
                    Quiet
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
            <SwiperSlide className="surveyCard">
              <IonCard>
                <IonList >
                <IonItem className="surveyResultsTitle">
                    <IonLabel>Survey Results</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Cover Charge:  {surveyState.cover.toString()}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Line: {surveyState.line}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Cleanliness : {surveyState.cleanliness}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Hostility : {surveyState.hostility}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Ratio : {surveyState.ratio}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Loudness : {surveyState.loudness}</IonLabel>
                  </IonItem>
                </IonList>
                
                <div className="surveyResultsTitle ion-padding-top ion-padding">
                    <IonButton color="success" expand="block" className="ion-align-self-center" >Submit</IonButton>
                </div>
                
              </IonCard>
            </SwiperSlide>
          </Swiper>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};
