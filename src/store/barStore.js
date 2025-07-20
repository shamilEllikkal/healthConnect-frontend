
import { create } from "zustand";

const useVisibilityStore = create((set) => ({
  isVisible: true,
  toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));

export default useVisibilityStore;