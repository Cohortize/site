import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const navElements = [
    { name: "Ships", slug: "/ships" },
    { name: "Leaderboard", slug: "/leaderboard" },
    { name: "Discussions", slug: "/discussions" },
  ];

  return (
    <nav className="bg-black h-16 flex items-center justify-between px-6 border-b border-gray-800">

<Link
  id="logo"
  to="/"
style={{
  fontFamily: 'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontWeight: 400,
  fontSize: '1.5rem',
  color: 'white',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
  letterSpacing: '-0.005em',
  lineHeight: '1.4',
  fontVariationSettings: "wght 480"
}}
  className="hover:text-gray-700 transition-colors duration-200"
>
  Cohortize
</Link>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-8">
          {navElements.map((item) => (
            <Link
              key={item.slug}
              to={item.slug}
              className="text-[#545454] text-[1.1rem] font-medium relative transition-colors duration-200 hover:text-white group"
              style={{
            fontFamily: 'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontWeight: 400,
            fontSize: '1rem',
            color: 'white',
        }}
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
          <Button className="bg-white text-black hover:bg-[#181818] hover:text-white transition-all duration-300 ease-in-out">Login</Button>
          <Button className="text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out">Signup</Button>
        </div>
    </nav>
  );
};

export default Navbar;