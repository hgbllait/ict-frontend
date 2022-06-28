import {Injectable} from '@angular/core';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

import {BaseService} from '../../baseclasses/services/base.service';
import {VariablesHelper} from '../../helpers/objects/variables.helper';
import {Response} from '../../interfaces/Response';
import {ErrorMessageUtilityService} from '../utility/errors/error.message.utility.service';
import {ApiOptions} from '../../interfaces/ApiOptions';
import Swal, {SweetAlertIcon} from 'sweetalert2';
import Dialog from '../../helpers/ui/dialogs/Dialog';
import Toast from '../../helpers/ui/dialogs/Toast';
import {SpinnerService} from "../../helpers/ui/loader/loader.helper";

@Injectable({
    providedIn: 'root',
})
export class ApiService extends BaseService {

    protected url_root;
    protected urls;

    protected data_key = '';
    protected response_type = 'standard';
    protected resolved_method = 'GET';
    protected resolved_url = '';

    protected exempt_keys = [];

    constructor(
        public httpClient: HttpClient,
        public variable: VariablesHelper,
        protected error: ErrorMessageUtilityService,
        public spinner: SpinnerService ) {
        super();
    }

    /**
     * An observable function for executing and automatically throwing user-friendly error messages
     *
     * @param {ApiOptions} options
     * @param {{}} data
     * @param {string} error_slug
     * @returns {Observable<any>}
     */
    execute(options: ApiOptions, data = {}) {
        const self = this;
        return new Observable((observer) => {
            let http_options = {};

            if (options.http_options) {
                http_options = options.http_options;
            }
            if ( options.no_loader === true ) {
                // Do nothing
            } else {
                this.spinner.show();
            }
            self.call(options.slug, data, http_options)
                .subscribe(
                    (response: Response) => {
                        Swal.close();
                        this.spinner.hide();
                        let result: Response;

                        // Check if response is in valid format.
                        // Resolve using errors.json if non existent.
                        if (!response.code || Number.isNaN(response.code)) {
                            let error_slug = 'defaults.error';

                            if (options.error_slug) {
                                error_slug = options.error_slug;
                            }

                            console.log(
                                '[API: execute()] THIS RESPONSE HAS NO CODE',
                                response.code, Number.isNaN(response.code),
                            );

                            result = this.error.resolve(error_slug);

                            if (options.not_response === true) {
                                result = response;
                            }

                            console.log('[API: execute()] AFTER RESPONSE SET', result);
                        } else {
                            console.log('[API: execute()] THIS RESPONSE HAS CODE');
                            result = response;
                        }

                        // If options has success message to show, this block will handle it.
                        if (options.success) {
                            let message = options.success.message ? options.success.message : '';
                            let description = options.success.description ? options.success.description : '';
                            let dialog_class = options.success.class ? options.success.class : 'success';

                            // Execute callback as earliest, for custom functions that needs to be executed.
                            if (options.success.callback) {
                                options.success.callback(result);
                            }

                            // Uses API-based response as message.
                            if (options.success.use_response) {
                                dialog_class = 'success';
                                message = result.message;
                                description = result.description ? result.description : description;
                            }

                            if (message !== '' ) {
                                switch (options.success.type) {
                                    case 'dialog':
                                        Dialog.fire(message, description, dialog_class);
                                        break;
                                    case 'toast':
                                        Toast.fire(message, description, dialog_class);
                                        break;
                                    default:
                                        console.log(message, description, dialog_class);
                                        break;
                                }
                            }
                        }

                        if (options.get_data === true) {
                            result = result.data;
                        }

                        if (this.data_key !== '') {
                            if (this.data_key === '__data') {
                                result = result.data;
                            } else {
                                result = result.data[this.data_key];
                            }
                        }

                        observer.next(result);

                        console.log('[API: execute()] EXECUTE RESPONSE: ', result);
                    },
                    (exception) => {
                        Swal.close();
                        this.spinner.hide();

                        let message = '';
                        let response: Response;
                        let error_slug = 'default.error';
                        let dialog_class: SweetAlertIcon = 'error';
                        let type = 'dialog';

                        if ( options.no_loader === true ) {
                            type = 'none';
                        }

                        if (options.error_slug) {
                            error_slug = options.error_slug;
                        }

                        response = this.error.resolve(error_slug);
                        message = response.message;

                        if (options.exception) {

                            if (options.exception.callback) {
                                console.log('[API: execute()] EXCEPTION CALLBACK');
                                options.exception.callback(exception);
                            }

                            if (options.exception.class) {
                                dialog_class = options.exception.class;
                            }

                            if (options.exception.message) {
                                message = options.exception.message;
                            }

                            if (options.exception.type) {
                                type = options.exception.type;
                            }

                            if (options.exception.type) {
                                type = options.exception.type;
                            }
                        }

                        if (message && message !== '') {
                            console.log( '[APISERVICE] Calling error type: ', type );
                            switch (type) {
                                case 'dialog':
                                    Dialog.fire(message, '', dialog_class);
                                    break;
                                case 'toast':
                                    Toast.fire(message, '', dialog_class);
                                    break;
                                default:
                                    console.log(message, '', dialog_class);
                                    break;
                            }
                        }


                        console.log('[API: execute()] EXECUTE EXCEPTION: ', exception);
                        observer.error(exception);
                    },
                );

            return {
                unsubscribe() {

                },
            };
        });
    }

    /**
     *
     * @param slug
     * @param {{}} data
     * @returns Observable
     */
    call(slug, data = {}, options = {}) {
        this.clearResolve();

        console.log('[API: call()] SLUG: ' + slug);
        console.log('[API: call()] DATA: ', data);

        this.buildUrl(slug);

        let result: Observable<any>;

        this.resolved_url = this.makeUrlWithData(this.resolved_url, data);

        console.log('[API: call()] Data key: ', this.data_key);

        this.resolved_url += this.resolved_url.includes('?') ? '' : '?';

        let full_url = this.url_root + this.resolved_url + '&__standard_json=true';

        console.log('[API: call()] RESOLVED URL: ' + full_url);
        console.log('[API: call()] CALLING ' + this.resolved_method + ': ', full_url);

        switch (this.resolved_method) {
            case 'GET':
                full_url = full_url + this.makeQueryString(data);
                result = this.get(full_url, options);
                break;
            case 'POST':
                result = this.post(full_url, this.makeFormData(data), options);
                console.log('PARAMS:', this.makeFormData(data));
                break;
        }

        return result;
    }

    clearResolve() {
        this.resolved_method = 'GET';
        this.resolved_url = '';
        this.data_key = '';
        this.response_type = 'standard';
        this.exempt_keys = [];
    }

    get(url, options = {}) {
        const client = this.httpClient.get(url, options);
        console.log('[API: get()] ', client);
        return client;
    }

    post(url, data, options = {}) {
        return this.httpClient.post(url, data, options);
    }


    buildUrl(slug) {
        const parts = slug.split('.');
        this.makeUrlFromSlug(slug, parts, this.urls, 0);
    }

    makeUrlFromSlug(slug, parts, data, level) {
        if (!data) {
            return;
        }

        for (let i = 0; i < data.length; i++) {
            const val = data[i];

            if (val.slug === parts[level]) {
                if (val.prefix !== '') {
                    this.resolved_url += '/' + val.prefix;
                }
                if ( val.method ) {
                    this.resolved_method = val.method;
                }

                if (val.data_key && val.data_key !== '') {
                    console.log('[API: makeUrlFromSlug()] ', val)
                    this.data_key = val.data_key;
                }

                if (val.response_type && val.response_type !== '') {
                    this.response_type = val.response_type;
                }

                if (val.children) {
                    this.makeUrlFromSlug(slug, parts, val.children, level + 1);
                }
            }
        }
    }

    makeUrlWithData(url, data) {
        let updated_url = url;

        for (let key in data) {
            let target = "{" + key + "}";

            // console.log("[URL WITH DATA] key: " + key + " target: " + target + " url: " + updated_url);

            if (updated_url.includes(target)) {
                updated_url = updated_url.replace(target, data[key]);
                this.exempt_keys.push(key);
            }
        }

        return updated_url;
    }

    makeQueryString(data, parent_key = '') {
        let query_string = '';

        for (let key in data) {
            if (this.exempt_keys.indexOf(key) === -1) {
                if (typeof data[key] === 'object') {
                    const updated_key = parent_key === '' ? key : '[' + key + ']';
                    query_string += this.makeQueryString(data[key], parent_key + updated_key);
                } else {
                    const updated_key = parent_key === '' ? key : '[' + key + ']';
                    query_string += '&' + parent_key + updated_key + '=' + data[key];
                }
            }
        }

        return query_string;
    }

    makeFormData(data) {
        let form = {};

        for (let key in data) {
            if (this.exempt_keys.indexOf(key) === -1) {
                form[key] = data[key];
            }
        }

        return form;
    }
}
