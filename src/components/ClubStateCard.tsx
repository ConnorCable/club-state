import { IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react"




export const ClubStateCard: React.FC = () => {

    return (
        <IonCard className="ion-text-center ion-padding">
                <IonCardTitle>Club State 1</IonCardTitle>
                <IonCardSubtitle>Posted By: Jeremy</IonCardSubtitle>
                <IonCardContent>This is my club state</IonCardContent>
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

        </IonCard>
    )
}