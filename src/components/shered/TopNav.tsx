import { FaFolder } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { TfiAngleRight } from "react-icons/tfi";
type TProps = {
    folderName?: string;
};
const TopNav = ({ folderName }: TProps) => {
    return (
        <div className='container flex items-center gap-1'>
            <button className='flex items-center px-3 text-sm py-1.5 gap-2 font-semibold cursor-pointer hover:bg-primary hover:text-white rounded-full mt-2  bg-text/10 duration-300'>
                <IoHomeOutline className='' />
                Home
            </button>
            {folderName && <TfiAngleRight className='mt-2 text-xs' />}
            {folderName && (
                <button className='flex items-center px-3 text-sm py-1.5 gap-1.5 font-semibold cursor-pointer hover:bg-primary hover:text-white rounded-full mt-2 '>
                    <FaFolder className='text-lg text-[#FED862]' />
                    {folderName}
                </button>
            )}
        </div>
    );
};

export default TopNav;
