import firebase from 'firebase/compat/app';
import useClubStore from "../models/ClubStore";
import * as geofirestore from 'geofirestore';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useDataStore } from '../models/DataStore';
import { ClubStateProps } from '../models/ClubStateProps';
import { Timestamp } from 'firebase/firestore';
import { ClubProps } from '../models/ClubProps';


const CreateNewClubState = async (stateProps: ClubStateProps) => {
    try {

            setIsAddingState(true);
            const firestore = firebase.firestore();
            const GeoFirestore = geofirestore.initializeApp(firestore);
            const clubGeoCollection = GeoFirestore.collection('geo-clubs');
            const docRef = clubGeoCollection.doc(stateProps.clubId);

            const captureTime = Timestamp.now();
            

            docRef.collection("states").add({
              captureTime: captureTime,
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
        imageStoragePath: `static-club-photos/${clubProps.ResidingState}/${clubProps.Name.replace(/\s/g, '')}.webp`,
        recentCapture: clubProps.RecentCapture,
        residingState: clubProps.ResidingState,
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
  
function setIsAddingState(arg0: boolean) {
    throw new Error('Function not implemented.');
}

function setIsAddingClub(arg0: boolean) {
    throw new Error('Function not implemented.');
}

