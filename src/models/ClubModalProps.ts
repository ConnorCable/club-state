import { Position } from "@capacitor/geolocation";

export interface ClubModalProps {
    Line: boolean,
    Cover: boolean,
    Name: string,
    Cleanliness: string,
    Price: string,
    Fullness: string,
    Hostility: string,
    Ratio: string,
    Genre: string,
    Loudness: string,
    Location: Position | null,
    activeClub: string | "",
  }