import logo from "@/src/assets/logo/logo.png";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { LuLink, LuTag } from "react-icons/lu";
import { RiFolderAddLine } from "react-icons/ri";
import { VscFolderActive } from "react-icons/vsc";
const NonUserCard = () => {
    return (
        <div className='container flex items-center justify-center py-10'>
            <div className='w-5/12 mx-auto text-center flex items-center justify-center flex-col gap-4'>
                <Image src={logo} alt='Logo' className='w-24' />
                <h2 className='text-3xl font-semibold text-text/80'>
                    Save your favorite links
                </h2>
                <p className='text-lg font-medium'>
                    Organize, tag, and manage all your bookmarks in one place.
                    Sign in to get started.
                </p>
                <div className='flex items-center gap-5 w-full justify-center'>
                    <div className='border border-primary rounded-xl text-center py-3 w-full font-medium px-5 bg-white'>
                        <LuLink className='text-2xl mx-auto text-blue-500 mb-1' />{" "}
                        Save Link
                    </div>{" "}
                    <div className='border border-primary rounded-xl text-center py-3 w-full font-medium px-5 bg-white'>
                        <VscFolderActive className='text-2xl mx-auto text-blue-500 mb-1' />{" "}
                        Organize
                    </div>{" "}
                    <div className='border border-primary rounded-xl text-center py-3 w-full font-medium px-5 bg-white'>
                        <LuTag className='text-2xl mx-auto text-blue-500 mb-1' /> Tag
                        & Filter
                    </div>
                </div>
                <button
                    // onClick={handleOpenLinkModal}
                    className='px-5 py-2 gap-2 font-semibold w-full cursor-pointer hover:bg-primary hover:text-white rounded-xl border border-primary text-primary duration-300'>
                    Login to get started
                </button>{" "}
            </div>
        </div>
    );
};

export default NonUserCard;
