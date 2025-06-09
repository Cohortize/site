import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { JSX, useState } from "react";
import { ChevronDown, Ship, Trophy, MessageCircle, Users, Star, MessageSquare } from "lucide-react";

type DropdownKey = "ships" | "leaderboard" | "discussions";

interface NavigationItem {
  title: string;
  key: DropdownKey;
  icon: JSX.Element;
  items: {
    title: string;
    href: string;
    icon: JSX.Element;
    description: string;
  }[];
}

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);

  const handleMouseEnter = (dropdown: DropdownKey) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const navigationItems: NavigationItem[] = [
    {
      title: "Ships",
      key: "ships" as const,
      icon: <Ship className="w-3.5 h-3.5" />,
      items: [
        { title: "Create Ship", href: "/ship/create", icon: <Ship className="w-3.5 h-3.5" />, description: "Create a new ship" },
        { title: "Browse Ships", href: "/ships", icon: <Users className="w-3.5 h-3.5" />, description: "View all ships by users" },
        { title: "My Ships", href: "/xxxx/ships", icon: <Star className="w-3.5 h-3.5" />, description: "Your active ships" },
      ]
    },
    {
      title: "Leaderboard",
      key: "leaderboard" as const,
      icon: <Trophy className="w-3.5 h-3.5" />,
      items: [
        { title: "User Rankings", href: "/leaderboard", icon: <Trophy className="w-3.5 h-3.5" />, description: "Top performers worldwide" },
        { title: "Ship Rankings", href: "/leaderboard/ships", icon: <Ship className="w-3.5 h-3.5" />, description: "Best performing ships" },
        { title: "Project Ideas", href: "/leaderboard/weekly", icon: <Star className="w-3.5 h-3.5" />, description: "Top project ideas" },
      ]
    },
    {
      title: "Discussions",
      key: "discussions" as const,
      icon: <MessageCircle className="w-3.5 h-3.5" />,
      items: [
        { title: "Recent Discussions", href: "/discussions", icon: <MessageCircle className="w-3.5 h-3.5" />, description: "Latest conversations" },
        { title: "Popular Topics", href: "/discussions/popular", icon: <MessageSquare className="w-3.5 h-3.5" />, description: "Trending discussions" },
        { title: "Start Discussion", href: "/discussions/new", icon: <Users className="w-3.5 h-3.5" />, description: "Create new topic" },
      ]
    }
  ];

  return (
    <nav className="bg-black h-16 flex items-center justify-between px-6 border-b border-gray-800/50 relative z-50">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200"
          style={{
            fontFamily:
              'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontVariationSettings: "wght 480",
          }}
        >
          Cohortize
        </Link>

        <div className="flex items-center gap-0.5">
          {navigationItems.map((navItem) => (
            <div
              key={navItem.key}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(navItem.key)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-white text-sm font-normal transition-colors duration-200 rounded-md hover:bg-gray-900/30">
                {navItem.icon}
                <span>{navItem.title}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  activeDropdown === navItem.key ? 'rotate-180' : ''
                }`} />
              </button>
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 transition-all duration-200 ${
                activeDropdown === navItem.key 
                  ? 'opacity-100 visible' 
                  : 'opacity-0 invisible'
              }`}>
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[4px] border-l-transparent border-r-transparent border-b-white/15 mb-1"></div>
              </div>


              <div className={`absolute top-full left-0 mt-1.5 w-[280px] bg-black/98 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-200 ${
                activeDropdown === navItem.key 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible translate-y-1'
              }`}
              style={{
                border: '0.5px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}>
                <div className="p-1">
                  {navItem.items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className="flex items-start gap-2.5 p-2.5 rounded-md hover:bg-white/[0.03] transition-all duration-150 group/item"
                      style={{
                        border: '0.5px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.border = '0.5px solid rgba(255, 255, 255, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.border = '0.5px solid transparent';
                      }}
                    >
                      <div className="text-gray-500 group-hover/item:text-gray-300 mt-0.5 transition-colors duration-150">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-200 group-hover/item:text-white transition-colors duration-150">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 group-hover/item:text-gray-400 transition-colors duration-150 mt-0.5 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          className="bg-white text-black hover:bg-[#e3e2e1] cursor-pointer transition-all duration-200 font-normal text-sm px-3 py-1.5 h-8 rounded-md"
          style={{
            border: '0.5px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          Log in
        </Button>
        <Button
          variant="ghost" 
          className="cursor-pointer text-gray-300 hover:text-white hover:bg-white/[0.03] transition-all duration-200 font-normal text-sm px-3 py-1.5 h-8 rounded-md"
          style={{
            border: '0.5px solid rgba(255, 255, 255, 0.08)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '0.5px solid rgba(255, 255, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '0.5px solid rgba(255, 255, 255, 0.08)';
          }}
        >
          Sign up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;