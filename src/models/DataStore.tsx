import { create } from "zustand";
import { Position } from "@capacitor/geolocation";

interface StoreState
{
    location: Position | null
    isLocationLoading: boolean
    isRecordingLoading: boolean
    activeClub: string | null
    setLocation: (location: Position) => void
    setIsLocationLoading: (isLocationLoading: boolean) => void
    setIsRecordingLoading: (isRecordingLoading: boolean) => void
    setActiveClub: (activeClub: string) => void
}

export const useDataStore = create<StoreState>()((set) => ({
    location: null,
    isLocationLoading: false,
    isRecordingLoading: false,
    activeClub: null,
    setIsLocationLoading: (isLocationLoading: boolean) => set({ isLocationLoading }),
    setIsRecordingLoading: (isRecordingLoading: boolean) => set({ isRecordingLoading }),
    setLocation: (location: Position) => set({ location }),
    setActiveClub: (activeClub: string) => set({ activeClub}),
}));