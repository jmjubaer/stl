import Swal from "sweetalert2";

const ShowAlert = (
    title: string,
    icon: "success" | "error" | "warning",
    text: string,
) => {
    return Swal.fire({
        title,
        icon,
        text,
        draggable: true,

        customClass: {
            container: "swal-z-index", // ✅ custom class
        },
    });
};

export default ShowAlert;
