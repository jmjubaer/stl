"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/logo/stl-logo-dark.png";
import ThemeToggle from "../ui/ThemeToggle";
import { useEffect, useRef, useState } from "react";
import AuthenticationModal from "../pages/Authentication/AuthenticationModal";
import { Avatar } from "antd";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import ProfileModal from "../pages/Authentication/ProfileModal";
const Navbar = () => {
    const userOptionRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    const [isOpenUserOption, setIsOpenUserOption] = useState(false);
    const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);

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
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                userOptionRef.current &&
                !userOptionRef.current.contains(e.target as Node)
            ) {
                setIsOpenUserOption(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, []);
    console.log(isOpenAuthModal);
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

                    <div className='relative' ref={userOptionRef}>
                        <Avatar
                            onClick={() => setIsOpenUserOption((prev) => !prev)}
                            className='cursor-pointer'
                            // style={{ backgroundColor: "#87d068" }}
                            icon={<FaRegCircleUser className='text-4xl' />}
                        />
                        {isOpenUserOption && (
                            <div
                                className={`bg-background absolute rounded-lg shadow-lg p-1 w-40 z-10 border border-text/30 top-10 right-0`}>
                                <button
                                    onClick={() => {
                                        setIsOpenProfileModal((prev) => !prev);
                                        setIsOpenUserOption(false)
                                    }}
                                    className='w-full text-left p-2 hover:bg-primary hover:text-white/90 rounded-md cursor-pointer text-sm flex items-center gap-2'>
                                    <FaUser className='text-xl' /> Profile
                                </button>{" "}
                                <button
                                    // onClick={() =>
                                    //     setIsOpenUserOption(!isOpenUserOption)
                                    // }
                                    className='w-full text-left p-2 hover:bg-primary hover:text-white/90 rounded-md cursor-pointer text-sm flex items-center gap-2'>
                                    <CiLogout className='text-xl' /> Log Out
                                </button>{" "}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AuthenticationModal
                isOpenAuthModal={isOpenAuthModal}
                setIsOpenAuthModal={setIsOpenAuthModal}
            />
            <ProfileModal
                isOpenProfileModal={isOpenProfileModal}
                setIsOpenProfileModal={setIsOpenProfileModal}
            />
        </nav>
    );
};

export default Navbar;
