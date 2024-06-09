import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import { faker } from '@faker-js/faker';
import './index.css';
import { useEffect, useState } from 'react';
import { ClubProps } from '../../models/ClubProps';
import { ClubStateProps } from '../../models/ClubStateProps';
import { useDataStore } from '../../models/DataStore';
import { collection, CollectionReference, DocumentData, DocumentReference, getDocs } from 'firebase/firestore';

const Tab3: React.FC = () => {
  const [isAddingClub, setIsAddingClub] = useState(false);
  const [isAddingState, setIsAddingState] = useState(false);
  const [newClubForm, setNewClubForm] = useState<ClubProps>();
  const UpdateAddingClubState = (stateVal: boolean) => {
    setIsAddingClub(stateVal);
  }

  const CreateNewClubState = async (stateProps: ClubStateProps) => {
    try {

            setIsAddingState(true);
            const firestore = firebase.firestore();
            const GeoFirestore = geofirestore.initializeApp(firestore);
            const clubGeoCollection = GeoFirestore.collection('geo-clubs');
            const docRef = clubGeoCollection.doc(stateProps.clubId);

            docRef.collection("states").add({
              cleanliness: stateProps.cleanliness,
              cover: stateProps.cover,
              fullness: stateProps.fullness,
              genre: stateProps.genre,
              line: stateProps.line,
              coordinates: new firebase.firestore.GeoPoint(parseFloat(stateProps.latitude), parseFloat(stateProps.longitude)),
              loudness: stateProps.loudness,
              price: stateProps.loudness,
              ratio: stateProps.ratio,
              song: stateProps.song,
              artist: stateProps.artist,
            });

            const state = {
              cleanliness: stateProps.cleanliness,
              cover: stateProps.cover,
              fullness: stateProps.fullness,
              genre: stateProps.genre,
              line: stateProps.line,
              coordinates: new firebase.firestore.GeoPoint(parseFloat(stateProps.latitude), parseFloat(stateProps.longitude)),
              loudness: stateProps.loudness,
              price: stateProps.loudness,
              ratio: stateProps.ratio,
              song: stateProps.song,
              artist: stateProps.artist,
            }

            docRef.update({
              recentCapture: state
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
        coordinates: new firebase.firestore.GeoPoint(parseFloat(clubProps.Coordinates.latitude.toString()), parseFloat(clubProps.Coordinates.longitude.toString())),
        imageStoragePath: "static-club-photos/club_demo_image.jpg",
        recentCapture: clubProps.RecentCapture,
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
  onSubmit: (stateProps: ClubStateProps) => void;
  onCancel: () => void;
}

const NewStateForm: React.FC<NewStateFormProps> = ({ onSubmit, onCancel }) => {
  const [clubName, setClubName] = useState('');
  const [clubAddress, setClubAddress] = useState('');
  const [clubLongitude, setClubLongitude] = useState('');
  const [clubLatitude, setClubLatitude] = useState('');

  const [cleanliness, setCleanliness] = useState('');
  const [clubID, setClubID] = useState('');
  const [cover, setCover] = useState(false);
  const [fullness, setFullness] = useState('');
  const [genre, setGenre] = useState('');
  const [hostility, setHostility] = useState('');
  const [latitude, setLatitude] = useState('');
  const [line, setLine] = useState(false);
  const [longitude, setLongitude] = useState('');
  const [loudness, setLoudness] = useState('');
  const [price, setPrice] = useState('');
  const [ratio, setRatio] = useState('');
  const [songAudioData, setSongAudioData] = useState('');
  const [song, setSongTitle] = useState('');
  const [artist, setSongArtist] = useState('');


  const firestore = firebase.firestore();
  const GeoFirestore = geofirestore.initializeApp(firestore);
  const geocollection = GeoFirestore.collection('geo-clubs');
  const [clubs, setClubs] = useState<any>({});

  useEffect(()=> {
    const fetchData = async () => {
      let clubsObject: {[key: string]: any} = {}; // Add index signature to clubsObject
      const colRef: CollectionReference<DocumentData> = collection(firestore, 'geo-clubs');
       const clubs = await getDocs(colRef);

       const fetchedEntries = clubs.docs.map(doc => {
        console.log(doc.id)
        clubsObject[doc.id] = doc.data()});
        console.log(clubsObject);
       setClubs(clubsObject);
      
    }

    fetchData();
  }, [])


  const setRecentState = () => {
    
  }

  const fakeData = () => 
  {
    setCleanliness(faker.number.int(5).toString());
    setCover(faker.datatype.boolean());
    setFullness(faker.number.int(5).toString());
    setGenre(faker.music.genre());
    setHostility(faker.number.int(5).toString());
    setLatitude(faker.location.latitude().toString());
    setLine(faker.datatype.boolean());
    setLongitude(faker.location.longitude().toString());
    setLoudness(faker.number.int(5).toString());
    setPrice("$");
    setRatio(faker.number.int(5).toString());
    setSongTitle(faker.music.songName());
    setSongArtist(faker.person.firstName());
  }


  const handleSubmit = () => {
    const newState: ClubStateProps = {
      cleanliness: cleanliness,
      clubId: clubID,
      cover: cover,
      fullness: fullness,
      genre: genre,
      hostility: hostility,
      latitude: latitude,
      line: line,
      loudness: loudness,
      longitude: longitude,
      price: price,
      ratio: ratio,
      song: song,
      artist: artist,
    };
    onSubmit(newState);
  };

  return (
    <IonContent className="ion-padding-top ion-margin-top">
      <IonGrid>
        <IonList className="admin-grid">
          <IonItemDivider>
            <IonLabel>------- New State Form --------- </IonLabel>
          </IonItemDivider>
          <IonItem>
          <IonSelect label="Club" onIonChange={e => setClubID(e.detail.value)}>
            {Object.entries(clubs).map(([key, value] : [any,any]) => (
              <IonSelectOption key={key} value={key} >            
                {value.name}
              </IonSelectOption>
            ))}
          </IonSelect>
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
            <IonInput value={artist} onIonChange={e => setSongArtist(e.detail.value!)} label="Song Artist" placeholder="Bobby the Savant" />
          </IonItem>
          <IonItem>
            <IonInput value={song} onIonChange={e => setSongTitle(e.detail.value!)} label="Song title" placeholder="Trippin in Scratch" />
          </IonItem>
          <IonItem>
            <IonSelect label="Cover?" onIonChange={e => setCover(e.detail.value)}>
              <IonSelectOption value={true}>Yes</IonSelectOption>
              <IonSelectOption value={false}>No</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect label="Line?" onIonChange={e => setLine(e.detail.value)}>
              <IonSelectOption value={true}>Yes</IonSelectOption>
              <IonSelectOption value={false}>No</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect label="Price?" onIonChange={e => setPrice(e.detail.value)}>
              <IonSelectOption value={"$"}>$</IonSelectOption>
              <IonSelectOption value={"$$"}>$$</IonSelectOption>
              <IonSelectOption value={"$$$"}>$$$</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput value={genre} onIonChange={e => setGenre(e.detail.value!)} label="Genre" placeholder="House" />
          </IonItem>
          <IonItem>
            <IonSelect label="Cleanliness?" onIonChange={e => setCleanliness(e.detail.value)}>
              <IonSelectOption value={1}>1</IonSelectOption>
              <IonSelectOption value={2}>2</IonSelectOption>
              <IonSelectOption value={3}>3</IonSelectOption>
              <IonSelectOption value={4}>4</IonSelectOption>
              <IonSelectOption value={5}>5</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
          <IonSelect label="Fullness?" onIonChange={e => setFullness(e.detail.value)}>
              <IonSelectOption value={1}>1</IonSelectOption>
              <IonSelectOption value={2}>2</IonSelectOption>
              <IonSelectOption value={3}>3</IonSelectOption>
              <IonSelectOption value={4}>4</IonSelectOption>
              <IonSelectOption value={5}>5</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
          <IonSelect label="Hostility?" onIonChange={e => setHostility(e.detail.value)}>
              <IonSelectOption value={1}>1</IonSelectOption>
              <IonSelectOption value={2}>2</IonSelectOption>
              <IonSelectOption value={3}>3</IonSelectOption>
              <IonSelectOption value={4}>4</IonSelectOption>
              <IonSelectOption value={5}>5</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
          <IonSelect label="Loudness?" onIonChange={e => setLoudness(e.detail.value)}>
              <IonSelectOption value={1}>1</IonSelectOption>
              <IonSelectOption value={2}>2</IonSelectOption>
              <IonSelectOption value={3}>3</IonSelectOption>
              <IonSelectOption value={4}>4</IonSelectOption>
              <IonSelectOption value={5}>5</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
          <IonSelect label="Ratio?" onIonChange={e => setRatio(e.detail.value)}>
              <IonSelectOption value={1}>1</IonSelectOption>
              <IonSelectOption value={2}>2</IonSelectOption>
              <IonSelectOption value={3}>3</IonSelectOption>
              <IonSelectOption value={4}>4</IonSelectOption>
              <IonSelectOption value={5}>5</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonButton onClick={handleSubmit}>Submit</IonButton>
            <IonButton onClick={onCancel}>Cancel</IonButton>
            <IonButton onClick={fakeData}>Fake Data</IonButton>
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
  const {location, setLocation } = useDataStore();

  const handleSubmit = () => {
    const newClub: ClubProps = {
      Id: "",
      Name: clubName,
      Address: clubAddress,
      Coordinates: {longitude: parseFloat(clubLongitude), latitude: parseFloat(clubLatitude)},
      Image: "",
      RecentCapture: {
        artist: "",
        cleanliness: "",
        clubId:  "",
        cover: false,
        fullness: "",
        genre: "",
        hostility:  "",
        line: true,
        latitude:  "",
        longitude:  "",
        loudness:  "",
        price: "",
        song: "",
        ratio: ""
      },
    };
    onSubmit(newClub);
  };

  const setUserLocation = () => {

    setClubLatitude(location!.coords.latitude.toString())
    setClubLongitude(location!.coords.longitude.toString())
  }

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
            <IonButton onClick={setUserLocation}>Use Current Location</IonButton>
          </IonItem>
        </IonList>
      </IonGrid>  
    </IonContent>
  );
};
