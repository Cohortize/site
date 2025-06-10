import Navbar from "@/components/navbar";

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

        <p className="text-5xl text-white text-center px-6 z-20 relative font-medium">
          Your one stop platform for sharing and building your ideas.
        </p>
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
        `}
      </style>
    </div>
  );
};

export default Home;