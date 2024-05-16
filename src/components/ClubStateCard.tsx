import { IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react"




export const ClubStateCard: React.FC = () => {

    return (
        <IonCard className="ion-text-center ion-padding" color={"light"}>
                <IonCardTitle>Club State 1</IonCardTitle>
                <IonCardSubtitle>Posted By: Jeremy</IonCardSubtitle>
                <IonCardContent>This is my club state</IonCardContent>
                <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color={"success"}>
                Cleanliness <IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color={"warning"}>
                Loudness<IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color="warning">
                Ratio <IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color={"warning"}>
                Hostility <IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color="warning">
                Fullness <IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color="success">
                Fun<IonCardSubtitle>5</IonCardSubtitle>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        </IonCard>
    )
}