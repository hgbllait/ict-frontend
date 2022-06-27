import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Settings {
  name: string;
  head: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(private http: HttpClient) {
  }

  getData(term: string = null): Observable<Settings[]> {
    let items = getMockData();
    if (term) {
      items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  }
}

function getMockData() {
  return [
    {
      name: 'Connect Printer',
      head: 'Jasper James',
      date: '04-15-1996',
    },
    {
      name: 'Share Printer',
      head: 'James Jose',
      date: '01-15-1996',
    },
    {
      name: 'Use Printer',
      head: 'George Albert',
      date: '02-15-1996',
    },
    {
      name: 'Remove Printer',
      head: 'Gylde Lpiz',
      date: '03-15-1996',
    },
    {
      name: 'Connect Monitor',
      head: 'Albert Martinez',
      date: '04-15-1996',
    },
    {
      name: 'Use Monitor',
      head: 'Dianne Chris',
      date: '05-15-1996',
    },
    {
      name: 'Share Screen',
      head: 'Jan Dayanan',
      date: '06-15-1996',
    }
  ];
}
