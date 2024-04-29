import { IonContent, IonModal } from '@ionic/react';
import React, { useState } from 'react';
import { VoiceRecorder, RecordingData, GenericResponse } from 'capacitor-voice-recorder';
import { FileInfo } from '@capacitor/filesystem';
import songDetect2 from '../helpers/RecordingAPI';
import './components.css'

const Record: React.FC = () => {
    const [recordingStatus, setRecordingStatus] = useState("");
    const [recordedData, setRecordedData] = useState("");
    const [fileInfo, setFileInfo] = useState<FileInfo[] | undefined>(undefined);
    const [recordDataType, setRecordedDataType] = useState()
    const [recordingCaptured, setRecordingCaptured] = useState(true);
    const [detectedSong, setDetectedSong] = useState<string | undefined>("")
    const [isOpen, setIsOpen] = useState(false);
    const [surveyState, setSurveyState] = useState(
        {
            cleanliness: 0,
            ratio: 0,
            hostility: 0
        }
    )

    var snd = new Audio("data:audio/wav;base64," + recordedData);
    
    const captureState = async () => {
        
        startRecording();
        setTimeout(stopRecording, 3000);
    }

    const startRecording = async () => {
        setRecordingCaptured(true);
        try {
            const permissionResult = await VoiceRecorder.requestAudioRecordingPermission();
            if (!permissionResult.value) {
                console.error('Permission denied to record audio');
                return;
            }
    
            const result: GenericResponse = await VoiceRecorder.startRecording();
            console.log('Recording started:', result.value);
            setRecordingStatus('RECORDING');
        } catch (error) {
            console.error('Failed to start recording:', error);
        }
    };
    
    const stopRecording = async () => {
        try {
            const result: RecordingData = await VoiceRecorder.stopRecording();
            // console.log('Recording stopped:', result.value.recordDataBase64);
            setRecordingStatus('NONE');
           
            if(result.value.recordDataBase64){
                console.log("valid data");
                setRecordedData(result.value.recordDataBase64);
                setRecordingCaptured(false);
            }
            console.log(recordedData);

            sendAudio();
    
        } catch (error) {
            console.error('Failed to stop recording:', error);
        }
    };
    
    const sendAudio = async () => {
        songDetect2(recordedData)
    }

    const resumeRecording = async () => {
        try {
            const result: GenericResponse = await VoiceRecorder.resumeRecording();
            console.log('Recording resumed:', result.value);
            setRecordingStatus('RECORDING');
        } catch (error) {
            console.error('Failed to resume recording:', error);
        }
    };

    const handleRecordingButton = () => {
        
        if (recordingStatus === 'RECORDING') {
            console.log("stopping");
            stopRecording();
        } else if (recordingStatus === 'PAUSED') {
            resumeRecording();
            console.log("paused");
        } else {
            console.log("playing");
            captureState();
        }
    };

     return (
        <IonModal >
        <IonContent style={{ zIndex: 2 }}>
        
        </IonContent>
        </IonModal>
    );
};

export default Record;


