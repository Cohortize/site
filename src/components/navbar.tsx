const Navbar = () => {
  const navElements = [
    { name: "Home", slug: "/" },
    { name: "Ships", slug: "/ships" },
    { name: "Leaderboard", slug: "/leaderboard" },
    { name: "Discussions", slug: "/discussions" },
  ];

  return (
    <nav className="bg-black h-16 flex items-center justify-between px-6">
      <p className="text-white text-[1.7rem] font-semibold">
        Cohortize
      </p>
      <div className="flex gap-6">
        {navElements.map((item) => (
          <a
            key={item.slug}
            href={item.slug}
            className="text-white text-[1.2rem] hover:underline"
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
