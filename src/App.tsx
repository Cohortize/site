import Home from './pages/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react';

function LenisWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time);
      }
      requestAnimationFrame(update);
    }
    const rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio < 0.8) {
            const lenis = lenisRef.current?.lenis;
            if (lenis && Math.abs(lenis.velocity) > 1) {
              lenis.scrollTo(entry.target, {
                duration: 1,
                easing: (t: number) => 1 - Math.pow(1 - t, 4)
              });
            }
          }
        });
      },
      {
        threshold: [0.2, 0.8],
        rootMargin: '-10% 0px -10% 0px'
      }
    );
    setTimeout(() => {
      const pathSection = document.querySelector('.path-section');
      if (pathSection) {
        observer.observe(pathSection);
      }
    }, 100);

    return () => observer.disconnect();
  }, []);

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