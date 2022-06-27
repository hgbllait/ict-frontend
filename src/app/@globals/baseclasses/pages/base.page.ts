import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {DatatableFilterSchema, PageComponentSchema} from '../../models';
import {SharedBase} from '../shared.base';
import {AuthenticationService} from "../../services/api/auth";

@Injectable({
  providedIn: 'root',
})
export class BasePage extends SharedBase {
  executable_action ?: string;
  parameters: any;
  form_fields: any;
  page: PageComponentSchema;

  // region Behavior
  executeAction: Subject<void> = new Subject<void>();
  updateTableTrigger: Subject<void> = new Subject<void>();
  // endregion Behavior

  constructor(
    protected authService: AuthenticationService) {
    super();
  }

  getResultData( result, indexes ) {
      let result_data = result[ indexes.data ];
      if (result[ indexes.data ].hasOwnProperty(indexes.view )) {
          result_data = result[ indexes.data ][ indexes.view ];

          if (result_data.hasOwnProperty(indexes.data) ) {
              result_data = result[ indexes.data ][ indexes.view ][ indexes.data ];
          }
      }
      return result_data;
  }

  setAddedBy(type, form_data){
    if( this.authService.currentUserValue
      && this.authService.currentUserValue.hasOwnProperty('user')) {
      form_data[type] = this.authService.currentUserValue.user.id;
    }
    return form_data;
  }

  // region Variables

}
