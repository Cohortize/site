import Navbar from "@/components/homepage/navbar";
import Hero from "@/components/homepage/hero";
import Path from "@/components/homepage/path";
import Collaborate from "@/components/homepage/collaborate";
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
      <Collaborate />
      <Collaborate />
     </div>
  );
};

export default Home;