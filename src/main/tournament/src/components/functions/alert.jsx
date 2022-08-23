import Swal from "sweetalert2";

export default function AlertMessage(message, status) {
  if (status === "error") {
    Swal.fire("Something went wrong!", `${message}`, `${status}`).then(
      (result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      }
    );
  } else {
    Swal.fire("Succes!", `${message}`, `${status}`).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
}
