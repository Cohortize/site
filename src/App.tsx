import Home from './pages/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react';
import { AuthDialog } from './components/global/authDialog';
function LenisWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const [canTriggerScroll, setCanTriggerScroll] = useState(true);
  const [lenisDisabled, setLenisDisabled] = useState(false);
  const [hasTriggeredFirstScroll, setHasTriggeredFirstScroll] = useState(false);

  useEffect(() => {
    function update(time: number) {
      if (lenisRef.current?.lenis && !lenisDisabled) {
        lenisRef.current.lenis.raf(time);
      }
      requestAnimationFrame(update);
    }
    const rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [lenisDisabled]);

  useEffect(() => {
    const handleFirstScroll = (e: Event) => {
      if (!canTriggerScroll || lenisDisabled || hasTriggeredFirstScroll) return;
      e.preventDefault();
      e.stopPropagation();
      
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      setCanTriggerScroll(false);
      setLenisDisabled(true);
      setHasTriggeredFirstScroll(true);
      lenis.stop();

      const pathSection = document.querySelector('.path-section');
      
      if (pathSection) {
        const rect = pathSection.getBoundingClientRect();
        const targetPosition = rect.top + window.scrollY;

        lenis.scrollTo(targetPosition, {
          duration: 2.5,
          easing: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          force: true,
          onComplete: () => {
            setTimeout(() => {
              if (lenisRef.current?.lenis) {
                lenisRef.current.lenis.start();
                setLenisDisabled(false);
                setCanTriggerScroll(true);
              }
            }, 500); 
          }
        });
      }
    };

    const handleScrollEvents = (e: Event) => {
      if (lenisDisabled) {
        e.preventDefault();
        e.stopPropagation();
      } else if (!hasTriggeredFirstScroll) {
        handleFirstScroll(e);
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'];
      if (scrollKeys.includes(e.code)) {
        if (lenisDisabled) {
          e.preventDefault();
          e.stopPropagation();
        } else if (!hasTriggeredFirstScroll) {
          handleFirstScroll(e);
        }
      }
    };

    const events = ['wheel', 'touchmove', 'touchstart'];
    events.forEach(eventName => {
      document.addEventListener(eventName, handleScrollEvents, { 
        passive: false, 
        capture: true 
      });
    });
    document.addEventListener('keydown', handleKeydown, { passive: false, capture: true });

    return () => {
      events.forEach(eventName => {
        document.removeEventListener(eventName, handleScrollEvents, { capture: true });
      });
      document.removeEventListener('keydown', handleKeydown, { capture: true });
    };
  }, [canTriggerScroll, lenisDisabled, hasTriggeredFirstScroll]);

  useEffect(() => {
    if (!lenisDisabled) return;

    const fallbackTimer = setTimeout(() => {
      if (lenisDisabled && lenisRef.current?.lenis) {
        lenisRef.current.lenis.start();
        setLenisDisabled(false);
        setCanTriggerScroll(true);
      }
    }, 4000);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [lenisDisabled]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        easing: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LenisWrapper>
              <Home />
            </LenisWrapper>
          }
        />
      </Routes>
      <>
      <AuthDialog />
      </>
    </BrowserRouter>
  )
}

export default App;