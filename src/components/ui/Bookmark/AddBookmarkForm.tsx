import React, { useEffect, useState, useTransition } from "react";
import { Modal, Spin } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import FolderDropdown from "./FolderDropdown";
import { FaTimes } from "react-icons/fa";
import { TFolder, TLinkMetaInfo, TSelectedFolder, TTag } from "@/src/types";
import { TiPlus } from "react-icons/ti";
import AddTagForm from "./AddTagForm";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import {
    closeBookmarkModal,
    selectOpenBookmarkModal,
} from "@/src/redux/features/modal/modalSlice";
import { linkPreview } from "@/src/services/BookmarkServices";
import Image from "next/image";
import placeHolderImage from "@/src/assets/placeholder.png";
import ShowAlert from "@/src/utils/ShowAlert";
type TInputs = {
    title: string;
    url: string;
    image?: string;
    notes: string;
};
type TProps = {
    tagList: TTag[];
    folderList: TFolder[];
    setRefetchTags: React.Dispatch<React.SetStateAction<number>>;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
};
const AddBookmarkForm = ({
    setRefetchBookmark,
    setRefetchTags,
    folderList,
    tagList,
}: TProps) => {
    const dispatch = useAppDispatch();

    const [isPreviewPending, startPreviewTransition] = useTransition();

    const [selectTag, setSelectTag] = useState<TTag[]>([]);
    const [selectFolder, setSelectFolder] = useState<TSelectedFolder>({
        name: "No Folder",
        id: "",
    });
    const [isOpenTagModal, setIsOpenTagModal] = useState(false);
    const [linkMetaInfo, setLinkMetaInfo] = useState<TLinkMetaInfo | null>(
        null,
    );
    const isOpenBookmarkModal = useAppSelector(selectOpenBookmarkModal);
    const {
        reset,
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    console.log(57, selectTag);
    const handleToggleTag = (tag: TTag) => {
        // Check if already selected OUTSIDE setState
        const isSelected = selectTag.some((t) => t._id === tag._id);

        // If already selected — remove it (no limit check needed)
        if (isSelected) {
            setSelectTag((prevTag) => prevTag.filter((t) => t._id !== tag._id));
            return;
        }

        // If not selected — check limit before adding
        if (selectTag.length >= 3) {
            ShowAlert("Error", "error", "You can only select up to 3 tags.");
            return;
        }

        // Add new tag
        setSelectTag((prevTag) => [...prevTag, tag]);
    };
    const handleCreateBookmark: SubmitHandler<TInputs> = (data) => {
        console.log(data);
        dispatch(closeBookmarkModal());
        reset();
    };
    const handleCancel = () => {
        dispatch(closeBookmarkModal());
    };

    // link preview loading
    const url = watch("url");
    useEffect(() => {
        startPreviewTransition(async () => {
            try {
                if (!url) return;
                const metaInfo = await linkPreview(url);
                console.log("link meta info:", metaInfo);
                if (metaInfo.success) {
                    reset({
                        title: metaInfo.data.title,
                        image: metaInfo.data.images[0] || "",
                    });
                    setLinkMetaInfo(metaInfo.data);
                } else {
                    ShowAlert(
                        "Error",
                        "error",
                        `${metaInfo.message}. You can still add the bookmark without preview info.`,
                    );
                }
            } catch (error) {
                ShowAlert(
                    "Error",
                    "error",
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                );
            }
        });
    }, [url]);
    return (
        <>
            <Modal
                open={isOpenBookmarkModal}
                onCancel={handleCancel}
                footer={false}>
                <div className='text-base'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>
                        {" "}
                        Add New Bookmark
                    </h2>
                    <form onSubmit={handleSubmit(handleCreateBookmark)}>
                        {/* URL */}
                        <div className=''>
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
                        {/* Title */}
                        <div className='mt-5'>
                            <label className='block mb-2 font-medium text-text/80'>
                                <span className='mr-2'>Title :</span>{" "}
                                <Spin
                                    size='small'
                                    spinning={isPreviewPending}
                                />
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

                        {/* image */}
                        <div className='mt-5'>
                            <label className='block mb-2 font-medium text-text/80'>
                                Image URL{" "}
                                <span className='text-xs'>(Optional)</span>{" "}
                                <span className='mr-2'> :</span>{" "}
                                <Spin
                                    size='small'
                                    spinning={isPreviewPending}
                                />
                            </label>
                            <div className='flex items-center gap-2'>
                                <input
                                    {...register("image")}
                                    type='text'
                                    className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 border-text/50`}
                                    placeholder='Enter bookmark image url ....'
                                />
                                <div className='border border-text/50 h-10.5 w-24 rounded-2xl overflow-hidden flex items-center justify-center'>
                                    <Image
                                        src={
                                            linkMetaInfo?.images[0] ||
                                            placeHolderImage
                                        }
                                        alt='Cover image'
                                        width={96}
                                        height={40}
                                        className='h-10 w-20 object-contain mt-0.5'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Folder */}
                        <FolderDropdown
                            folderList={folderList}
                            selectFolder={selectFolder}
                            setSelectFolder={setSelectFolder}
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
                                            selectTag.find(
                                                (t) => t.name === tagItem.name,
                                            ) && "border-2"
                                        }`}>
                                        {tagItem.name}

                                        {selectTag.find(
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
                    setRefetchTags={setRefetchTags}
                    isOpenTagModal={isOpenTagModal}
                    setIsOpenTagModal={setIsOpenTagModal}
                />
            </Modal>
        </>
    );
};

export default AddBookmarkForm;
