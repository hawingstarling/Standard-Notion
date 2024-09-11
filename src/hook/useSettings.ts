import { create } from "zustand";


type SettingsState = {
    isOpen: boolean
}

type SettingsAction = {
    onOpen: () => void;
    onClose: () => void;
}

type SettingsStore = SettingsState & SettingsAction;

export const useSettings = create<SettingsStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    
}))