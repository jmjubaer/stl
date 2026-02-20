import React from "react";
import { Modal } from "antd";
type TProps = {
    isOpenLinkModal: boolean;
    setIsOpenLinkModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddLinkForm = ({ isOpenLinkModal, setIsOpenLinkModal }: TProps) => {

    const handleCancel = () => {
        setIsOpenLinkModal(false);
    };

    return (
        <>
            <Modal open={isOpenLinkModal} onCancel={handleCancel} footer={false}>
                <div className=''>
                    <h2 className='text-2xl font-bold mb-4'>Add New Link</h2>cd     
                </div>
            </Modal>
        </>
    );
};

export default AddLinkForm;
