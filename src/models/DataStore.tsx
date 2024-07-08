import { create } from "zustand";
import { Position } from "@capacitor/geolocation";

interface StoreState
{
    location: Position | null
    currentClubs: Array<any> | null
    isLocationLoading: boolean
    isRecordingLoading: boolean
    isShazamCaptured: boolean
    isShazamCorrect: boolean
    isCompletingForm: boolean
    activeClub: string | null
    radius: number
    setLocation: (location: Position) => void
    setCurrentClubs: (currentClubs: Array<any>) => void
    setIsLocationLoading: (isLocationLoading: boolean) => void
    setIsRecordingLoading: (isRecordingLoading: boolean) => void
    setActiveClub: (activeClub: string) => void
    setIsShazamCaptured: (isShazamCaptured: boolean) => void
    setIsShazamCorrect: (isShazamCorrect: boolean) => void
    setIsCompletingForm: (isCompletingForm: boolean) => void
    setRadius: (radius: number) => void

}

export const useDataStore = create<StoreState>()((set) => ({
    location: null,
    locationChips: [],
    currentClubs: [],
    isLocationLoading: false,
    isRecordingLoading: false,
    activeClub: null,
    radius: 5,
    isShazamCaptured: false,
    isShazamCorrect: false,
    isCompletingForm: false,
    setIsLocationLoading: (isLocationLoading: boolean) => set({ isLocationLoading }),
    setIsRecordingLoading: (isRecordingLoading: boolean) => set({ isRecordingLoading }),
    setCurrentClubs: (currentClubs: any) => set({currentClubs}),
    setLocation: (location: Position) => set({ location }),
    setActiveClub: (activeClub: string) => set({ activeClub}),
    setRadius: (radius: number) => set({ radius}),
    setIsShazamCaptured: (isShazamCaptured: boolean) => set({isShazamCaptured}),
    setIsShazamCorrect: (isShazamCorrect: boolean) => set({isShazamCorrect}),
    setIsCompletingForm: (isCompletingForm: boolean) => set({isCompletingForm}),
}));