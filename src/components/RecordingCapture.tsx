import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { radioButtonOnOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
import RecordingPlayback from '../helpers/RecordingPlayback';
import { Directory, FileInfo, Filesystem } from '@capacitor/filesystem';
import songDetect2 from '../helpers/RecordingAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import './components.css'




const RecordingCapture: React.FC = () => {
    const [recordingStatus, setRecordingStatus] = useState("");
    const [recordedData, setRecordedData] = useState("");
    const [fileInfo, setFileInfo] = useState<FileInfo[] | undefined>(undefined);
    const [recordDataType, setRecordedDataType] = useState()
    const [recordingCaptured, setRecordingCaptured] = useState(true);
    const [detectedSong, setDetectedSong] = useState<string | undefined>("")
    const [isOpen, setIsOpen] = useState(false);

    var snd = new Audio("data:audio/wav;base64," + recordedData);


    const playAudio2 = async () => {
        snd.play();
        console.log(snd);
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
        console.log("HELLO");
        if (recordingStatus === 'RECORDING') {
            stopRecording();
        } else if (recordingStatus === 'PAUSED') {
            resumeRecording();
        } else {
            startRecording();
        }
    };

     return (
        <IonContent style={{ zIndex: 2 }}>
            <IonGrid style={{ paddingTop: '23px' }}>
                <IonRow>
                    <IonCol style={{ paddingTop: '70px' }}></IonCol>
                    <IonCol style={{ backgroundColor: '#000000', borderRadius: 18 }}>
                        <IonButton size="large" color="danger" onClick={handleRecordingButton}>
                            <IonIcon slot="start" icon={radioButtonOnOutline} />
                            {recordingStatus === 'RECORDING' ? 'STOP' : recordingStatus === 'PAUSED' ? 'RESUME' : 'REC'}
                        </IonButton>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
                {/* <IonButton onClick={() => fileInfo && fileInfo.length > 0 && playAudio(fileInfo[0]?.name)}>Play Captured Audio</IonButton> */}
                
            </IonGrid>
            <IonButton disabled={recordingCaptured} onClick={playAudio2}>Playback Capture</IonButton>
            {/* <IonButton disabled={recordingCaptured} onClick={sendAudio}>Send Song</IonButton> */}
            <IonButton  onClick={() => setIsOpen(true)}>Continue</IonButton>
            <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Record Club State</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
    
          <IonContent className=' centered'  >
            <div >
            <Swiper>
                <SwiperSlide >
                    <IonCard className="surveyCard">
                        <IonCardTitle>How Clean was the club?</IonCardTitle>
                        <IonCardContent>Slide 1</IonCardContent> 
                    </IonCard>
                </SwiperSlide >
                <SwiperSlide >
                    <IonCard className="surveyCard ">
                        <IonCardTitle>What was the ratio?</IonCardTitle>
                        <IonCardContent>Slide 2</IonCardContent> 
                    </IonCard>
                </SwiperSlide >
                <SwiperSlide >
                    <IonCard  className="surveyCard">
                        <IonCardTitle>How Hostile was the club?</IonCardTitle>
                        <IonCardContent>Slide 3</IonCardContent> 
                    </IonCard>
                </SwiperSlide >
                
            </Swiper >
            </div>
          </IonContent>
        </IonModal>
        </IonContent>
    );
};

export default RecordingCapture;


