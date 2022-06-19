import Swal from "sweetalert2";
import { TIMEOUT } from "../constants/timeout";

export default function notificationFailed(obj) {
  return Swal.fire({
    title: "Failed",
    text: obj.message || "Default message",
    icon: "error",
    timer: TIMEOUT,
    timerProgressBar: true,
  })
}