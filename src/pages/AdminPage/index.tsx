import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';

import './index.css';
import { useState } from 'react';
import { ClubProps } from '../../models/ClubProps';
import { StateProps } from '../../models/StateProps';

const Tab3: React.FC = () => {
  const [isAddingClub, setIsAddingClub] = useState(false);
  const [isAddingState, setIsAddingState] = useState(false);
  const [newClubForm, setNewClubForm] = useState<ClubProps>();
  const UpdateAddingClubState = (stateVal: boolean) => {
    setIsAddingClub(stateVal);
  }

  const CreateNewClubState = async (stateProps: StateProps) => {
    try {

            setIsAddingState(true);
            const firestore = firebase.firestore();
            const GeoFirestore = geofirestore.initializeApp(firestore);
            const clubGeoCollection = GeoFirestore.collection('geo-clubs');
            const geocollection = GeoFirestore.collection('geo-states');

            
            await geocollection.add({
              Cleanliness: stateProps.Cleanliness,
              ClubID: stateProps.ClubID,
              Cover: stateProps.Cover,
              Fullness: stateProps.Fullness,
              Genre: stateProps.Genre,
              Line: stateProps.Line,
              coordinates: new firebase.firestore.GeoPoint(parseFloat(stateProps.Latitude), parseFloat(stateProps.Longitude)),
              Loudness: stateProps.Loudness,
              Price: stateProps.Loudness,
              Ratio: stateProps.Ratio,
              SongAudioData: stateProps.SongAudioData,
              SongTitle: stateProps.SongTitle,
              SongArtist: stateProps.SongArtist,
            });

            setIsAddingState(false);
    
    
          } catch (error) {
            console.error('Error creating club state:', error);
          }
  }

  const CreateNewClub = async (clubProps: ClubProps) => {
    try {
      const firestore = firebase.firestore();
      const GeoFirestore = geofirestore.initializeApp(firestore);
      const geocollection = GeoFirestore.collection('geo-clubs');
      const newClubRef = await geocollection.add({
        name: clubProps.Name,
        address: clubProps.Address,
        coordinates: new firebase.firestore.GeoPoint(parseFloat(clubProps.Latitude), parseFloat(clubProps.Longitude)),
      });
  
      const collection = firestore.collection("geo-clubs");
      const docRef = collection.doc(newClubRef.id);

      // Create a subcollection within the document
      const subcollectionRef = docRef.collection("states");

      
      await subcollectionRef.add({
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
        {!isAddingState ? ( <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
                <IonButton className='admin-button' onClick={() => setIsAddingState(true)}>Add New State +</IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>) : <NewStateForm onSubmit={CreateNewClubState} onCancel={() => setIsAddingState(false)} />}
        


      </IonContent>
    </IonPage>
  );
};

export default Tab3;

interface NewStateFormProps {
  onSubmit: (stateProps: StateProps) => void;
  onCancel: () => void;
}


const NewStateForm: React.FC<NewStateFormProps> = ({ onSubmit, onCancel }) => {
  const [clubName, setClubName] = useState('');
  const [clubAddress, setClubAddress] = useState('');
  const [clubLongitude, setClubLongitude] = useState('');
  const [clubLatitude, setClubLatitude] = useState('');

  const [cleanliness, setCleanliness] = useState('');
  const [clubID, setClubID] = useState('');
  const [cover, setCover] = useState('');
  const [fullness, setFullness] = useState('');
  const [genre, setGenre] = useState('');
  const [hostility, setHostility] = useState('');
  const [latitude, setLatitude] = useState('');
  const [line, setLine] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loudness, setLoudness] = useState('');
  const [price, setPrice] = useState('');
  const [ratio, setRatio] = useState('');
  const [songAudioData, setSongAudioData] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');


  const handleSubmit = () => {
    const newState: StateProps = {
      Cleanliness: cleanliness,
      ClubID: clubID,
      Cover: cover,
      Fullness: fullness,
      Genre: genre,
      Hostility: hostility,
      Latitude: latitude,
      Line: line,
      Loudness: loudness,
      Longitude: longitude,
      Price: price,
      Ratio: ratio,
      SongAudioData: songAudioData,
      SongTitle: songTitle,
      SongArtist: songArtist,
    };
    onSubmit(newState);
  };

  return (
    <IonContent className="ion-padding-top ion-margin-top">
      <IonGrid>
        <IonList className="admin-grid">
          <IonItemDivider>
            <IonLabel>------- New Club Form --------- </IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonInput value={clubID} onIonChange={e => setClubID(e.detail.value!)} label="ClubID" placeholder="Club 1" />
          </IonItem>
          <IonItem>
            <IonInput value={latitude} onIonChange={e => setLatitude(e.detail.value!)} label="Latitude" placeholder="(-90 to 90)" />
          </IonItem>
          <IonItem>
            <IonInput value={longitude} onIonChange={e => setLongitude(e.detail.value!)} label="Longitude" placeholder="(-180 to 180)" />
          </IonItem>
          <IonItem>
            <IonInput value={songAudioData} onIonChange={e => setSongAudioData(e.detail.value!)} label="Song Audio Data" placeholder="BASE 64 STRING REPRESENTATION..." />
          </IonItem>
          <IonItem>
            <IonInput value={songArtist} onIonChange={e => setSongArtist(e.detail.value!)} label="Song Artist" placeholder="Bobby the Savant" />
          </IonItem>
          <IonItem>
            <IonInput value={songTitle} onIonChange={e => setSongTitle(e.detail.value!)} label="Song title" placeholder="Trippin in Scratch" />
          </IonItem>
          <IonItem>
            <IonInput value={cover} onIonChange={e => setCover(e.detail.value!)} label="Cover" placeholder="True / False" />
          </IonItem>
          <IonItem>
            <IonInput value={line} onIonChange={e => setLine(e.detail.value!)} label="Line" placeholder="True / False" />
          </IonItem>
          <IonItem>
            <IonInput value={price} onIonChange={e => setPrice(e.detail.value!)} label="Price" placeholder="$ / $$ / $$$" />
          </IonItem>
          <IonItem>
            <IonInput value={genre} onIonChange={e => setGenre(e.detail.value!)} label="Genre" placeholder="House" />
          </IonItem>
          <IonItem>
            <IonInput value={cleanliness} onIonChange={e => setCleanliness(e.detail.value!)} label="Cleanliness" placeholder="" />
          </IonItem>
          <IonItem>
            <IonInput value={fullness} onIonChange={e => setFullness(e.detail.value!)} label="Fullness" placeholder="" />
          </IonItem>
          <IonItem>
            <IonInput value={hostility} onIonChange={e => setHostility(e.detail.value!)} label="Hostility" placeholder="" />
          </IonItem>
          <IonItem>
            <IonInput value={loudness} onIonChange={e => setLoudness(e.detail.value!)} label="Loudness" placeholder="" />
          </IonItem>
          <IonItem>
            <IonInput value={ratio} onIonChange={e => setLoudness(e.detail.value!)} label="Ratio" placeholder="" />
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
