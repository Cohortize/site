import { Button } from "@/components/ui/button";
import { Ship, Users } from "lucide-react";

const Hero = () => {
return(<>
<div className="relative flex flex-col-reverse gap-8 md:gap-16 justify-center items-center overflow-hidden bg-black px-4 md:px-6 xl:pt-20 2xl:pt-32 h-screen">
        

      
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





        
        <div className="flex flex-col gap-6 md:gap-8 xl:gap-10 2xl:gap-12 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
          <div>
          <p className="text-6xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-7xl text-white text-center px-2 sm:px-4 md:px-6 z-20 relative font-medium leading-tight xl:leading-tight 2xl:leading-tight">
            Your one-stop platform for
          </p>
          <p className="text-6xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-7xl text-white text-center px-2 sm:px-4 md:px-6 z-20 relative font-medium leading-tight xl:leading-tight 2xl:leading-tight">
            ideas.
          </p>
          </div>
          <div className="flex justify-center items-center px-2 sm:px-4">
          <p className="text-[#b8b6b6] text-[1.4rem] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[1.6rem] 2xl:text-[1.8rem] text-center max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            Cohortize is a one-stop platform for collaboration, finding ideas and people to execute them with.
          </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 xl:gap-8 px-4 sm:px-0">
            <Button
              className="group relative bg-white text-black hover:bg-[#d2d2d1] transition-all duration-300 font-medium text-sm px-4 sm:px-6 xl:px-8 py-3 xl:py-4 rounded-lg cursor-pointer overflow-hidden w-full sm:w-auto"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily:'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontVariationSettings: "wght 480",
                minWidth: '140px',
                height: '44px'
              }}>
              <div className="flex items-center justify-center gap-2 text-sm sm:text-[1rem] xl:text-[1.1rem] font-black">
                <Ship size={18} className="sm:w-5 sm:h-5 xl:w-6 xl:h-6"/>
                <span>Ship project</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />
            </Button>
            
            <Button
              className="group relative bg-[#282828] backdrop-blur-sm text-white hover:bg-[#373737] transition-all duration-300 font-medium text-sm px-4 sm:px-6 xl:px-8 py-3 xl:py-4 rounded-lg cursor-pointer overflow-hidden w-full sm:w-auto"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontFamily:'Geist, "Geist Fallback", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontVariationSettings: "wght 480",
                minWidth: '140px',
                height: '44px'
              }}>
              <div className="flex items-center justify-center gap-2 text-sm sm:text-[1rem] xl:text-[1.1rem] font-black">
                <Users size={18} className="sm:w-5 sm:h-5 xl:w-6 xl:h-6"/>
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
      </style></>);
}


export default Hero;