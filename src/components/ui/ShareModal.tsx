import { Modal } from "antd";
import { useState } from "react";
import {
    FaCheck,
    FaEnvelope,
    FaFacebook,
    FaLinkedin,
    FaRegCopy,
    FaTelegram,
    FaTwitter,
    FaWhatsapp,
} from "react-icons/fa6";
type TProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    url: string;
    text: string;
};
const ShareModal = ({ isOpen, setIsOpen ,url,text }: TProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    const shareOptions = [
        {
            name: "Facebook",
            icon: <FaFacebook className='text-2xl' />,
            color: "bg-[#1877F2]",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: "Twitter/X",
            icon: <FaTwitter className='text-2xl' />,
            color: "bg-[#1DA1F2]",
            url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        },
        {
            name: "WhatsApp",
            icon: <FaWhatsapp className='text-2xl' />,
            color: "bg-[#25D366]",
            url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
        },
        {
            name: "Telegram",
            icon: <FaTelegram className='text-2xl' />,
            color: "bg-[#229ED9]",
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedin className='text-2xl' />,
            color: "bg-[#0A66C2]",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            name: "Email",
            icon: <FaEnvelope className='text-2xl' />,
            color: "bg-[#EA4335]",
            url: `https://mail.google.com/mail/?view=cm&su=${encodedText}&body=${encodedText}%20${encodedUrl}`,
            mailto: true, // ✅ use location.href
        },
    ];

    // Updated handleShare
    const handleShare = (option: (typeof shareOptions)[0]) => {
        window.open(
            option.url,
            "_blank",
            "width=600,height=400,noopener,noreferrer",
        );
    };
    const handleCancel = () => {
        setIsOpen(false);
    };
    const handleCopy = async () => {
        try {
            // Try modern API first
            await navigator.clipboard.writeText(url);
        } catch {
            // Fallback for old browsers
            const textArea = document.createElement("textarea");
            textArea.value = url;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    return (
        <div>
            <Modal open={isOpen} onCancel={handleCancel} footer={false}>
                <h2 className='text-center text-xl font-bold mb-6'>
                    Share this folder
                </h2>
                <div className='flex items-center justify-center sm:justify-around flex-wrap gap-6 mb-6 '>
                    {shareOptions.map((option) => (
                        <button
                            key={option.name}
                            onClick={() => handleShare(option)}
                            className='w-fit cursor-pointer'>
                            <span
                                className={`${option.color} text-white rounded-full py-3 flex justify-center items-center gap-2 hover:opacity-90 transition-opacity w-12 h-12 mx-auto`}>
                                {option.icon}
                            </span>
                            <span className='text-xs font-medium'>
                                {option.name}
                            </span>
                        </button>
                    ))}
                </div>

                <div className='p-3 px-5 bg-text/5 rounded-2xl whitespace-nowrap flex gap-4 items-center justify-between'>
                    <span className='font-medium line-clamp-1'>{url} </span>
                    <button
                        onClick={handleCopy}
                        className={` py-1 px-3 border border-text/20 rounded-full cursor-pointer hover:bg-primary hover:text-white flex items-center duration-500 gap-1.5 bg-white`}>
                        {isCopied ? (
                            <FaCheck className={`inline text-green-500`} />
                        ) : (
                            <FaRegCopy className={`inline`} />
                        )}
                        <span className={` text-sm`}>
                            {isCopied ? "Copied" : "Copy"}
                        </span>
                    </button>{" "}
                </div>
            </Modal>
        </div>
    );
};

export default ShareModal;
