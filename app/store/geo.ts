import { create } from "zustand";

type GeoJsonData = GeoJSON.Geometry | GeoJSON.Geometry[];

interface GeoState {
  data: GeoJsonData | null;
  setData: (payload: GeoJsonData) => void;
  clearData: () => void;
}

export const useGeoStore = create<GeoState>((set) => ({
  data: null,
  setData: (payload) => set(() => ({ data: payload })),
  clearData: () => set(() => ({ data: null })),
}));
