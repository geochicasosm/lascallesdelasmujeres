import { create } from 'zustand';
import { City } from '../types/city.types';

interface CityStore {
  selectedCity: City | null;
  selectCity: (city: City) => void;
  clearCity: () => void;
}

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: null,
  selectCity: (city) => set({ selectedCity: city }),
  clearCity: () => set({ selectedCity: null }),
}));
