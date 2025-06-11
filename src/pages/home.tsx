import Navbar from "@/components/navbar";

import Hero from "@/components/hero";
const Home = () => {
  return (
    <div
      style={{
        fontFamily:
          'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontVariationSettings: "wght 480",
      }}
    >
      <Navbar />
      <Hero />
      
    </div>
  );
};

export default Home;