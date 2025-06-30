import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { useAuthDialogStore } from "@/stores/useAuthDialogStore";
import { Input } from "../ui/input";
import { Label } from "../ui/label"

export function AuthDialog(){
    const isOpen = useAuthDialogStore((state) => state.isOpen)
    const close = useAuthDialogStore((state) => state.close)
    const mode = useAuthDialogStore((state) => state.mode)
    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {mode === "signup" ? "Signup" : "Login"}
                    </DialogTitle>
                    <DialogDescription>
                        Login dawg
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                    <Label>
                        Login
                    </Label>
                    <Input id="id" defaultValue= "hehehehehe" />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}