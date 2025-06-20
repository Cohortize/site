import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useRef} from "react";
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'
gsap.registerPlugin(useGSAP, ScrollTrigger)
const Path = () => {
    const main = useRef(null);

    useGSAP(() => {
        const firstSection = document.getElementById('first-section');
        const secondSection = document.getElementById('second-section');
        const firstBox = document.getElementById('first-box');
        const secondBox = document.getElementById('second-box')
        const thirdSection = document.getElementById('third-section')
        gsap.to(firstSection,
            {
                border: '1px white solid',
                scrollTrigger:{
                    trigger: firstSection,
                    scrub: false,
                }
            }
        )
        gsap.to(firstBox, {
            y: 200,
            duration: 2,
            backgroundColor:'red',
            scrollTrigger: {
                trigger: firstBox,
                start: 'bottom bottom',
                end: 'top 20%',
                scrub: false,
            },
        });
        gsap.to(secondSection,
            {
                border:'1px white solid',
                scrollTrigger:{
                    trigger: secondSection,
                    scrub: false,
                }
                
            }
        )
        gsap.to(secondBox,{
            y: 200,
            duration: 2,
            backgroundColor:'red',
            scrollTrigger:{
                trigger: secondBox,
                start: 'bottom bottom',
                end: 'top 20%',
                scrub: false,
            }
        })

        gsap.to(thirdSection,{
            border: '1px white solid',
            scrollTrigger:{
                trigger: thirdSection,
                scrub: false,
            }
        })
    }, { scope: main });
    return (
        <div className="min-h-screen w-full bg-black flex items-center px-4 sm:px-8 lg:px-16 xl:px-20 py-8 sm:py-16">
            <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-col gap-0 sm:gap-0 lg:gap-0 xl:gap-0 justify-center items-center">
                <div id="first-section" className="w-full max-w-4xl flex flex-row border border-white/20">
                    <div className="h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-1/2 border-r border-white/20 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-start">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Ship your <span className="text-[#fbcaca]">projects</span>
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base leading-relaxed">
                            Millions of developers make thousands of projects every day, so there is a high chance that your project gets ignored even after having the potential, <span className="text-red-400">don't</span> let it happen.
                        </p>
                    </div>
                    <div className="h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-1/2 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-start">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Find other <span className="text-[#fbcaca]">makers</span>
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base leading-relaxed">
                            There are tons of makers around the world who want to make things but refrain because of not having all the knowledge about it.
                        </p>
                    </div>
                </div>
                <div className="h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-full max-w-4xl flex justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5">
                    <div id="first-box" className="text-center bg-red-50 h-8 w-8">
                    </div>
                </div>
                <div id="second-section" className="h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-full max-w-4xl border border-white/20 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="text-center">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Collaborate with others
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base leading-relaxed">
                            Collaborate with other makers
                        </p>
                    </div>
                </div>
                <div className="h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-full max-w-4xl flex justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5">
                    <div id="second-box" className="text-center h-8 w-8 bg-red-50">
                    </div>
                </div>
                <div id="third-section" className="h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-full max-w-4xl border border-white/20 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="text-center">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Make magic
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base leading-relaxed">
                            Ship Magic
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Path;