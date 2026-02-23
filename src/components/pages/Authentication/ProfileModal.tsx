import { Modal } from "antd";
import React, { SetStateAction } from "react";
import { FaRegEnvelope, FaRegUser, FaUser } from "react-icons/fa6";
type TProps = {
    isOpenProfileModal: boolean;
    setIsOpenProfileModal: React.Dispatch<SetStateAction<boolean>>;
};
const ProfileModal = ({
    isOpenProfileModal,
    setIsOpenProfileModal,
}: TProps) => {
    const handleCancel = () => {
        setIsOpenProfileModal(false);
    };
    return (
        <div>
            <Modal
                open={isOpenProfileModal}
                onCancel={handleCancel}
                footer={false}
                className='modal'>
                {/* Profile Image */}
                <div className='w-28 h-28 bg-blue-400 rounded-full mx-auto flex items-center justify-center text-3xl font-semibold text-white'>
                    MJ{" "}
                </div>

                {/* name title */}
                <h2 className='text-center mt-3 text-2xl font-bold'>
                    Md Jubaer
                </h2>

                {/* Name field*/}
                <div className='border border-text/30 rounded-xl p-3 mt-5 flex items-center gap-3 cursor-pointer'>
                    <FaRegUser className='text-xl' />
                    <div className=''>
                        <h3 className='text-sm text-text/60'>Name</h3>
                        <h4 className='font-medium'>Md Jubaer</h4>
                    </div>{" "}
                </div>

                {/* Email field*/}
                <div className='border border-text/30 rounded-xl p-3 mt-5 flex items-center gap-3 cursor-pointer'>
                    <FaRegEnvelope className='text-xl' />
                    <div className=''>
                        <h3 className='text-sm text-text/60'>Email</h3>
                        <h4 className='font-medium'>jubaer@example.com</h4>
                    </div>{" "}
                </div>
            </Modal>
        </div>
    );
};

export default ProfileModal;
