import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface FamilyMember {
    id: number;
    date: string;
    total_family: number
    registered_family: number;
}

@Injectable({
    providedIn: 'root'
})
export class FamilyService {
    constructor(private http: HttpClient) {
    }

    getPrograms(term: string = null): Observable<FamilyMember[]> {
        let items = getMockProgramsUpdate();
        if (term) {
            items = items.filter(x => x.date.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockProgramsUpdate() {
    return [
        {
            "id" : 100000,
            "date": "April",
            "total_family": 50220,
            "registered_family":19287
        },
        {
            "id" : 100001,
            "date": "May",
            "total_family": 104098,
            "registered_family":22098
        },
        {
            "id" : 100002,
            "date": "June",
            "total_family": 150200,
            "registered_family":25178
        },
        {
            "id" : 100003,
            "date": "July",
            "total_family": 162987,
            "registered_family":26987
        },
        {
            "id" : 100004,
            "date": "August",
            "total_family": 60586,
            "registered_family":56655
        }


    ];
}