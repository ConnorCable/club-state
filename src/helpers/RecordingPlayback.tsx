import { RecordingData } from 'capacitor-voice-recorder';
import React from 'react';

const RecordingPlayback: React.FC<{ recordedData: RecordingData }> = ({ recordedData }) => {
    const audioSrc = `data:${recordedData.mimeType};base64,${recordedData.recordDataBase64}`;

    return (
        <div>
            <p>Recording Duration: {recordedData.msDuration} milliseconds</p>
            <audio controls>
                <source src={audioSrc} type={recordedData.mimeType} />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default RecordingPlayback;