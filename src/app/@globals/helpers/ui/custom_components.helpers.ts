import { FormGroup, ValidationErrors } from '@angular/forms';
import { Injectable, Pipe} from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';
import Toast from './dialogs/Toast';
import Dialog from './dialogs/Dialog';
import Loader from './dialogs/Loader';

@Injectable({
  providedIn: 'root'
})
export class CustomComponentsHelper {
  toast( message: string, type: SweetAlertIcon = 'success' ) {
    Toast.fire( message, '', type );
    return;
  }

  dialog( message: string, type: SweetAlertIcon = 'success' ) {
    Dialog.fire( message, '', type );
    return;
  }

  loader( message: string, type: SweetAlertIcon = 'success' ) {
    Loader.fire( message, '', type );
    return;
  }
}
