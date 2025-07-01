"use client";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
} from "../ui/dialog"
import { LoginForm } from "./login-form";
import { useAuthDialogStore } from "@/app/stores/useAuthDialogStore";
import { useEffect } from "react";
import { SignupForm } from "./signup-form";
import { VisuallyHidden } from "radix-ui";
function useScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (!isLocked) return;
        const scrollY = window.scrollY;
        const body = document.body;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.overflow = 'hidden';
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        };
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('touchmove', preventScroll, { passive: false });
        document.addEventListener('scroll', preventScroll, { passive: false });
        
        const preventScrollKeys = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', preventScrollKeys);
        return () => {
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
            document.removeEventListener('scroll', preventScroll);
            document.removeEventListener('keydown', preventScrollKeys);
            body.style.position = '';
            body.style.top = '';
            body.style.left = '';
            body.style.right = '';
            body.style.overflow = '';
            window.scrollTo(0, scrollY);
        };
    }, [isLocked]);
}

export function AuthDialog() {
    const isOpen = useAuthDialogStore((state) => state.isOpen);
    const close = useAuthDialogStore((state) => state.close);
    const mode = useAuthDialogStore((state) => state.mode);
    useScrollLock(isOpen);
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            close();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTitle />
            <DialogOverlay className="backdrop-blur-sm bg-black/50" />
            <DialogContent className="sm:max-w-[425px] bg-black border border-white/30 text-white">
                {mode == "login" ? <LoginForm /> : <SignupForm />}
            </DialogContent>
        </Dialog>
    );
}