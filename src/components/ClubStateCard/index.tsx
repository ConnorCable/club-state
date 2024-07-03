import { IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonChip, IonButton, IonText, IonIcon, IonBreadcrumb } from "@ionic/react"
import { playCircleOutline } from "ionicons/icons";
import "swiper/css";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";



export const ClubStateCard: React.FC<{data: any}> = ({ data }) => {

    return (
      <div>
        <Swiper className="genreSwiper " spaceBetween={0} slidesPerView={1} loop={false}>
          <SwiperSlide>
            <IonCard className="ion-text-center ion-padding" color={"light"}>
              <IonGrid>
                <IonChip>Line: {data.line ? "Yes" : "No"}</IonChip>
                <IonChip>Price: {data.price > 3 ? "$$$" : data.price == 2 ? "$$" : "$"}</IonChip>
                <IonChip>Cover: {data.cover ? "Yes" : "No"}</IonChip>
              </IonGrid>
            </IonCard>
          </SwiperSlide>
          {/* <SwiperSlide>
            <IonCard>
              <IonGrid>
                <IonRow>
                  <IonCol><IonChip>Clean: 5</IonChip></IonCol>
                  <IonCol><IonChip>Loud: 5</IonChip></IonCol>
                  <IonCol><IonChip>Ratio: 5</IonChip></IonCol>
                </IonRow>
                <IonRow>
                <IonCol><IonChip>Hostile: 5</IonChip></IonCol>
                <IonCol><IonChip>Full: 5</IonChip></IonCol>
                <IonCol><IonChip>Fun: 5</IonChip></IonCol>
                </IonRow>                
              </IonGrid>
            </IonCard>
          </SwiperSlide> */}
        </Swiper>
      </div>
        
    )
}