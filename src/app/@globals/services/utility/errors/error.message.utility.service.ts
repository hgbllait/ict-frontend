import { Injectable } from '@angular/core';

import {BaseService} from '../../../baseclasses/services/base.service';
import messages from './errors.json';
import {Response} from '../../../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageUtilityService extends BaseService {
  protected defaults;
  protected messages;

  protected response: Response;

  constructor(
  ) {
    super();

    this.messages = messages;
    this.response = {
      code: null,
      message: null,
      description: null,
    };
  }

  resolve( slug ): Response {
    console.log('RESOLVING ERROR:', slug );
    const parts = slug.split('.');
    this.makeMessageFromSlug( slug, parts, this.messages, 0 );

    if ( this.response.message ) {
      return this.response;
    }

    return {
      code: 500,
      message: 'We have encountered an issue.',
      description: 'Sorry about that.',
    };
  }


  makeMessageFromSlug( slug, parts, data, level ) {
    if ( !data ) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const val = data[i];

      if ( val.slug === parts[level] ) {
        if ( val.code ) {
          this.response.code = val.code;
        }

        if ( val.message && val.message !== '' ) {
          this.response.message = val.message;
        }

        if ( val.description && val.description !== '' ) {
          this.response.description = val.description;
        }

        if ( val.children ) {
          this.makeMessageFromSlug( slug, parts, val.children, level + 1 );
        }
      }
    }
  }
}
