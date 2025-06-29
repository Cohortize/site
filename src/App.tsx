import Home from './pages/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react';

function LenisWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const [canTriggerScroll, setCanTriggerScroll] = useState(true);
  const [lenisDisabled, setLenisDisabled] = useState(false);

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
      if (!canTriggerScroll || lenisDisabled) return;
      e.preventDefault();
      e.stopPropagation();
      
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;


      setCanTriggerScroll(false);
      setLenisDisabled(true);
      lenis.stop();

      const pathSection = document.querySelector('.path-section');
      
      if (pathSection) {

        const rect = pathSection.getBoundingClientRect();
        const targetPosition = rect.top + window.scrollY;

        lenis.scrollTo(targetPosition, {
          duration: 2.5,
          easing: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          force: true
        });
      }
    };

    const handleScrollEvents = (e: Event) => {
      if (lenisDisabled) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        handleFirstScroll(e);
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'];
      if (scrollKeys.includes(e.code)) {
        if (lenisDisabled) {
          e.preventDefault();
          e.stopPropagation();
        } else {
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
  }, [canTriggerScroll, lenisDisabled]);
  useEffect(() => {
    if (!lenisDisabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const lenis = lenisRef.current?.lenis;
            if (lenis) {
              setTimeout(() => {
                lenis.destroy();
                setTimeout(() => {
                  if (lenisRef.current) {
                    lenisRef.current.lenis.start();
                    setLenisDisabled(false);
                    setCanTriggerScroll(true);
                  }
                }, 100);
              }, 800); 
            }
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-20px 0px -20px 0px'
      }
    );


    const fallbackTimer = setTimeout(() => {
      const lenis = lenisRef.current?.lenis;
      if (lenis && lenisDisabled) {
        lenis.destroy();
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.lenis.start();
            setLenisDisabled(false);
            setCanTriggerScroll(true);
          }
        }, 100);
      }
    }, 4000); 

    const pathSection = document.querySelector('.path-section');
    if (pathSection) {
      observer.observe(pathSection);
    }

    return () => {
      observer.disconnect();
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
    </BrowserRouter>
  )
}

export default App;