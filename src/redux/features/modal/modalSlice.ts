import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loginModalOpen: false,
    bookmarkModalOpen: false,
    folderModalOpen: false,
};
const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        // login modal
        openLoginModal: (state) => {
            state.loginModalOpen = true;
        },
        closeLoginModal: (state) => {
            state.loginModalOpen = false;
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

export default modalSlice.reducer;
export const {
    openLoginModal,
    closeLoginModal,
    openBookmarkModal,
    closeBookmarkModal,
    openFolderModal,
    closeFolderModal,
} = modalSlice.actions;
