import React, { useState } from "react";
import { Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import FolderDropdown from "./FolderDropdown";
import { FaTimes } from "react-icons/fa";
import { TTag } from "@/src/types";
import { TiPlus } from "react-icons/ti";
import AddTagForm from "./AddTagForm/AddTagForm";
type TProps = {
    isOpenLinkModal: boolean;
    setIsOpenLinkModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type TInputs = {
    title: string;
    url: string;
    image?: string;
    notes: string;
};
const tagList = [
    { name: "Design", color: "#9952E0" },
    { name: "Development", color: "#1A8CFF" },
    { name: "Tutorial", color: "#28BD66" },
    { name: "Marketing", color: "#F97A1F" },
    { name: "Inspiration", color: "#1DBAC9" },
];
const AddLinkForm = ({
    isOpenLinkModal,
    setIsOpenLinkModal,
    setIsOpenFolderModal,
}: TProps) => {
    const [tag, setTag] = useState<TTag[]>([]);
    const [isOpenTagModal, setIsOpenTagModal] = useState(false);

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const handleToggleTag = (tag: TTag) => {
        setTag((prevTag) =>
            prevTag.some((t) => t.name === tag.name)
                ? prevTag.filter((t) => t.name !== tag.name)
                : [...prevTag, tag],
        );
    };
    const handleCreateBookmark: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        setIsOpenLinkModal(false);
        reset();
    };
    const handleCancel = () => {
        setIsOpenLinkModal(false);
    };
    return (
        <>
            <Modal
                open={isOpenLinkModal}
                onCancel={handleCancel}
                footer={false}>
                <div className='text-base'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>
                        {" "}
                        Add New Bookmark
                    </h2>
                    <form onSubmit={handleSubmit(handleCreateBookmark)}>
                        {/* Title */}
                        <div className=''>
                            <label className='block mb-2 font-medium text-text/80'>
                                Title :
                            </label>
                            <input
                                {...register("title", { required: true })}
                                type='text'
                                className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 ${errors.title ? "border-red-500" : "border-text/50"}`}
                                placeholder='Enter bookmark title ....'
                            />
                            {errors.title && (
                                <span className='text-red-500'>
                                    {" "}
                                    Title is required
                                </span>
                            )}
                        </div>

                        {/* URL */}
                        <div className='mt-5'>
                            <label className='block mb-2 font-medium text-text/80'>
                                URL :
                            </label>
                            <input
                                {...register("url", { required: true })}
                                type='text'
                                className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 ${errors.url ? "border-red-500" : "border-text/50"}`}
                                placeholder='Enter bookmark url ....'
                            />
                            {errors.url && (
                                <span className='text-red-500'>
                                    {" "}
                                    URL is required
                                </span>
                            )}
                        </div>

                        {/* image */}
                        <div className='mt-5'>
                            <label className='block mb-2 font-medium text-text/80'>
                                Image URL{" "}
                                <span className='text-xs'>(Optional)</span>:
                            </label>
                            <input
                                {...register("image", { required: true })}
                                type='text'
                                className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 ${errors.image ? "border-red-500" : "border-text/50"}`}
                                placeholder='Enter bookmark image url ....'
                            />
                            {errors.image && (
                                <span className='text-red-500'>
                                    {" "}
                                    Image URL is required
                                </span>
                            )}
                        </div>

                        {/* Folder */}
                        <FolderDropdown
                            setIsOpenFolderModal={setIsOpenFolderModal}
                        />

                        {/* Notes */}
                        <div className='mt-5'>
                            <label className='block mb-2 font-medium text-text/80'>
                                Notes :
                            </label>
                            <textarea
                                {...register("notes", { required: true })}
                                className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 min-h-[100px] ${errors.notes ? "border-red-500" : "border-text/50"}`}
                                placeholder='Enter bookmark notes ....'></textarea>
                            {errors.notes && (
                                <span className='text-red-500'>
                                    {" "}
                                    Notes is required
                                </span>
                            )}
                        </div>

                        {/* Tags */}
                        <div className='mt-5'>
                            <label className='block mb-2 font-medium text-text/80'>
                                Tags :
                            </label>
                            <div
                                className={`pt-3 flex flex-wrap items-center gap-2 container`}>
                                <button
                                    onClick={() => setIsOpenTagModal(true)}
                                    type='button'
                                    style={{
                                        backgroundColor: "#1A8CFF" + "20",
                                        color: "#1A8CFF",
                                    }}
                                    className={`p-1 text-xs font-bold px-3  rounded-full cursor-pointer flex items-center gap-1`}>
                                    <TiPlus />
                                    Add Tag
                                </button>
                                {tagList.map((tagItem) => (
                                    <button
                                        onClick={() => handleToggleTag(tagItem)}
                                        type='button'
                                        key={tagItem.name}
                                        style={{
                                            backgroundColor:
                                                tagItem.color + "20",
                                            color: tagItem.color,
                                        }}
                                        className={`p-1 text-xs font-bold px-3  rounded-full cursor-pointer flex items-center gap-1 ${
                                            tag.find(
                                                (t) => t.name === tagItem.name,
                                            ) && "border-2"
                                        }`}>
                                        {tagItem.name}

                                        {tag.find(
                                            (t) => t.name === tagItem.name,
                                        ) && (
                                            <span className='cursor-pointer'>
                                                <FaTimes />
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* button */}
                        <div className='flex justify-end gap-5 mt-5'>
                            <button
                                onClick={handleCancel}
                                className='border hover:bg-primary rounded-xl px-5 py-2 cursor-pointer hover:text-white'>
                                Cancel
                            </button>
                            <button
                                className='border bg-blue-700 text-white hover:bg-primary rounded-xl px-5 py-2 cursor-pointer hover:text-white'
                                type='submit'>
                                Add Bookmark
                            </button>
                        </div>
                    </form>
                </div>
                <AddTagForm
                    isOpenTagModal={isOpenTagModal}
                    setIsOpenTagModal={setIsOpenTagModal}
                />
            </Modal>
        </>
    );
};

export default AddLinkForm;
