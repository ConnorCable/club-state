import { create } from "zustand";
import { Position } from "@capacitor/geolocation";

interface StoreState
{
    location: Position | null
    locationChips: Array<any> | null
    isLocationLoading: boolean
    isRecordingLoading: boolean
    activeClub: string | null
    setLocation: (location: Position) => void
    setLocationChips: (locationChips: Array<any>) => void
    setIsLocationLoading: (isLocationLoading: boolean) => void
    setIsRecordingLoading: (isRecordingLoading: boolean) => void
    setActiveClub: (activeClub: string) => void
}

export const useDataStore = create<StoreState>()((set) => ({
    location: null,
    locationChips: [],
    isLocationLoading: false,
    isRecordingLoading: false,
    activeClub: null,
    setLocationChips: Array<any>,
    setIsLocationLoading: (isLocationLoading: boolean) => set({ isLocationLoading }),
    setIsRecordingLoading: (isRecordingLoading: boolean) => set({ isRecordingLoading }),
    setLocation: (location: Position) => set({ location }),
    setActiveClub: (activeClub: string) => set({ activeClub}),
}));