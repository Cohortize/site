import Navbar from "@/components/homepage/navbar";
import Hero from "@/components/homepage/hero";
import Ships from "@/components/homepage/ships";
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
      <Ships />
      <Collaborate />
    </div>
  );
};

export default Home;