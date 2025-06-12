const Ships = () => {
    return(
    <div>
        <div className="h-screen w-full bg-black flex items-center gap-[25rem]">
            <div className="flex flex-col gap-8 w-[55rem]">
            <p className="text-white text-6xl pl-16">
                Ship your projects.
            </p>
            <p className="text-[#b8b6b6] text-[1.4rem] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[1.6rem] 2xl:text-[1.8rem] max-w-2xl xl:max-w-3xl 2xl:max-w-4xl pl-16">
                Ship your projects, show them to the whole world.
            </p>
            <p className="text-[#b8b6b6] pl-16 text-[1.1rem]">
            There are millions of developers who make thousands of projects everyday, so there is a high chance that your project goes unnoticed even after having the potential. Don't let it happen.  
            </p>
            </div>
            <div className="h-[25rem] w-[25rem] text-[#000000]" style={{backgroundImage: `
            conic-gradient(from 0deg at 50% 60%, 
                #ff00 0deg,
                #ff0040 360deg
            `,
              borderRadius:"20px"}}>
            
            </div>
        </div>
    </div>
    );
}

export default Ships