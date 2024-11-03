import {create} from 'zustand';

export const commonStore = create((set) => ({
  activeHeader: 'Home',
  setActiveHeader: (header) => set({ activeHeader: header }),
}));