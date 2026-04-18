import React, { useEffect, useState, useTransition } from "react";
import { Modal, Spin, Switch } from "antd";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import FolderDropdown from "./FolderDropdown";
import { FaTimes } from "react-icons/fa";
import { TBookmark, TFolder, TLinkMetaInfo, TTag } from "@/src/types";
import { TiPlus } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { linkPreview, updateBookmark } from "@/src/services/BookmarkServices";
import Image from "next/image";
import placeHolderImage from "@/src/assets/placeholder.png";
import ShowAlert from "@/src/utils/ShowAlert";
import { selectToken } from "@/src/redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { LuPin } from "react-icons/lu";
import { openTagModal } from "@/src/redux/features/modal/modalSlice";
import AddTagForm from "./AddTagForm";
type TInputs = {
    title: string;
    url: string;
    image?: string;
    notes: string;
    isPinned: boolean;
};
type TProps = {
    selectEditBookmark: TBookmark;
    tagList: TTag[];
    folderList: TFolder[];
    setRefetchTags: React.Dispatch<React.SetStateAction<number>>;
    setRefetchBookmark: React.Dispatch<React.SetStateAction<number>>;
    setSelectEditBookmark: React.Dispatch<
        React.SetStateAction<TBookmark | null>
    >;
};
const EditBookmarkModal = ({
    setSelectEditBookmark,
    setRefetchBookmark,
    setRefetchTags,
    folderList,
    tagList,
    selectEditBookmark,
}: TProps) => {
    const token = useAppSelector(selectToken);
    const dispatch = useAppDispatch();
    const [isPreviewPending, startPreviewTransition] = useTransition();

    const [isPinned, setIsPinned] = useState<boolean>(false);
    const [selectFolder, setSelectFolder] = useState(() =>
        selectEditBookmark.folder
            ? {
                  name: selectEditBookmark.folder.name,
                  id: selectEditBookmark.folder._id,
              }
            : { name: "No Folder", id: "" },
    );

    const [selectTag, setSelectTag] = useState<TTag[]>(
        selectEditBookmark?.tags ?? [],
    );

    const [isOpenTagModal, setIsOpenTagModal] = useState(false);
    const [linkMetaInfo, setLinkMetaInfo] = useState<TLinkMetaInfo>({
        url: selectEditBookmark.url,
        domain: selectEditBookmark?.domain || "",
        title: selectEditBookmark.title,
        description: selectEditBookmark?.description || "",
        images: [selectEditBookmark.image ? selectEditBookmark.image : ""],
        favicons: [
            selectEditBookmark?.favicon ? selectEditBookmark?.favicon : "",
        ],
        siteName: selectEditBookmark?.siteName || "",
    });
    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TInputs>();
    const linkImage = useWatch({ control, name: "image" });
    const handleCancel = () => {
        setSelectEditBookmark(null);
    };
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
    const handleEditBookmark: SubmitHandler<TInputs> = async (data) => {
        try {
            Swal.showLoading();

            const bookmarkData = {
                url: data.url,
                domain: linkMetaInfo?.domain || "",
                title: data.title,
                notes: data.notes,
                description: linkMetaInfo?.description || "",
                image: data.image,
                favicon: linkMetaInfo?.favicons[0] || "",
                siteName: linkMetaInfo?.siteName || "",
                isPinned,
                tags:
                    selectTag.length > 0
                        ? selectTag.map((tag) => tag._id)
                        : null,
                folder: selectFolder.id || null,
            };

            const res = await updateBookmark(
                token as string,
                bookmarkData,
                selectEditBookmark._id,
            );
            console.log(res);
            if (res.success) {
                ShowAlert(
                    "Success",
                    "success",
                    "Bookmark updated successfully",
                );
                handleCancel();
                reset();
                setSelectTag([]);
                setSelectFolder({ name: "No Folder", id: "" });
                setRefetchBookmark((prev) => prev + 1);
            } else {
                ShowAlert(
                    "Error",
                    "error",
                    res.message || "Failed to update bookmark",
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
    };

    // link preview loading
    const url = useWatch({ control, name: "url" });
    useEffect(() => {
        startPreviewTransition(async () => {
            try {
                if (!url) return;
                const metaInfo = await linkPreview(url);
                console.log("metaInfo", metaInfo);
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
    }, [url, reset]);
    useEffect(() => {
        reset({ image: selectEditBookmark.image });
    }, [selectEditBookmark, reset]);
    return (
        <>
            <Modal
                open={selectEditBookmark ? true : false}
                onCancel={handleCancel}
                footer={false}>
                <div className='text-base'>
                    <h2 className='text-2xl font-bold mb-4 text-center'>
                        {" "}
                        Edit Bookmark
                    </h2>
                    <form onSubmit={handleSubmit(handleEditBookmark)}>
                        {/* URL */}
                        <div className=''>
                            <label className='block mb-2 font-medium text-text/80'>
                                URL :
                            </label>
                            <input
                                defaultValue={selectEditBookmark.url}
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
                                defaultValue={selectEditBookmark.title}
                                {...register("title", { required: true })}
                                type='text'
                                disabled={isPreviewPending}
                                className={`border disabled:cursor-not-allowed w-full px-4 py-2 rounded-2xl mt-1 outline-0 ${errors.title ? "border-red-500" : "border-text/50"}`}
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
                                    defaultValue={selectEditBookmark.image}
                                    {...register("image")}
                                    type='text'
                                    disabled={isPreviewPending}
                                    className={`border w-full px-4 py-2 rounded-2xl mt-1 outline-0 border-text/50 disabled:cursor-not-allowed`}
                                    placeholder='Enter bookmark image url ....'
                                />
                                <div className='border border-text/50 h-10.5 w-24 rounded-2xl overflow-hidden flex items-center justify-center'>
                                    <Image
                                        src={linkImage || placeHolderImage}
                                        alt='Cover image'
                                        width={96}
                                        height={40}
                                        className={`h-10 w-20 mt-0.5 ${linkImage ? "object-cover" : "object-contain"}`}
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
                                defaultValue={selectEditBookmark.notes}
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

                        {/* Pin bookmark */}
                        <div className='mt-5 border w-full px-4 py-2.5 rounded-2xl outline-0 border-text/50 flex items-center justify-between'>
                            <label
                                htmlFor='isPinned'
                                className='flex items-center gap-0.5 font-medium text-text/60 cursor-pointer'>
                                <LuPin className='text-lg' /> Pin this bookmark
                            </label>
                            <Switch
                                id='isPinned'
                                defaultChecked={selectEditBookmark.isPinned}
                                onChange={(e) => setIsPinned(e)}
                                className='z-0'
                            />
                        </div>

                        {/* Tags */}
                        <div className='mt-5'>
                            <label className='block mb-2 font-medium text-text/80'>
                                Tags :
                            </label>
                            <div
                                className={`pt-3 flex flex-wrap items-center gap-2 container`}>
                                <button
                                    onClick={() => dispatch(openTagModal())}
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
                                        className={`p-1 capitalize text-xs font-bold px-3  rounded-full cursor-pointer flex items-center gap-1 ${
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
                                Update Bookmark
                            </button>
                        </div>
                    </form>
                </div>
                <AddTagForm />
            </Modal>
        </>
    );
};

export default EditBookmarkModal;
