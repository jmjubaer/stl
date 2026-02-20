import React from "react";
import { Modal } from "antd";
type TProps = {
    isOpenFolderModal: boolean;
    setIsOpenFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddFolderForm = ({ isOpenFolderModal, setIsOpenFolderModal }: TProps) => {
    const handleCancel = () => {
        setIsOpenFolderModal(false);
    };

    return (
        <>
            <Modal
                open={isOpenFolderModal}
                onCancel={handleCancel}
                footer={false}>
                <div className=''>
                    <h2 className='text-2xl font-bold mb-4'>Add New Folder</h2>cd
                </div>
            </Modal>
        </>
    );
};

export default AddFolderForm;
