import { Modal } from "antd";
import { useState } from "react";

const Profile = () => {
    const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
    const handleCancel = () => {
        setIsOpenProfileModal(false);
    };
    return (
        <div>
            <Modal
                open={isOpenProfileModal}
                onCancel={handleCancel}
                footer={false}
                className='modal'></Modal>
        </div>
    );
};

export default Profile;
