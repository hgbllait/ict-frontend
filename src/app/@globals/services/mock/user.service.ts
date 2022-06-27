import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface User {
  name: string;
  head: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getData(term: string = null): Observable<User[]> {
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
      name: 'albert.macatiog@gmail.com',
      head: 'George Albert',
      date: '06-10-2012'
    },
    {
      name: 'email@gmail.com',
      head: 'Albert Mac',
      date: '04-10-2019'
    },
    {
      name: 'dianne@gmail.com',
      head: 'Dianne Chris',
      date: '06-20-2018'
    },
    {
      name: 'jan@gmail.com',
      head: 'Jan Dayanan',
      date: '01-01-2011'
    },
    {
      name: 'vito@gmail.com',
      head: 'Vito Saavedra',
      date: '04-02-2013'
    },
    {
      name: 'sheena@gmail.com',
      head: 'Sheena Mae',
      date: '08-02-2008'
    },
  ];
}
