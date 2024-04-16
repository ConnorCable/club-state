import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonTitle,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardSubtitle,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import "swiper/css";
import "swiper/css/grid";
import { SwiperSlide, Swiper } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import { ClubStateCard } from "./ClubStateCard";

interface ClubModal {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}

export const ClubModal: React.FC<ClubModal> = ({ isOpen, setIsOpen }) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButton color={"primary"} onClick={() => setIsOpen(false)}>
              <IonIcon icon={arrowBack} />
            </IonButton>
            <IonTitle>Club Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCardTitle className="ion-padding ion-text-center">
          1234 Mystery Way
        </IonCardTitle>
        <Swiper>
          <SwiperSlide>
            <img
              className="ion-padding"
              src="\assets\Wikipedia_space_ibiza(03).jpg"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="ion-padding"
              src="\assets\Wikipedia_space_ibiza(03).jpg"
            ></img>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="ion-padding"
              src="\assets\Wikipedia_space_ibiza(03).jpg"
            ></img>
          </SwiperSlide>
        </Swiper>

        <div className="ion-text-center">Club Stats</div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard className="ion-text-center ion-padding">
                Cleanliness <IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding">
                Loudness<IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding">
                Ratio <IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding">
                Hostility <IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding">
                Fullness <IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding">
                Fun<IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="ion-text-center">Current Club States</div>
        <ClubStateCard />
        <ClubStateCard />
      </IonContent>
    </IonModal>
  );
};
