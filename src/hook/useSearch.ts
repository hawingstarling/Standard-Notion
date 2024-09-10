import { create } from 'zustand';

type SearchState = {
  isOpen: boolean;
};

type SearchAction = {
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

type SearchStore = SearchState & SearchAction;

export const useSearch = create<SearchStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));
