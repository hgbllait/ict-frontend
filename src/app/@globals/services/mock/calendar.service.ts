import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Events {
    title: string;
    start: string;
    end: string;
}

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    constructor(private http: HttpClient) {
    }

    getEvents(term: string = null): Observable<Events[]> {
        let items = getMockEvents();
        if (term) {
            items = items.filter(x => x.title.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockEvents() {
    return [
      {
        title: 'Releasing program funds',
        start: '2019-09-01',
        end: '2019-09-01'
      },
      {
        title: 'K to 12 Educational programs',
        start: '2019-09-11',
        end: '2019-09-13',
        color: 'purple'
      },
      {
        title: 'PAMANA Program fundings',
        start: '2019-09-06',
        end: '2019-09-07'
      },
      {
        title: 'Orientation for Project NOAH',
        start: '2019-09-13T07:00:00',
        end: '2019-09-13',
        color: 'red'
      },
      {
        title: 'Workshop for Responsible Parenthood',
        start: '2019-09-15',
        end: '2019-09-15',
        color: 'purple'
      }
    ]
}