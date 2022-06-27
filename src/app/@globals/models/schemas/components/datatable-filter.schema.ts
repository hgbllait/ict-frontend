import {PipeTransform, TemplateRef} from '@angular/core';
import {ButtonSchema} from './button.schema';

export class DatatableFilterSchema {
  fields: Array<DatatableFieldSchema>;
  button ?: ButtonSchema;

  constructor(
  ) { }
}

export class DatatableFieldSchema {
  id ?: any;
  column ?: any;
  label ?: any;
  type ?: any;
  default ?: any;
  min ?: any;
  max ?: any;
  width ?: any;
  required ?: boolean;
  data ?: any;

  constructor(
  ) { }
}
