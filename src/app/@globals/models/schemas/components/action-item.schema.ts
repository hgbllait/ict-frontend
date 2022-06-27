export class ActionItemSchema {
  action: string;
  value: string;
  data?: any;
  constructor(
    action: string,
    value: string,
    data?: any
  ) { }
}
