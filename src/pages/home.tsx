import Navbar from "@/components/homepage/navbar";
import Hero from "@/components/homepage/hero";
import Path from "@/components/homepage/path";

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
      <Path />
     </div>
  );
};

export default Home;