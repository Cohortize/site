import Navbar from "@/components/homepage/navbar";

import Hero from "@/components/homepage/hero";
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