import {PipeTransform, TemplateRef} from '@angular/core';

export class DatatableColumnSchema {
  name: string;
  prop: string;
  flexGrow ?: number;
  minWidth ?: number;
  maxWidth ?: number;
  width ?: number;
  resizeable ?: boolean;
  comparator ?: string;
  sortable ?: boolean;
  draggable ?: boolean;
  canAutoResize ?: boolean;
  cellTemplate ?: TemplateRef<any> | any;
  headerTemplate ?: TemplateRef<any> | any;
  checkboxable ?: boolean;
  headerCheckboxable ?: boolean;
  headerClass ?: string|Function;
  cellClass ?: string|Function;
  frozenLeft ?: boolean;
  frozenRight ?: boolean;
  pipe ?: PipeTransform;
  constructor(
    name: string,
    prop: string,
    flexGrow: number,
    minWidth: number,
    maxWidth: number,
    width: number,
    resizeable: boolean,
    comparator: string,
    sortable: boolean,
    draggable: boolean,
    canAutoResize: boolean,
    cellTemplate: TemplateRef<any> | any,
    headerTemplate: TemplateRef<any> | any,
    checkboxable: boolean,
    headerCheckboxable: boolean,
    headerClass: string|Function,
    cellClass: string|Function,
    frozenLeft: boolean,
    frozenRight: boolean,
    pipe: PipeTransform,
  ) { }
}
