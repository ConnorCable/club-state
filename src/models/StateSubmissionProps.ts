import { Position } from "@capacitor/geolocation";
import { ClubStateProps } from "./ClubStateProps";
export interface ClubProps {    
    Name: string,
    Address: string,
    Coordinates: {latitude: number, longitude: number},
    Id: string,
    ImageStoragePath: string,
    RecentCapture: {
      cleanliness: string,
      clubId: string,
      cover: boolean,
      fullness: string,
      hostility: string,
      line: boolean,
      latitude: string,
      longitude: string,
      loudness: string,
      price: string,
      ratio: string,
      shazamResponse : ShazamResponse
    },     
    ResidingState: string,
    
  }
export interface ShazamResponse {
    genre: string,
    imageUrl: string,
    subTitle: string,
    title: string,
}