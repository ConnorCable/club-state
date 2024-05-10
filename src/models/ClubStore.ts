import { create } from 'zustand';

interface ClubStoreState {
  clubRefs: { [key: string]: firebase.default.firestore.DocumentReference };
  updateClubRefs: (clubId: string, clubRef: firebase.default.firestore.DocumentReference) => void; // Mapping club IDs to document references
  getClubRef: (clubId: string) => firebase.default.firestore.DocumentReference | undefined;
}

const useClubStore = create<ClubStoreState>((set, get) => ({
  clubRefs: {},
  updateClubRefs: (clubId: string, clubRef: firebase.default.firestore.DocumentReference) =>
    set((state) => ({
      clubRefs: { ...state.clubRefs, [clubId]: clubRef },
    })),
  getClubRef: (clubId: string) => get().clubRefs[clubId] == null ? undefined : get().clubRefs[clubId],
}));

export default useClubStore;


/*
getClub: (clubId: string) => {
        const state = get();
        return state.clubRefs[clubId];
    }

*/