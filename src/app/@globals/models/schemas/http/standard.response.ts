export class StandardResponse {
  code ?: number;
  message ?: string;
  description ?: string;
  data ?: any;
  parameters ?: any;
  info ?: any;
  constructor(
    code: number,
    message: string,
    description: string,
    data: any,
    parameters: any,
    info: any,
  ) { }
}
