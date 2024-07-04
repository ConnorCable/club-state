import {
  IonCard,
  IonGrid,
  IonChip,
} from "@ionic/react";
import "swiper/css";

export const ClubStateCard: React.FC<{ data: any }> = ({ data }) => {
  return (
    <IonCard className="ion-text-center ion-padding" color="light">
      <IonGrid>
        <IonChip>Line: {data.line ? "Yes" : "No"}</IonChip>
        <IonChip>
          Price: {data.price > 3 ? "$$$" : data.price == 2 ? "$$" : "$"}
        </IonChip>
        <IonChip>Cover: {data.cover ? "Yes" : "No"}</IonChip>
      </IonGrid>
    </IonCard>
  );
};
