import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Permission {
  name: string;
  head: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private http: HttpClient) {
  }

  getData(term: string = null): Observable<Permission[]> {
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
      flag: 'allow',
      date: '04-15-1996',
    },
    {
      name: 'Share Printer',
      head: 'James Jose',
      flag: 'deny',
      date: '01-15-1996',
    },
    {
      name: 'Use Printer',
      head: 'George Albert',
      flag: 'allow',
      date: '02-15-1996',
    },
    {
      name: 'Remove Printer',
      head: 'Gylde Lpiz',
      flag: 'allow',
      date: '03-15-1996',
    },
    {
      name: 'Connect Monitor',
      head: 'Albert Martinez',
      flag: 'deny',
      date: '04-15-1996',
    },
    {
      name: 'Use Monitor',
      head: 'Dianne Chris',
      flag: 'deny',
      date: '05-15-1996',
    },
    {
      name: 'Share Screen',
      head: 'Jan Dayanan',
      flag: 'allow',
      date: '06-15-1996',
    }
  ];
}
