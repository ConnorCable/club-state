import { VoiceRecorder, RecordingData, GenericResponse } from 'capacitor-voice-recorder';

export class AudioRecording {
    private recordingStatus: string = 'NONE';
    private recordedData: string = '';

    public async startRecording(): Promise<void> {
        try {
            const permissionResult = await VoiceRecorder.requestAudioRecordingPermission();
            if (!permissionResult.value) {
                console.error('Permission denied to record audio');
                return;
            }
    
            const result: GenericResponse = await VoiceRecorder.startRecording();
            console.log('Recording started:', result.value);
            this.recordingStatus = 'RECORDING';
        } catch (error) {
            console.error('Failed to start recording:', error);
        }
    }

    public async stopRecording(): Promise<string | undefined> {
        try {
            const result: RecordingData = await VoiceRecorder.stopRecording();
            this.recordingStatus = 'NONE';
            if (result.value.recordDataBase64) {
                console.log('Recording stopped:', result.value.recordDataBase64);
                this.recordedData = result.value.recordDataBase64;
                return this.recordedData;
            }
        } catch (error) {
            console.error('Failed to stop recording:', error);
        }
        return undefined;
    }

    public async resumeRecording(): Promise<void> {
        try {
            const result: GenericResponse = await VoiceRecorder.resumeRecording();
            console.log('Recording resumed:', result.value);
            this.recordingStatus = 'RECORDING';
        } catch (error) {
            console.error('Failed to resume recording:', error);
        }
    }

    public getRecordingStatus(): string {
        return this.recordingStatus;
    }

    


}
