import React from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import './index.css';
import { micOutline } from 'ionicons/icons';


const RecordingOverlay: React.FC = () => {
  return (
    <IonContent className="recording-overlay">
      <div className="mic-container">
        <div className="circle active">
            <IonIcon icon={micOutline} size="large"></IonIcon>
          <i className="fas fa-microphone"></i>
        </div>
      </div>
    </IonContent>
  );
};

export default RecordingOverlay;