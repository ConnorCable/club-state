import { create } from "zustand";
import { Position } from "@capacitor/geolocation";

interface StoreState
{
    location: Position | null
    isLoading: boolean
    activeClub: string | null
    setLocation: (location: Position) => void
    setIsLoading: (isLoading: boolean) => void
    setActiveClub: (activeClub: string) => void
}

export const useDataStore = create<StoreState>()((set) => ({
    location: null,
    isLoading: false,
    activeClub: null,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setLocation: (location: Position) => set({ location }),
    setActiveClub: (activeClub: string) => set({ activeClub}),
}));