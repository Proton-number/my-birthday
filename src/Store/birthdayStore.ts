import { create } from "zustand";
import { format } from "date-fns";


export const birthdayStore = create<Birthday>((set) => ({
  formattedDate: "",
  formattedTime: "",
  formattedYear: "",
  updateFormattedDate() {
    const now = new Date();
    set(() => ({
      formattedDate: format(now, "EEEE, MMMM do"),
      formattedTime: format(now, "h:mm a"),
      formattedYear: format(now, "yyyy")
    }));
  },
}));
