import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFromNow' })
export class MomentHumanizePipe implements PipeTransform {
  transform(value: Date | moment.Moment, dateFormat: string): any {
    return moment(value).fromNow();
  }
}
