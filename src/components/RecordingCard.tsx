import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText, IonChip, IonContent } from "@ionic/react";
import React from "react";


interface clickableClubCard {
    onClick: () => void
}




export const RecordingCard : React.FC<clickableClubCard>= ({onClick}) => {


    return (
        <IonContent>
            {/* NEED TO VALIDATE VIA GEOFENCING */}
            <IonChip >+</IonChip>
        </IonContent>
    )
}

export default RecordingCard;