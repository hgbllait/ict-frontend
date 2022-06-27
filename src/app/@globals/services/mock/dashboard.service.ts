import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Chart {
    class: string;
    title: string;
    value: number;
    path: string;
}

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    constructor(private http: HttpClient) {
    }

    getData(term: string = null): Observable<Chart[]> {
        let items = getMockData();
        if (term) {
            items = items.filter(x => x.title.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockData() {
    return [
        {
            class: "bg-primary",
            title: "Total Individuals",
            value: 19553,
            path: '/citizens/list-detail-view'
        },
        {
            class: "bg-info",
            title: "Registered Families",
            value: 13423,
            path: '/families/list-detail-view'
        },
        {
            class: "bg-warning",
            title: "Programs Proposed",
            value: 89623,
            path: '/programs/list-detail-view'
        },
        {
            class: "bg-success",
            title: "Programs Implemented",
            value: 72654,
            path: '/programs/dashboard'
        }
    ];
}
