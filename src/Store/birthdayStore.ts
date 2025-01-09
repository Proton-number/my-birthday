import { create } from "zustand";

interface yorestore {
  yourState: any;
  yourAction: (val: any) => void;
}
export const useyorestore = create<yorestore>((set) => ({
  yourState: "VALUE",
  yourAction: (val) => set((state) => ({ yourState: state.yourState })),
}));
