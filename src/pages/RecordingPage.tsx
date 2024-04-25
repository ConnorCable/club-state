import React, { useState } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText, IonChip, IonContent, IonBackdrop, IonTextarea, IonButton, IonToast } from "@ionic/react";
import  RecordingCapture  from "../components/RecordingCapture";
import { Filesystem } from "@capacitor/filesystem";

export const  RecordingPage: React.FC = () => {
    const [isRecording, setIsRecoding] = useState(false);
    const [storedFiles, setStoredFiles] = useState();

    

    return (
        <IonContent>
            <IonCard style={{"height": 400}}></IonCard>
        <IonContent>
        <RecordingCapture></RecordingCapture>
        </IonContent>
        </IonContent>
    );
}



function loadFiles() {
    throw new Error("Function not implemented.");
}

