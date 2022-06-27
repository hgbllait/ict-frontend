import { FormGroup, ValidationErrors } from '@angular/forms';
import { Injectable, Pipe} from '@angular/core';
import {StringHelper} from '../native/string.helpers';

@Injectable({
  providedIn: 'root'
})
export class DevLogHelper {
  protected class = 'GENERIC';
  protected type = 'log';

  constructor( protected str: StringHelper ) {}

  setClass( name: string ) {
    this.class = name;
    return this;
  }

  setType( type: string ) {
    this.type = type;
    return this;
  }

  var( ...data: any[] ) {
    const dump = {
      type: 'VAR',
      data
    };

    this.log( dump, this.type );
  }

  log( data, type: string= 'log' ) {
    switch ( type ) {
      case 'error':
      case 'log':
      case 'info':
      case 'warn':
        console[ type ]( this.str.wrapIn( this.class, 'brackets' ) , data );
        break;
    }
  }
}
