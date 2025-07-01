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
                        className="h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 xl:h-[28rem] xl:w-[28rem] rounded-3xl shadow-2xl shadow-pink-500/20"
                        style={{
                            background: `conic-gradient(from 180deg at 50% 50%, 
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
                            filter: 'brightness(1.1) saturate(1.2)',
                        }}
                    >

                        <div 
                            className="h-full w-full rounded-3xl"
                            style={{
                                background: `radial-gradient(circle at 30% 40%, 
                                    rgba(255, 255, 255, 0.2) 0%, 
                                    rgba(255, 20, 147, 0.1) 50%, 
                                    transparent 70%
                                )`
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ships;