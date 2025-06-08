import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const Navbar = () => {
  const navElements = [
    { name: "Ships", slug: "/ships" },
    { name: "Leaderboard", slug: "/leaderboard" },
    { name: "Discussions", slug: "/discussions" },
  ];

  return (
    <nav className="bg-black h-16 flex items-center justify-between px-6">
      <p className="text-white text-[1.7rem] font-semibold">
        <Link to={'/'}>
        Cohortize
        </Link>
      </p>
      <div className="flex gap-8">
        {navElements.map((item) => (
          <Link
            key={item.slug}
            to={item.slug}
            className="text-white text-[1.2rem] hover:underline"
          >
            {item.name}
          </Link>
        ))}
        <Button>Hey</Button>
      </div>
    </nav>
  );
};

export default Navbar;
