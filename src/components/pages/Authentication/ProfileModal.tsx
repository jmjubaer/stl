import { selectToken, selectUser, setIsExpired } from "@/src/redux/features/auth/authSlice";
import {
    openTagModal,
    selectRefreshTagList,
} from "@/src/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { getTags } from "@/src/services/TagServices";
import { TTag } from "@/src/types";
import { Modal, Spin } from "antd";
import React, {
    SetStateAction,
    useEffect,
    useState,
    useTransition,
} from "react";
import { FaRegEnvelope, FaRegUser } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
type TProps = {
    isOpenProfileModal: boolean;
    setIsOpenProfileModal: React.Dispatch<SetStateAction<boolean>>;
};
const ProfileModal = ({
    isOpenProfileModal,
    setIsOpenProfileModal,
}: TProps) => {
    const [isPending, startTransition] = useTransition();
    const [tagList, setTagList] = useState<TTag[]>([]);
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);
    const dispatch = useAppDispatch();
    const refreshTagList = useAppSelector(selectRefreshTagList);
    const handleCancel = () => {
        setIsOpenProfileModal(false);
    };

    // fetch tag list for move to folder option
    useEffect(() => {
        startTransition(async () => {
            if (token) {
                const res = await getTags(token as string);
                console.log(res);
                if (res?.success) {
                    setTagList(res.data);
                } else {
                    if (res.message === "Token has expired") {
                        dispatch(setIsExpired());
                    }
                    setTagList([]);
                }
            } else {
                setTagList([]);
            }
        });
    }, [token, refreshTagList]);
    return (
        <div>
            <Modal
                open={isOpenProfileModal}
                onCancel={handleCancel}
                footer={false}
                className='modal'>
                {/* Profile Image */}
                <div className='w-28 h-28 bg-blue-400 rounded-full mx-auto flex items-center justify-center text-3xl font-semibold text-white'>
                    {user?.name
                        ?.split(" ")
                        .map((word: string) => word.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join("")}
                </div>
                {/* name title */}
                <h2 className='text-center mt-3 text-2xl font-bold'>
                    {user?.name}
                </h2>
                {/* Name field*/}
                <div className='border border-text/30 rounded-xl p-3 mt-5 flex items-center gap-3 cursor-pointer'>
                    <FaRegUser className='text-xl' />
                    <div className=''>
                        <h3 className='text-sm text-text/60'>Name</h3>
                        <h4 className='font-medium'>{user?.name}</h4>
                    </div>{" "}
                </div>
                {/* Email field*/}
                <div className='border border-text/30 rounded-xl p-3 mt-5 flex items-center gap-3 cursor-pointer'>
                    <FaRegEnvelope className='text-xl' />
                    <div className=''>
                        <h3 className='text-sm text-text/60'>Email</h3>
                        <h4 className='font-medium'>{user?.email}</h4>
                    </div>{" "}
                </div>
                ;{/* Tags field*/}
                <Spin size='small' spinning={isPending}>
                    <div className='border border-text/30 rounded-xl p-3 flex items-center gap-2 cursor-pointer'>
                        <FiFilter className='text-2xl' />
                        <div className=''>
                            <h3 className='text-sm text-text/60'>
                                Uses Tags :
                            </h3>
                            <div
                                className={`pt-1 flex flex-wrap items-center gap-2`}>
                                <button
                                    onClick={() => dispatch(openTagModal())}
                                    type='button'
                                    style={{
                                        backgroundColor: "#1A8CFF" + "20",
                                        color: "#1A8CFF",
                                    }}
                                    className={`p-1 text-xs font-bold px-3  rounded-full cursor-pointer flex items-center gap-1 whitespace-nowrap`}>
                                    <TiPlus />
                                    Add Tag
                                </button>
                                {tagList.map((tagItem) => (
                                    <button
                                        // onClick={() => handleToggleTag(tagItem)}
                                        type='button'
                                        key={tagItem.name}
                                        style={{
                                            backgroundColor:
                                                tagItem.color + "20",
                                            color: tagItem.color,
                                        }}
                                        className={`p-1 capitalize text-xs font-bold px-3 rounded-full cursor-pointer flex items-center gap-1}`}>
                                        {tagItem.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Spin>
            </Modal>
        </div>
    );
};

export default ProfileModal;
