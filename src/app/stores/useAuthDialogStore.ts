import {create} from "zustand"

interface authDialogStore {
    isOpen: boolean
    mode : "login" | "signup"
    open: (mode: "login" | "signup" ) => void
    close: () => void
}
export const useAuthDialogStore = create<authDialogStore>((set) => ({
    isOpen: false,
    mode: "login",
    open: (mode) => set({isOpen: true, mode}),
    close: () => set({isOpen: false})
}))