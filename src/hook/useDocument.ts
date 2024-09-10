import { Document } from '@prisma/client';
import { create } from 'zustand';

type DocumentState = {
  documents: Document[];
};

type DocumentAction = {
  setDocuments: (docs: Document[]) => void;
};

type DocumentStore = DocumentState & DocumentAction;

export const useDocument = create<DocumentStore>((set) => ({
  documents: [],
  setDocuments: (docs) => set({ documents: docs }),
}));
