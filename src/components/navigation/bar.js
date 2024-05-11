'use client'
import { useState, useEffect, useRef, useLayoutEffect, forwardRef } from "react";
import { getCartLength } from "@/lib/cart";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useAppContext } from "@/lib/context";
import { Logo } from "@/assets/svg/logo";
import { LogoFull } from "@/assets/svg/logoFull";
import { LogoFullRotate } from "@/assets/svg/logoFullRotate";
import { Nav } from "./nav";

gsap.registerPlugin(ScrollTrigger);

export const NavigationBar = forwardRef(({ position }, barRef) => {

    const containerRef = useRef();
    const imageRef = useRef();

    const logoRefHorizontal = useRef();
    const logoRefVertical = useRef();

    const [cartLength, setCartLength] = useState(null);
    const [imageHeight, setImageHeight] = useState(null);

    const { height, setHeight } = useAppContext();

    useEffect(() => {

        const updateCartLength = () => setCartLength(getCartLength());
        updateCartLength();

        // const container = containerRef.current;
        // const image = imageRef.current;

        // const tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: image,
        //         start: 'top top',
        //         end: 'bottom top',
        //         scrub: true
        //     },
        // });

        // tl.to(image, {
        //     y: '-18vh'
        // });

        // const tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: container,
        //         start: 'top top',
        //         end: 'bottom top',
        //         scrub: true
        //     },
        // });

        // tl.to(container, {
        //     height: '20rem'
        // });

        // window.addEventListener('storage_new_item', updateCartLength);

        // return () => {
        //     removeEventListener('storage_new_item', updateCartLength);
        //     tl.kill();
        // };

    }, []);

    // useLayoutEffect(() => {

    //     const container = containerRef.current;

    //     const resizeObserver = new ResizeObserver(() => {

    //         setHeight(container.offsetHeight);
    //         window.dispatchEvent(new Event('navbar_resize'));

    //     });

    //     resizeObserver.observe(container);

    //     return () => {
    //         resizeObserver.disconnect();
    //     };

    // }, []);

    useEffect(() => {

        const container = containerRef.current;

        // const tlContainer = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: container,
        //         start: 'top top',
        //         end: '+=300%',
        //         scrub: true
        //     },
        // });

        // tlContainer.to(container, {
        //     zIndex: '10'
        // });

        const logoHorizontal = logoRefHorizontal.current;
        const logoVerical = logoRefVertical.current;

        const tlContainer = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                bottom: 'bottom top',
                scrub: true
            },
        });

        tlContainer.to(container, {
            backgroundColor: '#fff',
        });

        // const tlLogoHorizontal = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: container,
        //         start: 'top top',
        //         end: 'bottom top',
        //         scrub: true
        //     },
        // });

        // tlLogoHorizontal.to(logoHorizontal, {
        //     fill: '#4834d4'
        // });

        const tlLogoVerical = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
        });

        tlLogoVerical.to(logoVerical, {
            fill: '#4834d4'
        });

        return () => {
            // tlContainer.kill(); 
            tlContainer.kill();
            // tlLogoHorizontal.kill();
            tlLogoVerical.kill();

        };

    }, []);

    return (

        // <div ref={containerRef} className="h-auto w-full flex items-center justify-between uppercase fixed bg-red-500">
        <div ref={barRef} className="h-auto w-full">
            <div ref={containerRef} className={`h-screen w-full flex flex-col items-center justify-between uppercase relative bg-primary-blue`}>

                {/* <Logo style={{ position: position, pointerEvents: "none" }} color='#4834d4' /> */}

                <div className="w-full p-0 fixed z-10 xs:block hidden">
                    <Logo ref={logoRefVertical} className={`${position} pointer-events-none`} />
                    {/* <Logo style={{ position: position, pointerEvents: "none" }} color='#000' /> */}
                    {/* <img ref={imageRef} className="pointer-events-none w-full z-10" src="/images/longitude_handwriting_full.svg" alt="" /> */}
                    {/* <img className="pointer-events-none w-full text-white" src="/images/longitude_handwriting.svg" alt="" /> */}
                </div>

                <div className="w-full h-full p-0 fixed z-10 xs:hidden flex justify-center items-center">
                    <LogoFullRotate ref={logoRefHorizontal} className={`${position} pointer-events-none h-[80vh]`} />
                    {/* <Logo style={{ position: position, pointerEvents: "none" }} color='#000' /> */}
                    {/* <img ref={imageRef} className="pointer-events-none w-full z-10" src="/images/longitude_handwriting_full.svg" alt="" /> */}
                    {/* <img className="pointer-events-none w-full text-white" src="/images/longitude_handwriting.svg" alt="" /> */}
                </div>

                <Nav />

            </div>
        </div>

    );

});