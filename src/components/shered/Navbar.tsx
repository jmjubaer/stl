import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/logo/stl-logo-dark.png";
import ThemeToggle from "../ui/ThemeToggle";
import { Avatar } from "antd";
import { FaRegCircleUser } from "react-icons/fa6";
const Navbar = () => {
    return (
        <nav
            className=' py-3  glass-effect backdrop-blur-3xl'>
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
