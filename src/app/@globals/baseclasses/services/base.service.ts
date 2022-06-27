import { Injectable } from '@angular/core';
import {SharedBase} from '../shared.base';

@Injectable({
  providedIn: 'root',
})
export class BaseService extends SharedBase {

  constructor() {
    super();
  }
}
