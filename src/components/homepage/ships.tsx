const Ships = () => {
    return (
        <div className="min-h-screen w-full bg-black flex items-center px-8 lg:px-16 xl:px-20 py-16">
            <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 xl:gap-40">
                
                <div className="flex flex-col gap-6 lg:gap-8 flex-1">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-white font-medium leading-tight tracking-tight">
                        Ship your <span className="text-[#fbcaca]">projects</span>.
                    </h1>
                    
                    <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl leading-relaxed">
                        Ship your <span className="text-[#fbcaca]">projects</span>, show them to the whole world.
                    </p>
                    
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                        There are millions of developers who make thousands of <span className="text-[#fbcaca]">projects</span> everyday, so there is a high chance that your <span className="text-[#fbcaca]">project</span> goes unnoticed even after having the potential. Don't let it happen.
                    </p>
                </div>

                
                <div className="flex-shrink-0">
                    <div 
                        className="h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 xl:h-[28rem] xl:w-[28rem] rounded-3xl shadow-2xl shadow-pink-500/20 relative overflow-hidden"
                        style={{
                            background: `conic-gradient(from 0deg at 50% 50%, 
                                #ffffff 0deg,
                                #ffb3d9 30deg,
                                #ff80cc 60deg,
                                #ff66c4 90deg,
                                #ff4dbc 120deg,
                                #ff1493 150deg,
                                #ff0080 180deg,
                                #ff1493 210deg,
                                #ff4dbc 240deg,
                                #ff80cc 270deg,
                                #ffb3d9 300deg,
                                #ffffff 330deg,
                                #ffffff 360deg
                            )`,
                            animation: 'breathing-glow 3s ease-in-out infinite alternate'
                        }}
                    >
                        <div 
                            className="absolute inset-0 rounded-3xl opacity-70"
                            style={{
                                background: `radial-gradient(ellipse 200% 100% at 0% 50%, 
                                    rgba(255, 255, 255, 0.4) 0%, 
                                    rgba(255, 20, 147, 0.2) 30%, 
                                    transparent 60%
                                )`,
                                animation: 'fluid-wave-1 8s ease-in-out infinite'
                            }}
                        />
                        <div 
                            className="absolute inset-0 rounded-3xl opacity-50"
                            style={{
                                background: `radial-gradient(ellipse 150% 120% at 100% 30%, 
                                    rgba(255, 255, 255, 0.3) 0%, 
                                    rgba(255, 0, 128, 0.25) 40%, 
                                    transparent 70%
                                )`,
                                animation: 'fluid-wave-2 12s ease-in-out infinite reverse'
                            }}
                        />
                        <div 
                            className="absolute inset-0 rounded-3xl opacity-60"
                            style={{
                                background: `radial-gradient(ellipse 180% 80% at 50% 100%, 
                                    rgba(255, 180, 217, 0.35) 0%, 
                                    rgba(255, 102, 196, 0.15) 50%, 
                                    transparent 80%
                                )`,
                                animation: 'fluid-wave-3 10s ease-in-out infinite'
                            }}
                        />
                        <div 
                            className="absolute inset-0 rounded-3xl opacity-40"
                            style={{
                                background: `radial-gradient(ellipse 120% 150% at 20% 20%, 
                                    rgba(255, 255, 255, 0.25) 0%, 
                                    rgba(255, 77, 188, 0.2) 35%, 
                                    transparent 65%
                                )`,
                                animation: 'fluid-wave-4 14s ease-in-out infinite reverse'
                            }}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes breathing-glow {
                    0% { 
                        filter: brightness(1.1) saturate(1.2);
                        box-shadow: 0 0 20px rgba(255, 20, 147, 0.3);
                    }
                    100% { 
                        filter: brightness(1.4) saturate(1.6);
                        box-shadow: 0 0 40px rgba(255, 20, 147, 0.6);
                    }
                }

                @keyframes fluid-wave-1 {
                    0% {
                        transform: translate(-20%, -10%) scale(1);
                        opacity: 0.7;
                    }
                    25% {
                        transform: translate(10%, -20%) scale(1.1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translate(20%, 10%) scale(0.9);
                        opacity: 0.8;
                    }
                    75% {
                        transform: translate(-10%, 20%) scale(1.05);
                        opacity: 0.6;
                    }
                    100% {
                        transform: translate(-20%, -10%) scale(1);
                        opacity: 0.7;
                    }
                }

                @keyframes fluid-wave-2 {
                    0% {
                        transform: translate(15%, 25%) scale(1.2);
                        opacity: 0.5;
                    }
                    33% {
                        transform: translate(-25%, 5%) scale(0.8);
                        opacity: 0.7;
                    }
                    66% {
                        transform: translate(5%, -25%) scale(1.1);
                        opacity: 0.4;
                    }
                    100% {
                        transform: translate(15%, 25%) scale(1.2);
                        opacity: 0.5;
                    }
                }

                @keyframes fluid-wave-3 {
                    0% {
                        transform: translate(0%, 30%) scale(0.9);
                        opacity: 0.6;
                    }
                    30% {
                        transform: translate(30%, -15%) scale(1.3);
                        opacity: 0.4;
                    }
                    60% {
                        transform: translate(-30%, -10%) scale(1.0);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(0%, 30%) scale(0.9);
                        opacity: 0.6;
                    }
                }

                @keyframes fluid-wave-4 {
                    0% {
                        transform: translate(-15%, -25%) scale(1.1);
                        opacity: 0.4;
                    }
                    40% {
                        transform: translate(25%, 15%) scale(0.85);
                        opacity: 0.6;
                    }
                    80% {
                        transform: translate(-5%, 25%) scale(1.25);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(-15%, -25%) scale(1.1);
                        opacity: 0.4;
                    }
                }
            `}</style>
        </div>
    );
};

export default Ships;