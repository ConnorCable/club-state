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
    isCaptureEligible: boolean
    chosenClub: string | undefined
    radius: number
    recordedSong: RecordedSongProps | null
    setLocation: (location: Position) => void
    setRecordedSong: (recordedSong: RecordedSongProps) => void
    setCurrentClubs: (currentClubs: Array<any>) => void
    setIsLocationLoading: (isLocationLoading: boolean) => void
    setIsRecordingLoading: (isRecordingLoading: boolean) => void
    setChosenClub: (chosenClub: string) => void
    setIsShazamCaptured: (isShazamCaptured: boolean) => void
    setIsShazamCorrect: (isShazamCorrect: boolean) => void
    setIsCompletingForm: (isCompletingForm: boolean) => void
    setIsCaptureEligibile: (isCaptureEligible: boolean) => void
    setRadius: (radius: number) => void

}

export const useDataStore = create<StoreState>()((set) => ({
    location: null,
    locationChips: [],
    currentClubs: [],
    isLocationLoading: false,
    isRecordingLoading: false,
    chosenClub: undefined,
    radius: 50,
    isShazamCaptured: false,
    isShazamCorrect: false,
    isCompletingForm: false,
    isCaptureEligible: false,
    recordedSong: null,
    setIsLocationLoading: (isLocationLoading: boolean) => set({ isLocationLoading }),
    setIsRecordingLoading: (isRecordingLoading: boolean) => set({ isRecordingLoading }),
    setCurrentClubs: (currentClubs: any) => set({currentClubs}),
    setLocation: (location: Position) => set({ location }),
    setChosenClub: (chosenClub: string) => set({ chosenClub}),
    setRadius: (radius: number) => set({ radius}),
    setRecordedSong: (recordedSong: RecordedSongProps) => set({recordedSong}),
    setIsShazamCaptured: (isShazamCaptured: boolean) => set({isShazamCaptured}),
    setIsShazamCorrect: (isShazamCorrect: boolean) => set({isShazamCorrect}),
    setIsCompletingForm: (isCompletingForm: boolean) => set({isCompletingForm}),
    setIsCaptureEligibile: (isCaptureEligible: boolean) => set({isCaptureEligible})
}));