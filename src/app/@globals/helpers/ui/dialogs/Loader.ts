import Swal from "sweetalert2";


const Loader = Swal.mixin({
  title: 'Processing...',
  html: 'data uploading',
  didOpen: () => {
    Swal.showLoading();
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
  allowEnterKey: false,
  showCancelButton: false, // There won't be any cancel button
  showConfirmButton: false, // There won't be any confirm button
});

export default Loader;
