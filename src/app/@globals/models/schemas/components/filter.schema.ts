export class FilterSchema {
  column ?: string;
  label ?: string;
  data ?: Array<any>;
  type ?: string;
  value ?: any;
  constructor(
    column: string,
    label: string,
    data: Array<any>,
    type: string,
    value: any,
  ) { }
}
