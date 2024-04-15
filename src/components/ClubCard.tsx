import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";






export const ClubCard = () => {


    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Club 1</IonCardTitle>
                <IonCardSubtitle>1234 Mystery Way | Rap | Techno | Dance</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <img src="\assets\Wikipedia_space_ibiza(03).jpg"></img>
            </IonCardContent>

        </IonCard>
    )
}