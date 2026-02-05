import { create } from 'zustand';

interface FilterState {
  year: string;
  month: string;
  setYear: (year: string) => void;
  setMonth: (month: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  year: '',
  month: '',
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
}));
