import {ApiCallback} from "./ApiCallback";
import {AngularHttpOptions} from "./AngularHttpOptions";

export interface ApiOptions {
  no_loader ?: boolean;
  error_slug ?: string;
  exception ?: ApiCallback;
  http_options ?: AngularHttpOptions;
  slug : string;
  success ?: ApiCallback;
  not_response ?: boolean;
  get_data ?: boolean;
}
