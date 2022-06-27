import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Department {
    id: string;
    name: string;
    abbr: string;
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentsService {
    constructor(private http: HttpClient) {
    }

    getDepartments(term: string = null): Observable<Department[]> {
        let items = getMockDepartments();
        if (term) {
            items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockDepartments() {
    return [
        {
            "id": "10000",
            "name": "DAR",
            "abbr" : "DAR"
        },
        {
            "id": "10001",
            "name": "DA",
            "abbr" : "DA"
        },
        {
            "id": "10002",
            "name": "DBM",
            "abbr" : "DBM"
        },
        {
            "id": "10003",
            "name": "DepEd",
            "abbr" : "DepEd"
        },
        {
            "id": "10004",
            "name": "DOE",
            "abbr" : "DOE"
        },
        {
            "id": "10005",
            "name": "DENR",
            "abbr" : "DENR"
        },
        {
            "id": "10006",
            "name": "DOF",
            "abbr" : "DOF"
        },
        {
            "id": "10007",
            "name": "DFA",
            "abbr" : "DFA"
        },
        {
            "id": "10008",
            "name": "DOH",
            "abbr" : "DOH"
        },
        {
            "id": "10009",
            "name": "DHSUD",
            "abbr" : "DHSUD"
        },
        {
            "id": "10010",
            "name": "DICT",
            "abbr" : "DICT"
        },
        {
            "id": "10011",
            "name": "DILG",
            "abbr" : "DILG"
        }
    ]
}