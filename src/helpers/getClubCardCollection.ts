
import firebase from 'firebase/compat/app';
import useClubStore from "../models/ClubStore";
import * as geofirestore from 'geofirestore';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useDataStore } from '../models/DataStore';

export const getClubCardCollection = async (location: { coords: { latitude: number, longitude: number } }, radius: number) => {
    const firestore = firebase.firestore();
    const GeoFirestore = geofirestore.initializeApp(firestore);
    const geocollection = GeoFirestore.collection('geo-clubs');
  
    // 1609 km roughly 1 mi
    const query = geocollection.near({ center: new firebase.firestore.GeoPoint(location!.coords.latitude, location!.coords.longitude), radius: radius });
  
    const value = await query.get();
    const clubCardPromises = value.docs.map(async (doc) => {
      const clubData = doc.data();
      const clubId = doc.id;
      const clubUrl = await getStorageURL(clubData['imageStoragePath']);
      const clubRef = firestore.collection('geo-clubs').doc(clubId);
      useClubStore.getState().updateClubRefs(clubId, clubRef);
      const docData = await clubRef.get();
      
      return { imagePath: clubUrl, id: doc.id, ...doc.data() };
    });
  
    const clubCardArray = await Promise.all(clubCardPromises);
    return clubCardArray
};


export const getStorageURL = async (imagePath: string): Promise<string> => {

    const storage = getStorage();
    try {
        if (imagePath) {
        const url = await getDownloadURL(ref(storage, imagePath));
        return url;
        } else {
        const defaultImagePath = "static-club-photos/NV/Cypress.jpg";
        const defaultUrl = await getDownloadURL(ref(storage, defaultImagePath));
        return defaultUrl;
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
};