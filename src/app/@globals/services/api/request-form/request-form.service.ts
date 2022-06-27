import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {ApiService} from '../api.service';
import {VariablesHelper} from '../../../helpers/objects/variables.helper';

import app_urls from './urls.json';
import {ErrorMessageUtilityService} from '../../utility/errors/error.message.utility.service';
import {SpinnerService} from "../../../helpers/ui/loader/loader.helper";

@Injectable({
  providedIn: 'root',
})
export class RequestFormService extends ApiService {
  protected url_root;
  protected urls;

  constructor(
    public httpClient: HttpClient,
    public variable: VariablesHelper,
    protected error: ErrorMessageUtilityService,
    public spinner: SpinnerService
  ) {
    super(httpClient, variable, error, spinner);

    this.initialize();
  }

  initialize() {
    this.url_root = `${environment.API_BASE_URL}`;
    this.urls = app_urls;
  }
}
