import React, { useState } from "react";
import { IonCard, IonContent } from "@ionic/react";
import Record from "../components/Record";

export const  RecordingPage: React.FC = () => {
    const [isRecording, setIsRecoding] = useState(false);
    const [storedFiles, setStoredFiles] = useState();

    

    return (
        <IonContent>
            <IonCard style={{"height": 400}}></IonCard>
        <IonContent>
        <Record></Record>
        </IonContent>
        </IonContent>
    );
}




