'use client'
import { useAppContext } from "@/lib/context";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { getCartLength } from "@/lib/cart";
import { client } from "@/lib/sanity/client";
import { useAuthContext } from "@/lib/context/AuthContext";
import { usePathname } from "next/navigation";
import { HamburgerIcon } from "./Hamburger/HambugerIcon";
import { HamburgerMenu } from "./Hamburger/HamburgerMenu";

export const PageLayout = ({ children, category }) => {

    const navbarRef = useRef();
    const pathname = usePathname();

    const [layout, setLayout] = useState({
        navbar: {
            width: 0,
            height: 0
        },
        categorySection: {
            isVisible: category,
            categories: null,
        },
        profileNavigation: {
            isVisible: pathname.startsWith('/my-account'),
            pages: ['overview']
        },
        gridColumns: null
    });
    const [cartLength, setCartLength] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [sidePanel, setSidePanel] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const { user } = useAuthContext();
    const { height, setHeight } = useAppContext();

    useLayoutEffect(() => {

        if (navbarRef.current) {

            setLayout(previous => ({
                ...previous, navbar: {
                    width: navbarRef.current.offsetWidth,
                    height: navbarRef.current.offsetHeight - 8
                }
            }));

            console.log(navbarRef.current.offsetHeight + 24)

            setHeight(navbarRef.current.offsetHeight - 8);

        };

    }, []);

    useEffect(() => {

        const updateCart = () => {

            setCartLength(getCartLength());

        };

        const getCategories = async () => {

            const CATEGORY_QUERY = `*[_type == "category"]`;
            const res = await client.fetch(CATEGORY_QUERY);
            setLayout(previous => ({ ...previous, categorySection: { ...previous.categorySection, categories: res.map(category => category.title) } }));

        };

        getCategories();

        setLayout(previous => ({ ...previous, gridColumns: localStorage.getItem('gridcols') || 3 }));
        setCartLength(getCartLength());

        window.addEventListener('storage_new_item', updateCart);
        return () => removeEventListener('storage_new_item', updateCart);

    }, []);

    useEffect(() => {

        if (user) setAuthenticated(true);

    }, [user]);

    const handleGridChange = () => {

        let newNumber = layout.gridColumns == 3 ? 2 : 3;

        setLayout(previous => ({ ...previous, gridColumns: newNumber }));
        localStorage.setItem('gridcols', newNumber);
        window.dispatchEvent(new Event('grid_change'));

    };

    return (

        <main className="h-auto w-full relative">

            {/* <div className="h-screen w-full absolute flex items-center justify-center">
                <img className="h-36 z-30 fixed opacity-50" src="/images/logo.svg" alt="" />
            </div> */}

            <div style={{ paddingTop: `${layout.navbar.height}px` }} className={`h-auto w-full absolute ${mobileMenu && 'blur-lg'}`}>

                {children}

                <footer className="h-auto w-full border-t-[1px] border-neutral-200 grid grid-cols-3">

                    <div className="w-full h-auto flex justify-center border-r-[1px] border-neutral-200 p-4">
                        <div className="h-full w-full py-2 px-4 bg-neutral-200 flex items-center">
                            <input className="h-full w-full font-helvetica text-sm bg-transparent focus:outline-none" type="text" placeholder="E-MAIL" />
                        </div>
                    </div>

                    <div className="col-span-2 flex flex-col items-end justify-center font-helvetica text-xs uppercase p-4 space-y-1">

                        <a href="/">policies</a>
                        <a href="/">socials</a>
                        <a href="/">about</a>

                    </div>

                </footer>

            </div>


            <div className="h-auto w-full fixed p-2" ref={navbarRef}>

                <div className="h-full w-full flex flex-col justify-between">

                    <div className="">
                        <div className={`h-auto w-full bg-white py-2 grid grid-cols-3 border-[1px] border-neutral-200 ${layout.categorySection.isVisible ? 'rounded-t' : 'rounded'}`}>

                            <div className="2md:flex hidden items-center space-x-4 uppercase font-helvetica text-xs pl-8">
                                <a href="/shop">shop</a>
                                <a>women</a>
                                <a>men</a>

                            </div>

                            <div className="h-full 2md:hidden flex items-center pl-2">
                                <HamburgerIcon action={() => setMobileMenu(!mobileMenu)} size='4xl' />
                            </div>

                            <div className="flex items-center justify-center">
                                {/* <img className="h-14" src="/images/logo-shape.svg" alt="" /> */}
                                {/* <img className="h-10" src="/images/longitude__ppsans.svg" alt="" /> */}
                                <p className="uppercase font-helvetica75 2md:text-6xl sm:text-5xl text-3xl">longitude</p>
                            </div>

                            <div className="flex items-center justify-end space-x-4 uppercase font-helvetica text-xs sm:pr-8 pr-2">
                                <a className="2md:block hidden">search</a>
                                {authenticated ? <a href="/my-account/overview" className="2md:block hidden">my account</a> : <a href="/account/login" className="2md:block hidden">login</a>}
                                <a href="/cart">cart: {cartLength}</a>
                            </div>

                        </div>

                        <HamburgerMenu active={mobileMenu} />

                        <div className={`w-full h-auto bg-white xs:px-8 px-4 py-4 border-x-[1px] border-b-[1px] rounded-b border-neutral-200 flex justify-between ${mobileMenu ? 'hidden' : layout.categorySection.isVisible ? 'flex' : 'hidden'}`}>

                            <div className='space-x-4'>
                                {layout.categorySection.categories?.map((category) => (
                                    <a className="font-helvetica uppercase text-xs">{category}</a>
                                ))}
                            </div>

                            <button onClick={handleGridChange} className="font-helvetica uppercase text-xs lg:block hidden">view 1/{layout.gridColumns}</button>

                        </div>

                        <ProfileNavigation pages={layout.profileNavigation.pages} visible={mobileMenu ? false : layout.profileNavigation.isVisible ? true : false} pathname={pathname} />

                    </div>

                    {/* <div className="w-full h-10 bg-white rounded border-[1px] border-neutral-200">

                    </div> */}

                </div>

            </div>

        </main>

    );

};

function ProfileNavigation({ pages, visible, pathname }) {

    return (

        <div className={`w-full h-auto bg-white xs:px-8 px-4 border-x-[1px] border-b-[1px] border-neutral-200 justify-between ${visible ? 'flex' : 'hidden'}`}>

            <div className="space-x-4">
                {pages.map((page) => (
                    <a href={`/my-account/${page}`} className={`font-helvetica uppercase text-xs ${pathname !== `/my-account/${page}` ? 'text-neutral-400' : ''}`}>{page}</a>
                ))}
            </div>

            <button className="font-helvetica uppercase text-xs">log out</button>

        </div>

    );

};