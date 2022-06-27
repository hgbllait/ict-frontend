import Swal from "sweetalert2";


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  grow: 'row'
});


export default Toast;
