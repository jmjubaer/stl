import { FaFolder } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { TfiAngleRight } from "react-icons/tfi";
type TProps = {
    selectedFolder?: string;
    folderName?: string;
    setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
};
const TopNav = ({ selectedFolder, folderName, setSelectedFolder }: TProps) => {
    return (
        <div className='flex items-center gap-1'>
            <button
                onClick={() => setSelectedFolder("")}
                className='flex items-center px-3 text-sm py-1.5 gap-2 font-semibold cursor-pointer hover:bg-primary hover:text-white rounded-full bg-text/10 duration-300'>
                <IoHomeOutline className='' />
                Home
            </button>
            {selectedFolder && <TfiAngleRight className=' text-xs' />}
            {selectedFolder && (
                <button className='flex items-center px-3 text-sm py-1.5 gap-1.5 font-semibold cursor-pointer bg-primary text-white rounded-full hover:bg-text/10 hover:text-text duration-300'>
                    <FaFolder className='text-lg text-[#FED862]' />
                    {folderName}
                </button>
            )}
        </div>
    );
};

export default TopNav;
