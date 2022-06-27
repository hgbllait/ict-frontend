import { FormGroup, ValidationErrors } from '@angular/forms';
import { Injectable, Pipe} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringHelper {
  trimWhiteSpaces(input: string) {
    return input.split(' ').join('');
  }

  wrapIn(input: string, type: WrapTypes = 'parenthesis' ) {
    let wrap = '';

    switch ( type ) {
      case 'parenthesis': wrap = '()'; break;
      case 'brackets': wrap = '[]'; break;
      case 'curls': wrap = '{}'; break;
      case 'arrows': wrap = '<>'; break;
    }

    return wrap.slice(0) + input + wrap.slice(1);
  }
}

export type WrapTypes = 'parenthesis'|'brackets'|'curls'|'arrows';
