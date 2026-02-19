"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/logo/stl-logo-dark.png";
import ThemeToggle from "../ui/ThemeToggle";
import { Avatar } from "antd";
import { FaRegCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 15) {
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
                    <Avatar
                        className='cursor-pointer'
                        // style={{ backgroundColor: "#87d068" }}
                        icon={<FaRegCircleUser className='text-4xl' />}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
