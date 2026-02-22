"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/logo/stl-logo-dark.png";
import ThemeToggle from "../ui/ThemeToggle";
import { useEffect, useState } from "react";
import AuthenticationModal from "../pages/Authentication/AuthenticationModal";
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <nav
            className={`glass-effect backdrop-blur-3xl sticky
         top-0 z-50 ${scrolled ? "py-1 transition-all duration-500" : "py-3"}`}>
            <div className='container flex items-center justify-between'>
                <Link href='/'>
                    <Image src={logo} alt='Logo' className='w-24' />
                </Link>
                <div className='flex items-center gap-4'>
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpenAuthModal(!isOpenAuthModal)}
                        className='px-5 py-2 gap-2 font-semibold cursor-pointer hover:bg-primary hover:text-white rounded-xl border border-text/30 duration-300'>
                        Login
                    </button>
                    {/* <Avatar
                        className='cursor-pointer'
                        // style={{ backgroundColor: "#87d068" }}
                        icon={<FaRegCircleUser className='text-4xl' />}
                    /> */}
                </div>
            </div>
            <AuthenticationModal
                isOpenAuthModal={isOpenAuthModal}
                setIsOpenAuthModal={setIsOpenAuthModal}
            />
        </nav>
    );
};

export default Navbar;
