import {ButtonSchema} from './button.schema';
import {FormSchema} from './form.schema';

export class PageComponentSchema {
  // region Configuration
  endpoints ?: any;
  indexes ?: any | {
    data ?: string,
  };
  labels ?: {
    plural ?: string,
    singular ?: string,
    actions ?: string,
    table ?: string,
  };
  // endregion Configuration
  actions ?: any;
  columns ?: any;
  options ?: any;
  filters ?: FormSchema;
  forms ?: any;
  form_actions ?: any;
  form_fields ?: any;
  page_actions ?: Array<ButtonSchema>;

  readonly ?: boolean = false;

  constructor() { }
}
