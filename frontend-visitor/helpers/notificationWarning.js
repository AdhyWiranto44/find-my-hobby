import Swal from "sweetalert2"


export default async function notificationWarning(obj) {
  return Swal.fire({
    title: obj.title || "Default title",
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: "Batal",
    icon: "warning",
  }).then(result => {
    if (result.isConfirmed) return true
    if (result.isDenied) return false
  })
}