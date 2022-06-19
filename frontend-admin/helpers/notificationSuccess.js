import Swal from "sweetalert2";
import { TIMEOUT } from "../constants/timeout";


export default function notificationSuccess(obj) {
  return Swal.fire({
    title: "Success!",
    text: obj.message || "Default message",
    icon: "success",
    timer: TIMEOUT,
    timerProgressBar: true,
  })
}