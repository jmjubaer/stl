import React from "react";
import { Modal } from "antd";
type TProps = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddLinkForm = ({ isModalOpen, setIsModalOpen }: TProps) => {

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
                <div className=''>
                    <h2 className='text-2xl font-bold mb-4'>Add New Link</h2>cd     
                </div>
            </Modal>
        </>
    );
};

export default AddLinkForm;
