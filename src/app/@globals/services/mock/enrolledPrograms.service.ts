import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface EnrolledProgram {
    hash: string;
    program_id: number;
    date_enrolled: string;
}

@Injectable({
    providedIn: 'root'
})
export class EnrolledProgramsService {
    constructor(private http: HttpClient) {
    }

    getPrograms(term: string = null): Observable<EnrolledProgram[]> {
        let items = getMockData();
        if (term) {
            items = items.filter(x => x.hash.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockData() {
    return [
        {
            "hash" : 'x7ITHCfRkgBfRTKA3hijCQ8mtKKMjXTfhZvlL',
            "program_id" : 10000,
            "date_enrolled": "2011-06-17",
        },
        {
          "hash" : 'lf2jvYpnDqkgoOGID',
          "program_id" : 10000,
          "date_enrolled": "2011-06-17",
        },
        {
          "hash" : '1jHhTi7XbwHCNuoJb47o8HEq3EmO52sddgMPC',
          "program_id" : 10000,
          "date_enrolled": "2011-06-17",
        },
        {
          "hash" : 'kCB3Xhy1j7hhrgMTtrnDrAo',
          "program_id" : 10000,
          "date_enrolled": "2011-06-17",
        },
        {
            "hash" : 'x7ITHCfRkgBfRTKA3hijCQ8mtKKMjXTfhZvlL',
            "program_id" : 100001,
            "date_enrolled": "2015-09-01",
        },
        {
          "hash" : 'H3GjD0cWvXWATMLyKZ',
          "program_id" : 100001,
          "date_enrolled": "2015-09-01",
        },
        {
          "hash" : 'W86kq9PxB3uQQb6AvHzSunI',
          "program_id" : 100001,
          "date_enrolled": "2015-09-01",
        },
        {
          "hash" : 'qa0qhO8447L0LEQRgf9P99P9',
          "program_id" : 100001,
          "date_enrolled": "2015-09-01",
        },
        {
            "hash" : 'mNFTNTYC9W5mcWxEJ30RmYMC',
            "program_id" : 100002,
            "date_enrolled": "2012-05-05",
        },
        {
          "hash" : 'WlS8LFynUst0o8ee4z6IPQe7Jug8zdjAe',
          "program_id" : 100002,
          "date_enrolled": "2012-05-05",
        },
        {
            "hash" : 'SUzjq2kQBxzEfOBhZ45QQN9TRvfh',
            "program_id" : 100003,
            "date_enrolled": "2017-08-12",
        },
        {
          "hash" : 'XcD72qpGK8wV0HaP',
          "program_id" : 100003,
          "date_enrolled": "2017-08-12",
        },
        {
          "hash" : 'ztd0cIAe67uM7iEGs0p4ef36j6',
          "program_id" : 100003,
          "date_enrolled": "2017-08-12",
        },
        {
            "hash" : 'yZNfLufnojQ4liKNVgXyRVEKZup2UBijr4',
            "program_id" : 100004,
            "date_enrolled": "2018-02-25",
        },
        {
          "hash" : 'wkwAACWXZMU5JRGzUNZlRBF6l6vVdq',
          "program_id" : 100004,
          "date_enrolled": "2018-02-25",
        },
        {
          "hash" : 'EIfbw18epI8vNfVzegd',
          "program_id" : 100004,
          "date_enrolled": "2018-02-25",
        },
        {
          "hash" : 'vKXixyzyIDBPDQTyPXPIM',
          "program_id" : 100004,
          "date_enrolled": "2018-02-25",
        },
        {
          "hash" : 'dO1W09Cc5UGQow',
          "program_id" : 100004,
          "date_enrolled": "2018-02-25",
        },
        {
            "hash" : 'yZNfLufnojQ4liKNVgXyRVEKZup2UBijr4',
            "program_id" : 100006,
            "date_enrolled": "2011-03-14",
        },
        {
            "hash" : 'LjfOeAKwO4LMjCYqs8TS4XFVSMO8Dro',
            "program_id" : 100007,
            "date_enrolled": "2018-07-02",
        },
        {
            "hash" : 'bjUITc1owNQ2NGCwGSegF89WtV',
            "program_id" : 100009,
            "date_enrolled": "2016-06-12",
        },
        {
            "hash" : 'hnv2vDoAutxaHWdA7qvA6aYyiUz7W',
            "program_id" : 100010,
            "date_enrolled": "2010-11-08",
        },
        {
          "hash" : 'sLvbhldO4vE7ZBEhu15v1oNIAnc61Ii',
          "program_id" : 100010,
          "date_enrolled": "2010-11-08",
        },
        {
            "hash" : 'sLvbhldO4vE7ZBEhu15v1oNIAnc61Ii',
            "program_id" : 100011,
            "date_enrolled": "2014-08-23",
        },
        {
            "hash" : 'HkLTydUm6J6BYxROx3',
            "program_id" : 100012,
            "date_enrolled": "2012-08-22",
        }
    ];
}
