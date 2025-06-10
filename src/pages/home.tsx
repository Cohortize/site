import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Ship, User, Users } from "lucide-react";

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

      <div className="relative h-screen w-full flex flex-col-reverse gap-16 justify-center items-center overflow-hidden bg-black">
        

        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: `
              radial-gradient(ellipse 60% 80% at center, 
                rgba(255,255,255,1) 0%, 
                rgba(255,255,255,0.5) 40%, 
                rgba(255,255,255,0.3) 70%, 
                rgba(255,255,255,0.1) 100%
              )
            `,
            WebkitMaskImage: `
              radial-gradient(ellipse 60% 80% at center, 
                rgba(255,255,255,0.4) 0%, 
                rgba(255,255,255,0.2) 40%, 
                rgba(255,255,255,0.2) 70%, 
                rgba(255,255,255,0.02) 100%
              )
            `,
          }}
        />

        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 60%, 
                #ff0040 0deg,
                #ff4000 30deg,
                #ff8000 60deg,
                #ffff00 90deg,
                #80ff00 120deg,
                #00ff40 150deg,
                #00ff80 180deg,
                #00ffff 210deg,
                #0080ff 240deg,
                #0040ff 270deg,
                #4000ff 300deg,
                #8000ff 330deg,
                #ff0040 360deg
              )
            `,
            maskImage: `
              radial-gradient(circle 300px at 50% 60%, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,255,255,0.6) 30%, 
                rgba(255,255,255,0.3) 60%,
                rgba(255,255,255,0.1) 80%,
                transparent 100%
              )
            `,
            WebkitMaskImage: `
              radial-gradient(circle 300px at 50% 60%, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,255,255,0.6) 30%, 
                rgba(255,255,255,0.3) 60%,
                rgba(255,255,255,0.1) 80%,
                transparent 100%
              )
            `,
          }}
        />


        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `
              conic-gradient(from 45deg at 50% 60%, 
                #ff006e 0deg,
                #fb5607 45deg,
                #ffbe0b 90deg,
                #8ecae6 135deg,
                #219ebc 180deg,
                #023047 225deg,
                #8b5cf6 270deg,
                #c77dff 315deg,
                #ff006e 360deg
              )
            `,
            maskImage: `
              radial-gradient(circle 200px at 50% 60%, 
                rgba(255,255,255,0.9) 0%, 
                rgba(255,255,255,0.5) 50%,
                rgba(255,255,255,0.2) 80%,
                transparent 100%
              )
            `,
            WebkitMaskImage: `
              radial-gradient(circle 200px at 50% 60%, 
                rgba(255,255,255,0.9) 0%, 
                rgba(255,255,255,0.5) 50%,
                rgba(255,255,255,0.2) 80%,
                transparent 100%
              )
            `,
          }}
        />

  
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle 150px at 50% 60%, 
                rgba(255, 255, 255, 0.15) 0%,
                rgba(147, 51, 234, 0.2) 30%,
                rgba(59, 130, 246, 0.15) 60%,
                transparent 100%
              )
            `,
          }}
        />

        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.04) 0%, transparent 60%)
            `,
          }}
        />


        <div className="relative w-[180px] h-[180px] z-10">
          <div
            className="w-full h-full rounded-full bg-black/60 backdrop-blur-sm"
            style={{
              border: "2px dotted rgba(255,255,255,0.4)",
              animation: "rotate 12s linear infinite, breathe 4s ease-in-out infinite",
              boxShadow: '0 0 30px rgba(255,255,255,0.1)'
            }}
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              filter: "blur(8px)",
              animation: "rotate 15s linear infinite reverse",
            }}
          />
        </div>
        
        <div className="flex flex-col gap-8">
          <p className="text-5xl text-white text-center px-6 z-20 relative font-medium">
            Your one stop platform for sharing and building your ideas.
          </p>
          
          <div className="flex flex-row justify-center gap-6">
            <Button
              className="group relative bg-white text-black hover:bg-[#d2d2d1] transition-all duration-300 font-medium text-sm px-6 py-3 rounded-lg cursor-pointer overflow-hidden"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily:'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontVariationSettings: "wght 480",
                width: '140px',
                height: '44px'
              }}>
              <div className="flex items-center justify-center gap-2">
                <Ship size={16}/>
                <span>Ship project</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
            </Button>
            
            <Button
              className="group relative bg-[#282828] backdrop-blur-sm text-white hover:bg-[#373737] transition-all duration-300 font-medium text-sm px-6 py-3 rounded-lg cursor-pointer overflow-hidden"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontFamily:'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontVariationSettings: "wght 480",
                width: '140px',
                height: '44px'
              }}>
              <div className="flex items-center justify-center gap-2">
                <Users />
                <span>Explore</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
            </Button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes breathe {
            0%, 100% { 
              transform: scale(1);
              opacity: 0.9;
            }
            50% { 
              transform: scale(1.02);
              opacity: 1;
            }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;