import {
  IonFooter,
  IonToolbar,
  IonButton,
  IonButtons,
} from "@ionic/react";
import "./components.css";

export const MapFooter: React.FC = () => {
  return (
    <IonFooter className="mapFooter">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton>Start</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton>End</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};
