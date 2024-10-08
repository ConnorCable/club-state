import { create } from "zustand";
import { Position } from "@capacitor/geolocation";
import {GenerativeModel} from "@google/generative-ai";
import { promptString } from "./aiPrompt";


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
    isMapModalOpen: boolean
    chosenClub: string | undefined
    radius: number
    recordedSong: RecordedSongProps | null
    googleGenerativeAI: GenerativeModel | null
    googleAPIKey: string
    aiPrompt: string
    currentClubStateCoords : Array<any>
    genres: string[]
    setCurrentClubStateCoords: (currentClubStateCoords: Array<any>) => void
    setLocation: (location: Position) => void
    setRecordedSong: (recordedSong: RecordedSongProps) => void
    setCurrentClubs: (currentClubs: Array<any>) => void
    setIsLocationLoading: (isLocationLoading: boolean) => void
    setIsRecordingLoading: (isRecordingLoading: boolean) => void
    setIsMapModalOpen: (isMapModalOpen: boolean) => void
    setChosenClub: (chosenClub: string) => void
    setIsShazamCaptured: (isShazamCaptured: boolean) => void
    setIsShazamCorrect: (isShazamCorrect: boolean) => void
    setIsCompletingForm: (isCompletingForm: boolean) => void
    setIsCaptureEligibile: (isCaptureEligible: boolean) => void
    setRadius: (radius: number) => void
    setGoogleGenerativeAI: (googleGenerativeAI: GenerativeModel) => void
    setGenres: (genres: string[]) => void



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
    isMapModalOpen: true,
    recordedSong: null,
    googleGenerativeAI: null,
    aiPrompt: promptString,
    currentClubStateCoords: [],
    googleAPIKey: "AIzaSyDJDA_8BQU_RM0_jOpbH22_FPg0aVFNp54",
    genres: [],
    setCurrentClubStateCoords: (currentClubStateCoords: any) => set({currentClubStateCoords}),
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
    setIsCaptureEligibile: (isCaptureEligible: boolean) => set({isCaptureEligible}),
    setIsMapModalOpen: (isMapModalOpen: boolean) => set({isMapModalOpen}),
    setGoogleGenerativeAI: (googleGenerativeAI: GenerativeModel) => set({googleGenerativeAI}),
    setGenres: (genres: string[]) => set({genres}),

}));