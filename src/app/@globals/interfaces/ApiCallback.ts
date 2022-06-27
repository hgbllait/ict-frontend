export interface ApiCallback {
  message ?: string;
  description ?: string;
  class ?: any;
  type: string;
  use_response?: boolean;
  callback ?: Function;
}
