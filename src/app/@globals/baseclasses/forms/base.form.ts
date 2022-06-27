import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {FormActionSchema, FormFieldSchema} from '../../models';
import {NbToastrService} from '@nebular/theme';
import {SharedBase} from '../shared.base';

@Injectable({
  providedIn: 'root',
})
export class BaseForm extends SharedBase{

  form: any = {};

  constructor() {
      super();
  }



  errorLog( error ) {
      console.log('[BASE FORM] VALIDATION ERRORS: ', error);
  }

}
