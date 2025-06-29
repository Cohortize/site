import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { MotionPathPlugin } from "gsap/src/all";
gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin)
import Xarrow, { Xwrapper} from 'react-xarrows'

const Path = () => {
    const main = useRef(null);
    const [pathColors, setPathColors] = useState({
        first: "rgba(255,255,255,0.3)",
        second: "rgba(255,255,255,0.3)", 
        third: "rgba(255,255,255,0.3)"
    });
    
    useGSAP(() => {
        const timer = setTimeout(() => {
            const firstBox = document.getElementById('ship')
            const secondBox = document.getElementById('find')
            const thirdBox = document.getElementById('collaborate')
            const fourthBox = document.getElementById('magic')
            
            console.log('Elements found:', {
                firstBox: !!firstBox,
                secondBox: !!secondBox,
                thirdBox: !!thirdBox,
                fourthBox: !!fourthBox
            });
            
            if(!firstBox || !secondBox || !thirdBox || !fourthBox){
                console.log('Some elements not found, animation skipped');
                return
            }

         
            gsap.to(firstBox, {
                border: '1px solid rgba(255,255,255, 0.8)', 
                scale: 1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: firstBox,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false,
                    onEnter: () => console.log('Ship animation triggered'),
                }
            });

            gsap.to(secondBox, {
                border: '1px solid rgba(255,255,255, 0.8)', 
                scale: 1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: secondBox,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false,
                    onEnter: () => console.log('Find animation triggered'),
                }
            });

            gsap.to(thirdBox, {
                border: '1px solid rgba(255,255,255, 0.8)', 
                scale: 1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: thirdBox,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false,
                    onEnter: () => console.log('Collaborate animation triggered'),
                }
            });

            gsap.to(fourthBox, {
                border: '1px solid rgba(255,255,255, 0.8)',
                scale: 1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: fourthBox,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false,
                    onEnter: () => console.log('Magic animation triggered'),
                }
            });

       
            gsap.to({}, {
                scrollTrigger: {
                    trigger: thirdBox,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                    scrub: false,
                    onEnter: () => {
                        console.log('Path animations triggered');
                        
             
                        gsap.to({}, {
                            duration: 1,
                            onStart: () => {
                                setPathColors({
                                    first: "rgba(255,255,255,0.9)",
                                    second: "rgba(255,255,255,0.9)",
                                    third: "rgba(255,255,255,0.9)"
                                });
                            }
                        });
                    },
                    onLeave: () => {
                        setPathColors({
                            first: "rgba(255,255,255,0.3)",
                            second: "rgba(255,255,255,0.3)",
                            third: "rgba(255,255,255,0.3)"
                        });
                    }
                }
            });
        }, 100); 

        return () => clearTimeout(timer);
    }, { scope: main, dependencies: [] });



    return (
        <div ref={main} className="path-section min-h-screen w-full bg-black flex items-center px-4 sm:px-8 lg:px-16 xl:px-20 py-8 sm:py-16">
            <div className="w-screen mx-auto flex flex-col lg:flex-col gap-8 sm:gap-12 md:gap-8 lg:gap-0 xl:gap-0 justify-center items-center">
                <div id="first-section" className="flex flex-row transition-all duration-500 ease-out w-full h-48 sm:h-56 md:h-48 lg:h-60 p-0.5 justify-start">
                    <div id="ship" className="bg-black rounded-2xl w-44 xs:w-48 sm:w-56 md:w-60 lg:w-1/4 xl:w-1/4 aspect-square lg:aspect-auto border border-white/20 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col justify-start lg:mx-0">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Ship your <span className="text-[#fbcaca]">projects</span>
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-[0.9rem] leading-relaxed">
                            Millions of developers make thousands of projects every day, so there is a high chance that your project gets ignored even after having the potential, <span className="text-red-400">don't</span> let it happen.
                        </p>    
                    </div>
                    <div id="first-box" className="w-4 h-4 bg-white rounded-full absolute opacity-100"></div>
                </div>
                
                <div className="h-48 sm:h-56 md:h-52 lg:h-60 w-full flex justify-end lg:justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 relative">
                    <div id="find" className="border border-white/20 rounded-2xl w-44 xs:w-48 sm:w-56 md:w-60 lg:w-1/4 xl:w-1/4 aspect-square lg:aspect-auto p-2 xs:p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col justify-start bg-black">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Find other <span className="text-[#fbcaca]">makers</span>
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-[0.9] leading-relaxed">
                            There are tons of makers around the world who want to make things but refrain because of not having all the knowledge about it.
                        </p>
                    </div>
                </div>
                
                <div id="second-section" className="h-48 sm:h-56 md:h-52 lg:h-60 w-full flex justify-start lg:justify-end md:justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 relative">
                    <div id="collaborate" className="border border-white/20 rounded-2xl w-44 xs:w-48 sm:w-56 md:w-60 lg:w-1/4 xl:w-1/4 aspect-square lg:aspect-auto p-2 xs:p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col justify-start bg-black lg:mx-0">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Collaborate with others
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-[0.9] leading-relaxed">
                            Collaborate with other makers
                        </p>
                    </div>
                    <div id="second-box" className="w-4 h-4 bg-white rounded-full absolute opacity-100"></div>
                </div>
                
                <div id="third-section" className="h-48 sm:h-56 md:h-52 lg:h-60 w-full flex justify-end md:justify-start lg:justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 relative">
                    <div id="magic" className="border border-white/20 rounded-2xl w-44 xs:w-48 sm:w-56 md:w-60 lg:w-1/4 xl:w-1/4 aspect-square lg:aspect-auto p-2 xs:p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col justify-start bg-black">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Make magic
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-[0.9] leading-relaxed">
                            Ship Magic
                        </p>
                    </div>
                </div>
            </div>
            
            <Xwrapper>
                <Xarrow start={'ship'} end={'collaborate'} color={pathColors.first} strokeWidth={2} showHead={false} startAnchor={"bottom"} path="smooth" SVGcanvasProps={{id:"first-path"}}/>
                <Xarrow start={'find'} end={'collaborate'} color={pathColors.second} strokeWidth={2} showHead={false} endAnchor={"top"} path="smooth" SVGcanvasProps={{id:"second-path"}}/>
                <Xarrow start={'collaborate'} end={'magic'} color={pathColors.third} strokeWidth={1.5} showHead={false} startAnchor={"bottom"} path="smooth" SVGcanvasProps={{id:"third-path"}}/>
            </Xwrapper>
        </div>
    );
};

export default Path;