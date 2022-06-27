import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiService} from "../api.service";
import {VariablesHelper} from "../../../helpers/objects/variables.helper";

import app_urls from './urls.json';
import {ErrorMessageUtilityService} from "../../utility/errors/error.message.utility.service";
import {SpinnerService} from "../../../helpers/ui/loader/loader.helper";

@Injectable({
  providedIn: 'root'
})
export class AssetsService extends ApiService {
  constructor(
    public httpClient: HttpClient,
    public variable: VariablesHelper,
    protected error: ErrorMessageUtilityService,
    public spinner: SpinnerService

  ) {
    super(httpClient, variable, error, spinner);

    this.initialize();
  }

  initialize(){
    this.url_root = `./`;
    this.urls = app_urls;
  }
}
