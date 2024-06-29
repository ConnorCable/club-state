import { create } from "zustand";
import { Position } from "@capacitor/geolocation";

interface StoreState
{
    location: Position | null
    currentClubs: Array<any> | null
    isLocationLoading: boolean
    isRecordingLoading: boolean
    activeClub: string | null
    radius: number
    setLocation: (location: Position) => void
    setCurrentClubs: (currentClubs: Array<any>) => void
    setIsLocationLoading: (isLocationLoading: boolean) => void
    setIsRecordingLoading: (isRecordingLoading: boolean) => void
    setActiveClub: (activeClub: string) => void
    setRadius: (radius: number) => void
}

export const useDataStore = create<StoreState>()((set) => ({
    location: null,
    locationChips: [],
    currentClubs: [],
    isLocationLoading: false,
    isRecordingLoading: false,
    activeClub: null,
    radius: 0,
    setIsLocationLoading: (isLocationLoading: boolean) => set({ isLocationLoading }),
    setIsRecordingLoading: (isRecordingLoading: boolean) => set({ isRecordingLoading }),
    setCurrentClubs: (currentClubs: any) => set({currentClubs}),
    setLocation: (location: Position) => set({ location }),
    setActiveClub: (activeClub: string) => set({ activeClub}),
    setRadius: (radius: number) => set({ radius}),
}));