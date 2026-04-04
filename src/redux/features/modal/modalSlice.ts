import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const initialState = {
    authModalOpen: false,
    bookmarkModalOpen: false,
    folderModalOpen: false,
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
        openBookmarkModal: (state) => {
            state.bookmarkModalOpen = true;
        },
        closeBookmarkModal: (state) => {
            state.bookmarkModalOpen = false;
        },
        // Folder modal
        openFolderModal: (state) => {
            state.folderModalOpen = true;
        },
        closeFolderModal: (state) => {
            state.folderModalOpen = false;
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
} = modalSlice.actions;
export const selectOpenAuthModal = (state: RootState) =>
    state.modal.authModalOpen;
export const selectOpenBookmarkModal = (state: RootState) =>
    state.modal.bookmarkModalOpen;
export const selectOpenFolderModal = (state: RootState) =>
    state.modal.folderModalOpen;
export default modalSlice.reducer;
