import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const initialState = {
    authModalOpen: false,
    bookmarkModalOpen: false,
    folderModalOpen: false,
    tagModalOpen: false,
    selectedFolder: "",
    refreshTagList: false,
};
const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        // login modal
        openAuthModal: (state) => {
            state.authModalOpen = true;
        },
        closeAuthModal: (state) => {
            state.authModalOpen = false;
        },
        // Bookmark modal
        openBookmarkModal: (
            state,
            action: PayloadAction<string | undefined>,
        ) => {
            state.bookmarkModalOpen = true;
            if (action.payload !== undefined) {
                state.selectedFolder = action.payload; // ✅ only update if passed
            }
        },
        closeBookmarkModal: (state) => {
            state.bookmarkModalOpen = false;
            state.selectedFolder = "";
        },
        // Folder modal
        openFolderModal: (state) => {
            state.folderModalOpen = true;
        },
        closeFolderModal: (state) => {
            state.folderModalOpen = false;
        },
        // Folder modal
        openTagModal: (state) => {
            state.tagModalOpen = true;
        },
        closeTagModal: (state) => {
            state.tagModalOpen = false;
            state.refreshTagList = true;
        },
    },
});

export const {
    openAuthModal,
    closeAuthModal,
    openBookmarkModal,
    closeBookmarkModal,
    openFolderModal,
    closeFolderModal,
    openTagModal,
    closeTagModal,
} = modalSlice.actions;
export const selectOpenAuthModal = (state: RootState) =>
    state.modal.authModalOpen;
export const selectOpenBookmarkModal = (state: RootState) =>
    state.modal.bookmarkModalOpen;
export const selectOpenFolderModal = (state: RootState) =>
    state.modal.folderModalOpen;
export const selectOpenTagModal = (state: RootState) =>
    state.modal.tagModalOpen;
export const selectSelectedFolder = (state: RootState) =>
    state.modal.selectedFolder;
export const selectRefreshTagList = (state: RootState) =>
    state.modal.refreshTagList;

export default modalSlice.reducer;
