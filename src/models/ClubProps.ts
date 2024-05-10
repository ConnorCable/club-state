import { Position } from "@capacitor/geolocation";
import { ClubStateProps } from "./ClubStateProps";
export interface ClubProps {    
    Name: string,
    Address: string,
    Coordinates: {latitude: number, longitude: number},
    Id: string
    // RecentCapture: {
    //   [key: string]: ClubStateProps
    // }
  }