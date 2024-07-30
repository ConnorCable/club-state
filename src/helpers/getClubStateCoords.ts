import firebase from "firebase/compat/app";
import * as geofirestore from "geofirestore";
import { FeatureCollection, Position } from "geojson";

export const getClubStateCoords = async (
  location: any,
  radius: any
) => {
  const firestore = firebase.firestore();
  const GeoFirestore = geofirestore.initializeApp(firestore);
  const geocollection = GeoFirestore.collection("geo-clubs");

  // 1609 km roughly 1 mi
  const query = geocollection.near({
    center: new firebase.firestore.GeoPoint(
      location!.coords.latitude,
      location!.coords.longitude
    ),
    radius: radius,
  });

  const value = await query.get();
  const clubStateCoords = await Promise.all(value.docs.map(async (doc) => {
    const clubData = doc.data();
    const clubId = doc.id;
    const clubRef = firestore.collection("geo-clubs").doc(clubId);
    const statesCollection = clubRef.collection('states');
    const statesSnapshot = await statesCollection.get();

    const stateCoords = statesSnapshot.docs.map((stateDoc) => {
      const stateData = stateDoc.data();
      if (stateData.coordinates && stateData.coordinates.latitude && stateData.coordinates.longitude) {
        return [stateData.coordinates.longitude, stateData.coordinates.latitude];
      }
      return null;
    }).filter(Boolean); // Filter out any null values

    return stateCoords;
  }));

  const flattenedCoords = clubStateCoords.flat() as Position[];
  const mycoords: Position[] = [[38, -121]];
  const geoJson: FeatureCollection = {
    type: "FeatureCollection",
    features: flattenedCoords.map(coord => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coord
      },
      properties: {}
    }))
  };

 // console.log(JSON.stringify(geoJson, null, 2)); // Debugging: Log the GeoJSON
  //console.log('GeoJSON:', geoJson);
  return geoJson;
};