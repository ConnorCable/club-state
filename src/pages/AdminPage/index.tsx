import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';

import './index.css';
import { useState } from 'react';
import { ClubProps } from '../../models/ClubProps';

const Tab3: React.FC = () => {
  const [isAddingClub, setIsAddingClub] = useState(false);
  const [newClubForm, setNewClubForm] = useState<ClubProps>();
  const UpdateAddingClubState = (stateVal: boolean) => {
    setIsAddingClub(stateVal);
  }

  const CreateNewClub = async (clubProps: ClubProps) => {
    try {
            const firestore = firebase.firestore();
            const GeoFirestore = geofirestore.initializeApp(firestore);
            const geocollection = GeoFirestore.collection('geo-clubs');
            await geocollection.add({
              name: clubProps.Name,
              address: clubProps.Address,
              coordinates: new firebase.firestore.GeoPoint(parseFloat(clubProps.Latitude), parseFloat(clubProps.Longitude))
            });

            setIsAddingClub(false);
    
    
          } catch (error) {
            console.error('Error creating club:', error);
          }
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!isAddingClub ? ( <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
                <IonButton className='admin-button' onClick={() => setIsAddingClub(true)}>Add New Club +</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>) : <NewClubForm onSubmit={CreateNewClub} onCancel={() => setIsAddingClub(false)} />}
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;


interface NewClubFormProps {
  onSubmit: (clubProps: ClubProps) => void;
  onCancel: () => void;
}


const NewClubForm: React.FC<NewClubFormProps> = ({ onSubmit, onCancel }) => {
  const [clubName, setClubName] = useState('');
  const [clubAddress, setClubAddress] = useState('');
  const [clubLongitude, setClubLongitude] = useState('');
  const [clubLatitude, setClubLatitude] = useState('');

  const handleSubmit = () => {
    const newClub: ClubProps = {
      Name: clubName,
      Address: clubAddress,
      Longitude: clubLongitude,
      Latitude: clubLatitude,
    };
    onSubmit(newClub);
  };

  return (
    <IonContent className="ion-padding-top ion-margin-top">
      <IonGrid>
        <IonList className="admin-grid">
          <IonItemDivider>
            <IonLabel>------- New Club Form --------- </IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonInput value={clubName} onIonChange={e => setClubName(e.detail.value!)} label="Club Name" placeholder="Club 1" />
          </IonItem>
          <IonItem>
            <IonInput value={clubAddress} onIonChange={e => setClubAddress(e.detail.value!)} label="Club Address" placeholder="1234 Mystery Way" />
          </IonItem>
          <IonItem>
            <IonInput value={clubLatitude} onIonChange={e => setClubLatitude(e.detail.value!)} label="Club Latitude" placeholder="(-90 to 90)" />
          </IonItem>
          <IonItem>
            <IonInput value={clubLongitude} onIonChange={e => setClubLongitude(e.detail.value!)} label="Club Longitude" placeholder="(-180 to 180)" />
          </IonItem>
          <IonItem>
            <IonButton onClick={handleSubmit}>Submit</IonButton>
            <IonButton onClick={onCancel}>Cancel</IonButton>
          </IonItem>
        </IonList>
      </IonGrid>  
    </IonContent>
  );
};
