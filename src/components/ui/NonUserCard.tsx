import logo from "@/src/assets/logo/logo.png";
import { openAuthModal } from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/src/redux/hook";
import Image from "next/image";
import { LuLink, LuTag } from "react-icons/lu";
import { VscFolderActive } from "react-icons/vsc";
const NonUserCard = () => {
    const dispatch = useAppDispatch();
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
                    <div className='border rounded-xl text-center py-3 w-full font-medium px-5 bg-white dark:bg-background'>
                        <LuLink className='text-2xl mx-auto text-blue-500 mb-1' />{" "}
                        Save Link
                    </div>{" "}
                    <div className='border rounded-xl text-center py-3 w-full font-medium px-5 bg-white dark:bg-background'>
                        <VscFolderActive className='text-2xl mx-auto text-blue-500 mb-1' />{" "}
                        Organize
                    </div>{" "}
                    <div className='border rounded-xl text-center py-3 w-full font-medium px-5 bg-white dark:bg-background'>
                        <LuTag className='text-2xl mx-auto text-blue-500 mb-1' />{" "}
                        Tag & Filter
                    </div>
                </div>
                <button
                    onClick={() => dispatch(openAuthModal())}
                    className='px-5 py-2 gap-2 font-semibold w-full cursor-pointer hover:bg-primary hover:text-white rounded-xl border border-primary text-primary duration-300'>
                    Login to get started
                </button>{" "}
            </div>
        </div>
    );
};

export default NonUserCard;
