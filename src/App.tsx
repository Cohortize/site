import { useState } from 'react'
import Landing from './pages/landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
function App() {

  return (
  
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={<Landing />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App
