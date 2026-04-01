import React from "react";
import Swal from "sweetalert2";

const ShowAlert = (
    title: string,
    icon: "success" | "error" | "warning",
    text: string,
) => {
    return Swal.fire({ title, icon, text, draggable: true });
};

export default ShowAlert;
