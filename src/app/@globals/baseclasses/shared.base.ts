import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class SharedBase {
  component_name = '';
  page: any;
  parameters: any;

  constructor() {
  }

  // region Helpers


  sanitizeData(data) {
    const sanitized = this.replaceDotWithUnderscore(this.flattenObject(data), '__');
    this.log('Sanitized data', sanitized);

    return sanitized;
  }

  flattenObject(ob) {
    const toReturn = {};

    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if ((typeof ob[i]) === 'object' && ob[i] !== null) {
        const flatObject = this.flattenObject(ob[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }

  replaceDotWithUnderscore(obj, replace = '_') {
    _.forOwn(obj, (value, key) => {

      // if key has a period, replace all occurences with an underscore
      if (_.includes(key, '.')) {
        const cleanKey = _.replace(key, /\./g, replace);
        obj[cleanKey] = value;
        delete obj[key];
      }

      // continue recursively looping through if we have an object or array
      if (_.isObject(value)) {
        return this.replaceDotWithUnderscore(value);
      }
    });
    return obj;
  }

  fieldGenerator( actions, fields ) {
    // ToDo: add Field Schema
    const result = {};

    for ( let i = 0; i < fields.length; i++ ) {
      const field = fields[i];

      if (field.hasOwnProperty('actions')) {
        result[i] = {};
        if (field['actions'].indexOf(actions) !== -1) {
          Object.keys(field).forEach(function(key_) {
            if (key_ !== 'actions') {
              result[i][key_] = field[key_];
            }
          });
        }
      }
    }
    return result;
  }

  getUrlParams(route) {
    const result = {};
    if (route.snapshot.paramMap.get('action')) {
      result['action'] = route.snapshot.paramMap.get('action');
    }
    const param_keys = route.snapshot.queryParamMap.keys;
    if (param_keys.length > 0) {
      for ( let i = 0; i < param_keys.length ; i++ ) {
        result[param_keys[i]] = route.snapshot.queryParamMap.get(param_keys[i]);
      }
    }

    this.parameters = result;

    return result;

  }

  // endregion Helpers
  // region Math
  floor(number) {
    return Math.floor(number);
  }

  // endregion Math

  // region Date
  parseDate( date, format = 'YYYY-MM-DD HH:mm:ss' ) {
    return moment( date ).format(format );
  }

  formatDateRelative(date) {
    const now: any = new Date();
    const diff: any = now - date; // the difference in milliseconds

    if (diff < 1000) { // less than 1 second
      return 'right now';
    }

    const sec = Math.floor(diff / 1000); // convert diff to seconds

    if (sec < 60) {
      return sec + ' sec. ago';
    }

    const min = Math.floor(diff / 60000); // convert diff to minutes
    if (min < 60) {
      return min + ' min. ago';
    }

    // format the date
    // add leading zeroes to single-digit day/month/hours/minutes
    let d = date;
    d = [
      '0' + d.getDate(),
      '0' + (d.getMonth() + 1),
      '' + d.getFullYear(),
      '0' + d.getHours(),
      '0' + d.getMinutes(),
    ].map(component => component.slice(-2)); // take last 2 digits of every component

    // join the components into date
    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
  }

  // emdregion Date
  // endregion Variables

  // region Utilities
  log(...data) {
    console.log(`[${this.component_name}] \n`, data );
  }


  getResultData( result, indexes ) {
    let result_data = result[ this.page.indexes.data ];
    if (result[ this.page.indexes.data ].hasOwnProperty(this.page.indexes.view )) {
      result_data = result[ this.page.indexes.data ][ this.page.indexes.view ];

      if (result_data.hasOwnProperty(this.page.indexes.data ) ) {
        result_data = result[ this.page.indexes.data ][ this.page.indexes.view ][ this.page.indexes.data ];
      }
    }
    return result_data;
  }
  // endregion Utilities
}
