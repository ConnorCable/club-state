import { IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react"




export const ClubStateCard: React.FC<{data: any}> = ({ data }) => {

    return (
        <IonCard className="ion-text-center ion-padding" color={"light"}>
                <IonCardTitle>MAY 15 @ 10:50 PM</IonCardTitle>
                <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color={"success"}>
                Cleanliness <IonCardSubtitle>{data.cleanliness}</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color={"warning"}>
                Loudness<IonCardSubtitle>{data.loudness}</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color="warning">
                Ratio <IonCardSubtitle>{data.ratio}</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color={"warning"}>
                Hostility <IonCardSubtitle>{data.hostility}</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color="warning">
                Fullness <IonCardSubtitle>{data.fullness}</IonCardSubtitle>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-text-center ion-padding" color="success">
                Fun<IonCardSubtitle>{data.fun}</IonCardSubtitle>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        </IonCard>
    )
}