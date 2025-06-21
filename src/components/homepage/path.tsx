import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { MotionPathPlugin } from "gsap/src/all";
gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin)

const Path = () => {
    const [firstDone, setFirstDone] = useState(false)
    const [pathDimensions, setPathDimensions] = useState({ firstPath: '', secondPath: '' });
    const main = useRef<HTMLDivElement>(null);
    const [firstScrolled, setFirstScrolled] = useState(false)
    const [firstAnimationTriggered, setFirstAnimationTriggered] = useState(false)
    const firstScrollTriggerRef = useRef<ScrollTrigger | null>(null);
    
    function secondSectionLit(){
        const secondSection = document.getElementById('second-section');
        const firstSection = document.getElementById('first-section')
        const box = document.getElementById('first-box')
        const firstPath = document.getElementById('first-path')
        
        if(secondSection && firstSection && box && firstPath){
            gsap.to(secondSection, {
                borderColor: 'rgba(255, 255, 255, 1)',
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(firstSection, {
                borderColor: 'rgba(58, 58, 58, 1)',
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(box, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const pathElement = firstPath.querySelector('path');
            if (pathElement) {
                gsap.to(pathElement, {
                    stroke: "rgba(255, 255, 255, 0.3)",
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
            setFirstDone(true)
        }
    }
    
    function thirdSectionLit(){
        const thirdSection = document.getElementById('third-section')
        const secondSection = document.getElementById('second-section')
        const box = document.getElementById('second-box')
        const secondPath = document.getElementById('second-path')
        
        if (thirdSection && secondSection && box && secondPath){
            gsap.to(thirdSection, {
                borderColor: 'rgba(255, 255, 255, 1)',
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(secondSection, {
                borderColor: 'rgba(58, 58, 58, 1)',
                duration: 0.5,
                ease: "power2.out"
            });
            
            gsap.to(box, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const pathElement = secondPath.querySelector('path');
            if (pathElement) {
                gsap.to(pathElement, {
                    stroke: "rgba(255, 255, 255, 0.3)",
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }
    }
    
    function firstPathLit(){
        if (firstAnimationTriggered) return;
        
        const firstSection = document.getElementById('first-section')
        const firstPath = document.getElementById('first-path')
        
        if(firstSection && firstPath){
            gsap.to(firstSection, {
                borderColor: 'rgba(255, 255, 255, 1)',
                duration: 0.5,
                ease: "power2.out"
            });
            
            const pathElement = firstPath.querySelector('path');
            if (pathElement) {
                gsap.to(pathElement, {
                    stroke: "rgba(255, 255, 255, 0.9)",
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
            setFirstAnimationTriggered(true);
            if (firstScrollTriggerRef.current) {
                firstScrollTriggerRef.current.kill();
                firstScrollTriggerRef.current = null;
            }
        }
    }
    
    function secondPathLit(){
        const secondPath = document.getElementById('second-path')
        if(secondPath){
            const pathElement = secondPath.querySelector('path');
            if (pathElement) {
                gsap.to(pathElement, {
                    stroke: "rgba(255, 255, 255, 0.9)",
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }
    }
    
    const updatePathDimensions = () => {
        const firstSection = document.getElementById('first-section') as HTMLElement | null;
        const secondSection = document.getElementById('second-section') as HTMLElement | null;
        const thirdSection = document.getElementById('third-section') as HTMLElement | null;
        const firstBox = document.getElementById('first-box') as HTMLElement | null;
        const secondBox = document.getElementById('second-box') as HTMLElement | null;
        
        if (!firstSection || !secondSection || !thirdSection || !firstBox || !secondBox) {
            return;
        }
        
        const getBoxTravelDistance = (fromSection: HTMLElement, toSection: HTMLElement): number => {
            const fromRect = fromSection.getBoundingClientRect();
            const toRect = toSection.getBoundingClientRect();
            return toRect.top - fromRect.bottom;
        };
        
        const createResponsiveMotionPath = (distance: number): string => {
            const quarterDistance = distance / 4;
            return `M0,0 Q10,${quarterDistance} 0,${quarterDistance * 2} Q-10,${quarterDistance * 3} 0,${distance}`;
        };
        
        const firstBoxDistance = getBoxTravelDistance(firstSection, secondSection);
        const secondBoxDistance = getBoxTravelDistance(secondSection, thirdSection);
        
        const firstMotionPath = createResponsiveMotionPath(firstBoxDistance);
        const secondMotionPath = createResponsiveMotionPath(secondBoxDistance);
        
        setPathDimensions({
            firstPath: firstMotionPath,
            secondPath: secondMotionPath
        });
    };
    
    useEffect(() => {
        const timer = setTimeout(updatePathDimensions, 500);
        const handleResize = () => {
            setTimeout(updatePathDimensions, 100);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useGSAP(() => {
        const firstSection = document.getElementById('first-section') as HTMLElement | null;
        const firstBox = document.getElementById('first-box') as HTMLElement | null;
        const secondBox = document.getElementById('second-box') as HTMLElement | null;
        const thirdSection = document.getElementById('third-section') as HTMLElement | null;
        const secondSection = document.getElementById('second-section') as HTMLElement | null;
        const firstPath = document.getElementById('first-path') as HTMLElement | null;
        if (!firstSection || !secondSection || !firstBox || !secondBox || !thirdSection || !firstPath) {
            return;
        }
        
        const getBoxTravelDistance = (fromSection: HTMLElement, toSection: HTMLElement): number => {
            const fromRect = fromSection.getBoundingClientRect();
            const toRect = toSection.getBoundingClientRect();
            return toRect.top - fromRect.bottom;
        };
        
        const createResponsiveMotionPath = (distance: number): string => {
            const quarterDistance = distance / 4;
            return `M0,0 Q10,${quarterDistance} 0,${quarterDistance * 2} Q-10,${quarterDistance * 3} 0,${distance}`;
        };
        
        if(!firstScrolled){
            gsap.set(firstSection, { borderColor: 'rgba(255, 255, 255, 0.2)' });
            setFirstScrolled(true)
            if (!firstAnimationTriggered) {
                firstScrollTriggerRef.current = ScrollTrigger.create({
                    trigger: firstSection,
                    onEnter: firstPathLit,
                    scrub: false,
                });
            }
        }
        
        const firstBoxDistance = getBoxTravelDistance(firstSection, secondSection);
        const firstMotionPath = createResponsiveMotionPath(firstBoxDistance);
        
        gsap.to(firstBox, {
            motionPath: {
                path: firstMotionPath,
                autoRotate: true,
            },
            duration: 2,
            onComplete: secondSectionLit,
            backgroundColor: 'red',
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: firstBox,
                start: 'top bottom-=100',
                end: 'bottom top+=100',
                scrub: false,
                onEnter: () => {
                }
            },
        }); 
        
        const handleResize = (): void => {
            ScrollTrigger.refresh();
            
            const newFirstBoxDistance = getBoxTravelDistance(firstSection, secondSection);
            const newFirstMotionPath = createResponsiveMotionPath(newFirstBoxDistance);
            
            const newSecondBoxDistance = getBoxTravelDistance(secondSection, thirdSection);
            const newSecondMotionPath = createResponsiveMotionPath(newSecondBoxDistance);
  
            gsap.set(firstBox, { motionPath: { path: newFirstMotionPath } });
            gsap.set(secondBox, { motionPath: { path: newSecondMotionPath } });
            setPathDimensions({
                firstPath: newFirstMotionPath,
                secondPath: newSecondMotionPath
            });
        };
        
        window.addEventListener('resize', handleResize);
        
        return (): void => {
            window.removeEventListener('resize', handleResize);
            if (firstScrollTriggerRef.current) {
                firstScrollTriggerRef.current.kill();
                firstScrollTriggerRef.current = null;
            }
        };
        
    }, { scope: main, dependencies: [firstAnimationTriggered] });
    
    useGSAP(() => {
        if (!firstDone) return;
        
        const secondBox = document.getElementById('second-box') as HTMLElement | null;
        const thirdSection = document.getElementById('third-section') as HTMLElement | null;
        const secondSection = document.getElementById('second-section') as HTMLElement | null;
        
        if (!secondBox || !thirdSection || !secondSection) {
            return;
        }
        
        const getBoxTravelDistance = (fromSection: HTMLElement, toSection: HTMLElement): number => {
            const fromRect = fromSection.getBoundingClientRect();
            const toRect = toSection.getBoundingClientRect();
            return toRect.top - fromRect.bottom;
        };
        
        const createResponsiveMotionPath = (distance: number): string => {
            const quarterDistance = distance / 4;
            return `M0,0 Q10,${quarterDistance} 0,${quarterDistance * 2} Q-10,${quarterDistance * 3} 0,${distance}`;
        };
        
        const secondBoxDistance = getBoxTravelDistance(secondSection, thirdSection);
        const secondMotionPath = createResponsiveMotionPath(secondBoxDistance);
        
        gsap.to(secondBox, {
            motionPath: {
                path: secondMotionPath,
                autoRotate: true,
            },
            duration: 2,
            backgroundColor: 'red',
            onStart: secondPathLit,
            onComplete: thirdSectionLit,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: secondBox,
                start: 'top bottom-=100',
                end: 'bottom top+=100',
                scrub: false,
            },
        });
        
    }, { scope: main, dependencies: [firstDone] });
    
    return (
        <div ref={main} className="min-h-screen w-full bg-black flex items-center px-4 sm:px-8 lg:px-16 xl:px-20 py-8 sm:py-16">
            <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-col gap-0 sm:gap-0 lg:gap-0 xl:gap-0 justify-center items-center">
                <div id="first-section" className="rounded-2xl w-full max-w-4xl flex flex-row border border-white/20 transition-all duration-500 ease-out">
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
                <div className="h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-full max-w-4xl flex justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 relative">
                    <svg id="first-path"
                        className="absolute pointer-events-none" 
                        style={{ 
                            left: '50%', 
                            top: '0',
                            transform: 'translateX(-50%)',
                            zIndex: 0,
                            overflow: 'visible'
                        }}
                        width="40"
                        height="100%"
                    >
                        <path
                            d={pathDimensions.firstPath}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="1"
                            strokeDasharray="4 2"
                            strokeLinecap="round"
                            transform="translate(20, 0)"
                            style={{
                                transition: 'stroke 0.5s ease-out'
                            }}
                        />
                    </svg>
                    <div id="first-box" className="z-1 text-center bg-red-50 h-8 w-8 relative transition-opacity duration-300 ease-out">
                    </div>
                </div>
                <div id="second-section" className="rounded-2xl z-99 h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-full max-w-4xl border border-white/20 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-black transition-all duration-500 ease-out">
                    <div className="text-center">
                        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] font-medium mb-2 sm:mb-3 md:mb-4">
                            Collaborate with others
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base leading-relaxed">
                            Collaborate with other makers
                        </p>
                    </div>
                </div>
                <div className="h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-full max-w-4xl flex justify-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 relative">
                    <svg id="second-path"
                        className="absolute pointer-events-none" 
                        style={{ 
                            left: '50%', 
                            top: '0',
                            transform: 'translateX(-50%)',
                            zIndex: 0,
                            overflow: 'visible'
                        }}
                        width="40"
                        height="100%"
                    >
                        <path
                            d={pathDimensions.secondPath}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="1"
                            strokeDasharray="4 2"
                            strokeLinecap="round"
                            transform="translate(20, 0)"
                            style={{
                                transition: 'stroke 0.5s ease-out'
                            }}
                        />
                    </svg>
                    <div id="second-box" className="z-1 text-center h-8 w-8 bg-red-50 relative transition-opacity duration-300 ease-out">
                    </div>
                </div>
                <div id="third-section" className="rounded-2xl z-99 h-auto min-h-32 sm:min-h-48 md:min-h-56 lg:min-h-60 w-full max-w-4xl border border-white/20 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-black transition-all duration-500 ease-out">
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