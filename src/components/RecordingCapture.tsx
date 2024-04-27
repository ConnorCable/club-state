import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack, radioButtonOnOutline, send } from 'ionicons/icons';
import React, { useState } from 'react';
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
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
    const [surveyState, setSurveyState] = useState(
        {
            cleanliness: 0,
            ratio: 0,
            hostility: 0
        }
    )

    var snd = new Audio("data:audio/wav;base64," + recordedData);

    const playAudio2 = async () => {
        snd.play();
        console.log(snd);
    }

    function stereoToMono(base64StereoData: string) {
        // Decode the base64 stereo audio data
        const stereoData = atob(base64StereoData);
        
        // Convert the stereo data to an array of 16-bit integers
        const stereoArray = new Int16Array(stereoData.length / 2);
        for (let i = 0; i < stereoData.length; i += 2) {
          const sample = (stereoData.charCodeAt(i) << 8) | stereoData.charCodeAt(i + 1);
          stereoArray[i / 2] = sample;
        }
        
        // Separate the stereo data into left and right channels
        const leftChannel = [];
        const rightChannel: number[] = [];
        for (let i = 0; i < stereoArray.length; i += 2) {
          leftChannel.push(stereoArray[i]);
          rightChannel.push(stereoArray[i + 1]);
        }
        
        // Average the left and right channels to create mono audio data
        const monoChannel = leftChannel.map((sample, index) => Math.round((sample + rightChannel[index]) / 2));
        
        // Convert the mono audio data back to a base64 string
        let monoData = '';
        for (let i = 0; i < monoChannel.length; i++) {
          const sample = monoChannel[i];
          monoData += String.fromCharCode((sample >> 8) & 0xFF);
          monoData += String.fromCharCode(sample & 0xFF);
        }
        
        // Encode the mono data as base64
        const base64MonoData = btoa(monoData);
        
        return base64MonoData;
      }

    
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
        <IonContent style={{ zIndex: 2 }}>
            <IonGrid style={{ paddingTop: '23px' }}>
                <IonRow>
                    <IonCol style={{ paddingTop: '70px' }}></IonCol>
                    <IonCol style={{ backgroundColor: '#000000', borderRadius: 18 }}>
                        <IonButton size="large" color="danger" onClick={handleRecordingButton} disabled={recordingStatus === "RECORDING"}>
                            <IonIcon slot="start" icon={radioButtonOnOutline} />
                            {recordingStatus === 'RECORDING' ? 'CAPTURING' : recordingStatus === 'PAUSED' ? 'RESUME' : 'REC'}
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
                        <IonCardContent>
                            <IonButton> Clean </IonButton>
                            <IonButton> Decent </IonButton>
                            <IonButton> Dirty </IonButton>
                        </IonCardContent> 
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


