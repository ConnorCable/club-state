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

import './components.css'
export const SurveyModal: React.FC = () => {
  return (
    <IonPage className="">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Club State</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="centeredSurvey">
            <IonCardContent>
                <Swiper>
                    <SwiperSlide className="surveyCard">
                        <IonCard>
                            <IonCardHeader className="ion-text-center">
                                How clean was the club?
                            </IonCardHeader>
                            <IonCardContent className="ion-text-center">
                                <IonButton color="danger">
                                    Dirty
                                </IonButton>
                                <IonButton color="warning">
                                    Decent
                                </IonButton>
                                <IonButton color="success">
                                    Clean
                                </IonButton>
                            </IonCardContent>
                        </IonCard>
                    </SwiperSlide >
                    <SwiperSlide className="surveyCard">
                    <IonCard>
                            <IonCardHeader className="ion-text-center">
                                How clean was the club?
                            </IonCardHeader>
                            <IonCardContent className="ion-text-center">
                                <IonButton color="danger">
                                    Dirty
                                </IonButton>
                                <IonButton color="warning">
                                    Decent
                                </IonButton>
                                <IonButton color="success">
                                    Clean
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
                                <IonButton color="danger">
                                    Dirty
                                </IonButton>
                                <IonButton color="warning">
                                    Decent
                                </IonButton>
                                <IonButton color="success">
                                    Clean
                                </IonButton>
                            </IonCardContent>
                        </IonCard>
                    </SwiperSlide>
                </Swiper>
            </IonCardContent>
      </IonContent>
    </IonPage>
  );
};
