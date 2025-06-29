import {create} from "zustand"

interface authDialogStore {
    isOpen: boolean
    open: () => void
    close: () => void
}
export const useAuthDialogStore = create<authDialogStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}))