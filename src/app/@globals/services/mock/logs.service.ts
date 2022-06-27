import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Logs {
    date: string;
    description: string;
    type: string;
}

@Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor(private http: HttpClient) {
    }

    getLogs(term: string = null): Observable<Logs[]> {
        let items = getMockLogs();
        if (term) {
            items = items.filter(x => x.date.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockLogs() {
    return [
        {
            "date": "2019-09-01",
            "description" : "Pantawid Pamilyang Pilipino Program (CCT)",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-01",
            "description" : "Pantawid Pamilyang Pilipino Program (CCT)",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-01",
            "description" : "PAMANA Project",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-01",
            "description" : "Pantawid Pamilyang Pilipino Program (CCT)",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-01",
            "description" : "The People’s Budget",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-01",
            "description" : "The People’s Budget",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-02",
            "description" : "Pantawid Pamilyang Pilipino Program (CCT)",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-02",
            "description" : "PAMANA Project",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-02",
            "description" : "Responsible Parenthood",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-02",
            "description" : "Pantawid Pamilyang Pilipino Program (CCT)",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-02",
            "description" : "The People’s Budget",
            "type" : "Add Requirements"
        },

        {
            "date": "2019-09-02",
            "description" : "Public-Private Partnership",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-02",
            "description" : "PAMANA Project",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-03",
            "description" : "Responsible Parenthood",
            "type" : "Add Requirements"
        },
        {
            "date": "2019-09-03",
            "description" : "Pantawid Pamilyang Pilipino Program (CCT)",
            "type" : "Add Requirements"
        }

    ];
}