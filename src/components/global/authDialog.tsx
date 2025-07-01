import {
    Dialog,
    DialogContent,

} from "../ui/dialog"
import { LoginForm } from "./login-form";
import { useAuthDialogStore } from "@/stores/useAuthDialogStore";
import { useEffect } from "react";

function useCleanScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    const scrollY = window.scrollY;

    const observer = new MutationObserver(() => {

      document.body.style.paddingRight = '';
      document.body.style.marginRight = '';

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });


    document.body.style.paddingRight = '';
    document.body.style.marginRight = '';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';


    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('scroll', preventScroll, { passive: false });
    document.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        e.preventDefault();
      }
    });

    return () => {
      observer.disconnect();
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.marginRight = '';

      window.scrollTo(0, scrollY);

      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('scroll', preventScroll);
    };
  }, [isLocked]);
}

export function AuthDialog() {
    const isOpen = useAuthDialogStore((state) => state.isOpen);
    const close = useAuthDialogStore((state) => state.close);
    const mode = useAuthDialogStore((state) => state.mode);

    useCleanScrollLock(isOpen);
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            close();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <LoginForm />
            </DialogContent>
        </Dialog>
    );
}