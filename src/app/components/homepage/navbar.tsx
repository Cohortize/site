"use client";
import Link  from "next/link";
import { Button } from "../ui/button";
import { JSX, useState } from "react";
import { ChevronDown, Ship, Trophy, MessageCircle, Users, Star, MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useAuthDialogStore } from "../../stores/useAuthDialogStore";
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


const AnimatedMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-400 hover:text-white transition-colors duration-200 p-2 relative w-10 h-10 flex items-center justify-center"
    >
      <div className="w-5 h-5 relative">

        <span
          className={`absolute left-0 top-1 w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-1.5' : 'rotate-0 translate-y-0'
          }`}
        />

        <span
          className={`absolute left-0 top-2.5 w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
        />
 
        <span
          className={`absolute left-0 top-4 w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-1.5' : 'rotate-0 translate-y-0'
          }`}
        />
      </div>
    </button>
  );
};

const Navbar = () => {
  const open  = useAuthDialogStore((state) => state.open)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = (dropdown: DropdownKey) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
        { title: "Project Ideas", href: "/leaderboard/ideas", icon: <Star className="w-3.5 h-3.5" />, description: "Top project ideas" },
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
    <>
      <nav data-navbar className="bg-black h-16 flex items-center justify-between px-4 sm:px-6 border-b border-gray-800/50 z-500 fixed right-0 left-0 top-0">
 
        <div className="hidden lg:flex items-center gap-8 w-full">
          <Link
            href="/"
            className="text-white text-xl font-medium transition-colors duration-200"
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
                style={{
                fontFamily:'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontVariationSettings: "wght 480",
              }}
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
                        href={item.href}
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

          <div className="flex items-center gap-3 ml-auto">
            <Button 
              className="bg-white text-black hover:bg-[#e3e2e1] cursor-pointer transition-all duration-200 font-[450] text-sm px-3 py-1.5 h-8 rounded-lg"
              style={{
                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                fontFamily:'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontVariationSettings: "wght 480",
              }}
              onClick={() => open("login")}
            >
              Log in
            </Button>
            <Button
              variant="ghost" 
              className="cursor-pointer text-gray-300 hover:text-white hover:bg-white/[0.03] transition-all duration-200 font-[450] text-sm px-3 py-1.5 h-8 rounded-lg"
              style={{
                border: '0.5px solid rgba(255, 255, 255, 0.08)',
                fontFamily:'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontVariationSettings: "wght 480",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '0.5px solid rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '0.5px solid rgba(255, 255, 255, 0.08)';
              }}
              onClick={() => open("signup")}
            >
              Sign up
            </Button>
          </div>
        </div>

     
        <div className="lg:hidden flex items-center justify-between w-full">
          <Link
            href="/"
            className="text-white text-lg font-medium transition-colors duration-200"
            style={{
              fontFamily:
                'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontVariationSettings: "wght 480",
            }}
          >
            Cohortize
          </Link>

          <AnimatedMenuButton isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
        </div>
      </nav>

     
      <div 
        className={`lg:hidden fixed inset-x-0 top-16 bg-black/98 backdrop-blur-md border-b border-gray-800/50 z-40 transition-all duration-500 ease-in-out ${
          mobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
        }`}
        style={{
          height: mobileMenuOpen ? 'auto' : '0',
          minHeight: mobileMenuOpen ? 'auto' : '0',
          maxHeight: mobileMenuOpen ? 'calc(100vh - 4rem)' : '0',
          overflow: 'hidden'
        }}
      >
        <div 
     
          className={`p-4 space-y-4 transition-all duration-500 ease-in-out ${
            mobileMenuOpen 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform -translate-y-4'
          }`}
        >

          <div className="flex gap-3 pb-4 border-b border-gray-800/50">
            <Button 
              className="flex-1 bg-white text-black hover:bg-[#e3e2e1] cursor-pointer transition-all duration-200 font-[450] text-sm py-2 rounded-lg"
              onClick={() => open("login")}
            >
              Log in
            </Button>
            <Button
              variant="ghost" 
              className="flex-1 cursor-pointer text-gray-300 hover:text-white hover:bg-white/[0.03] transition-all duration-200 font-[450] text-sm py-2 rounded-lg border border-white/10"
              onClick={() => open("signup")}
            >
              Sign up
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {navigationItems.map((navItem, navIndex) => (
              <AccordionItem 
                key={navItem.key} 
                value={navItem.key} 

                className={`border-gray-800/50 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-2'
                }`}
                style={{
     
                  transitionDelay: mobileMenuOpen ? `${navIndex * 100 + 200}ms` : `${(navigationItems.length - 1 - navIndex) * 100}ms`
                }}
              >
                <AccordionTrigger className="text-gray-300 hover:text-white text-sm font-normal py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    {navItem.icon}
                    <span>{navItem.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-3">
                  <div className="space-y-1 ml-6">
                    {navItem.items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-start gap-3 p-3 rounded-md hover:bg-white/[0.03] transition-all duration-150 group"
                      >
                        <div className="text-gray-500 group-hover:text-gray-300 mt-0.5 transition-colors duration-150">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-150">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-150 mt-0.5 leading-relaxed">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div 
        className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 top-16 transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        onClick={closeMobileMenu}
      />
    </>
  );
};

export default Navbar;