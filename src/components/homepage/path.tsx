import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, //useState,
     useEffect } from "react"; 
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/src/all"; 

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

import Xarrow, { Xwrapper } from 'react-xarrows';
/*
interface PathColors {
    first: string;
    second: string;
    third: string;
}

interface AnimatedBoxesState {
    ship: boolean;
    find: boolean;
    collaborate: boolean;
    magic: boolean;
}
*/
const Path: React.FC = () => {
    const main = useRef<HTMLDivElement>(null); 
    /*const [pathColors, setPathColors] = useState<PathColors>({ 
        first: "rgba(255,255,255,0.3)",
        second: "rgba(255,255,255,0.3)", 
        third: "rgba(255,255,255,0.3)"
    });*/
    function fourthSectionLit(){
        const thirdBox = document.getElementById('collaborate')
        const fourthBox = document.getElementById('magic')
        if(thirdBox && fourthBox){
            gsap.to(thirdBox,
            {
                borderColor: 'rgba(255,255,255,0.3)',
                duration: 0.5,
                ease: 'power2.out',
            }
            );
            gsap.to(fourthBox,{
                borderColor : 'rgba(255,255,255,1)',
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger : {
                    trigger: fourthBox,
                    scrub: false,
                    start: 'top bottom-=100',
                    end: 'bottom top+=100',

                }
            });
        }
    }
    function secondSectionLit() {
        const firstBox = document.getElementById('ship')
        const secondBox = document.getElementById('find')
        if(secondBox && firstBox)
        {
            gsap.to(secondBox,{
                borderColor: 'rgba(255,255,255,1)',
                duration: 0.5,
                ease: "power2.out",
                onComplete: thirdSectionLit,
            });
            gsap.to(firstBox, {
                borderColor: 'rgba(255,255,255, 0.3)',
                duration: 0.5,
                ease: "power2.out",
            });
        }
    }

    function thirdSectionLit(){
        const secondBox = document.getElementById('find')
        const thirdBox = document.getElementById('collaborate')
        if(secondBox && thirdBox){
            gsap.to(secondBox, {
                borderColor: 'rgba(255,255,255,0.3)',
                duration: 0.5,
                ease: "power2.out",
                onComplete : fourthSectionLit,
            }
            );
            gsap.to(thirdBox,{
                borderColor: 'rgba(255,255,255,1)',
                duration: 0.5,
                ease: "power2.out",
            })
        }
    }
    useEffect(() => {
        let timeoutId: NodeJS.Timeout; 

        const initializeAnimations = () => {
            const firstBox = document.getElementById('ship') as HTMLElement | null;
            const secondBox = document.getElementById('find') as HTMLElement | null;
            const thirdBox = document.getElementById('collaborate') as HTMLElement | null;
            const fourthBox = document.getElementById('magic') as HTMLElement | null;
            
            console.log('Elements found:', {
                firstBox: !!firstBox,
                secondBox: !!secondBox,
                thirdBox: !!thirdBox,
                fourthBox: !!fourthBox
            });
            
            if(!firstBox || !secondBox || !thirdBox || !fourthBox){
                console.log('Some elements not found, animation skipped');
                return; 
            }
            gsap.to(firstBox, {
                borderColor: 'rgba(255,255,255,1)',
                duration: 0.5,
                ease: 'power2.out',
                onComplete: secondSectionLit,
                scrollTrigger :{
                    trigger: firstBox,
                    scrub: false,
                    start: 'top bottom-=100',
                    end: 'bottom top+=100',
                }
            })

        };

        timeoutId = setTimeout(initializeAnimations, 100); 

        return () => {
            clearTimeout(timeoutId);
            ScrollTrigger.getAll().forEach(st => st.kill()); 
        };
    }, []); 


    return (
        <div ref={main} className="path-section min-h-screen w-full bg-black flex items-center px-4 sm:px-8 lg:px-16 xl:px-20 py-8 sm:py-16">
            <div className="w-screen mx-auto flex flex-col lg:flex-col gap-8 sm:gap-12 md:gap-8 lg:gap-0 xl:gap-0 justify-center items-center">
                <div id="first-section" className="flex flex-row transition-all duration-500 ease-out w-full h-48 sm:h-56 md:h-48 lg:h-60 p-0.5 justify-start">
                    <div id="ship" className="bg-black border border-[rgba(255,255,255,0.3)] rounded-2xl w-44 xs:w-48 sm:w-56 md:w-60 lg:w-1/4 xl:w-1/4 aspect-square lg:aspect-auto p-2 xs:p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col justify-start lg:mx-0">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Ship your <span className="text-[#fbcaca]">projects</span>
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-[0.9rem] leading-relaxed">
                            Millions of developers make thousands of projects every day, so there is a high chance that your project gets ignored even after having the potential, <span className="text-red-400">don't</span> let it happen.
                        </p>    
                    </div>
                </div>
                
                <div className="h-48 sm:h-56 md:h-52 lg:h-60 w-full flex justify-end lg:justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 relative">
                    <div id="find" className="border border-[rgba(255,255,255,0.3)] rounded-2xl w-44 xs:w-48 sm:w-56 md:w-60 lg:w-1/4 xl:w-1/4 aspect-square lg:aspect-auto p-2 xs:p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col justify-start bg-black">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Find other <span className="text-[#fbcaca]">makers</span>
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-[0.9] leading-relaxed">
                            There are tons of makers around the world who want to make things but refrain because of not having all the knowledge about it.
                        </p>
                    </div>
                </div>
                
                <div id="second-section" className="h-48 sm:h-56 md:h-52 lg:h-60 w-full flex justify-start lg:justify-end md:justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 relative">
                    <div id="collaborate" className="border border-[rgba(255,255,255,0.3)] rounded-2xl w-44 xs:w-48 sm:w-56 md:w-60 lg:w-1/4 xl:w-1/4 aspect-square lg:aspect-auto p-2 xs:p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col justify-start bg-black lg:mx-0">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Collaborate with others
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-[0.9] leading-relaxed">
                            Collaborate with other makers
                        </p>
                    </div>
                </div>
                
                <div id="third-section" className="h-48 sm:h-56 md:h-52 lg:h-60 w-full flex justify-end md:justify-start lg:justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 relative">
                    <div id="magic" className="border border-[rgba(255,255,255,0.3)] rounded-2xl w-44 xs:w-48 sm:w-56 md:w-60 lg:w-1/4 xl:w-1/4 aspect-square lg:aspect-auto p-2 xs:p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col justify-start bg-black">
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
                <Xarrow start={'ship'} end={'collaborate'} 
                //color={pathColors.first} 
                strokeWidth={2} showHead={false} color="rgba(255,255,255,0.3)" startAnchor={"bottom"} path="grid" SVGcanvasProps={{id:"first-path"}}/>
                <Xarrow start={'find'} end={'collaborate'} 
                //color={pathColors.second} 
                strokeWidth={2} color="rgba(255,255,255,0.3)" showHead={false} endAnchor={"top"} path="grid" SVGcanvasProps={{id:"second-path"}}/>
                <Xarrow start={'collaborate'} end={'magic'} 
                //color={pathColors.third} 
                strokeWidth={1.5} color="rgba(255,255,255,0.3)" showHead={false} startAnchor={"bottom"} path="grid" SVGcanvasProps={{id:"third-path"}}/>
            </Xwrapper>
        </div>
    );
};

export default Path;