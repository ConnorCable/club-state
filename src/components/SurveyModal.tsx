import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const SurveyModal: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Survey</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>Hello</IonContent>
    </IonPage>
  );
};
