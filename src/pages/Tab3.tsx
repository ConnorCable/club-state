import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab3.css';
import { RecordingCard } from '../components/RecordingCard';

// Validate Recording VIA Geofencing from selected card

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
      <RecordingCard onClick={function (): void {
          throw new Error('Function not implemented.');
        } }></RecordingCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
