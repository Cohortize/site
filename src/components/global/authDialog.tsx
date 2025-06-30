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
import { useEffect, useState } from "react";

export function AuthDialog(){
    const isOpen = useAuthDialogStore((state) => state.isOpen)
    const close = useAuthDialogStore((state) => state.close)
    const mode = useAuthDialogStore((state) => state.mode)
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            close();
        }
    };

    return(
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "signup" ? "Signup" : "Login"}
                    </DialogTitle>
                    <DialogDescription>
                        Login dawg
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2 py-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="login-input">
                            Login
                        </Label>
                        <Input id="login-input" defaultValue="hehehehehe" />
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

export function AuthDialogAlternative(){
    const isOpen = useAuthDialogStore((state) => state.isOpen)
    const close = useAuthDialogStore((state) => state.close)
    const mode = useAuthDialogStore((state) => state.mode)
    const [internalOpen, setInternalOpen] = useState(false);
    
    useEffect(() => {
        setInternalOpen(isOpen);
    }, [isOpen]);
    
    const handleOpenChange = (open: boolean) => {
        setInternalOpen(open);
        if (!open) {
            close();
        }
    };

    return(
        <Dialog open={internalOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "signup" ? "Signup" : "Login"}
                    </DialogTitle>
                    <DialogDescription>
                        Login dawg
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-3">
                        <Label htmlFor="login-input">Login</Label>
                        <Input id="login-input" defaultValue="hehehehehe" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}