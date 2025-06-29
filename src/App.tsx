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
        {/* Other routes without Lenis or wrapped separately */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
