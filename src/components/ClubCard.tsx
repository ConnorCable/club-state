import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";


interface clickableClubCard {
    onClick: () => void
}




export const ClubCard : React.FC<clickableClubCard>= ({onClick}) => {


    return (
        <IonCard onClick={onClick}>
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