import { Position } from "@capacitor/geolocation";
import { ClubStateProps } from "./ClubStateProps";
export interface ClubProps {    
    Name: string,
    Address: string,
    Coordinates: {latitude: number, longitude: number},
    Id: string,
    Image: string,
    RecentCapture: {
      artist: string,
      cleanliness: string,
      clubId: string,
      cover: boolean,
      fullness: string,
      genre: string,
      hostility: string,
      line: boolean,
      latitude: string,
      longitude: string,
      loudness: string,
      price: string,
      ratio: string,
      song: string,
    }     
  }