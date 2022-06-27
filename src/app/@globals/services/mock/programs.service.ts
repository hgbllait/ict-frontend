import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Program {
    id: number;
    name: string;
    budget: number;
    type: string;
    date_started: string;
    actual_cost: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProgramsService {
    constructor(private http: HttpClient) {
    }

    getPrograms(term: string = null): Observable<Program[]> {
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
            "id" : 100000,
            "name" : "Human Development and Poverty Reduction Cluster",
            "budget": 19834154223,
            "estimated_cost" : 19234754223,
            "type" : "Social Welfare",
            "date_started": "2011-06-17",
            "actual_cost" : 10234754223
        },
        {
            "id" : 100001,
            "name" : "Pantawid Pamilyang Pilipino Program (CCT)",
            "budget": 11788950006,
            "estimated_cost" : 11288750006,
            "type" : "Social Welfare",
            "date_started": "2015-09-01",
            "actual_cost" : 10288750006
        },
        {
            "id" : 100002,
            "name" : "K to 12 Basic Education",
            "budget": 25257696089,
            "estimated_cost" : 25257796089,
            "type" : "Social Welfare",
            "date_started": "2012-05-05",
            "actual_cost" : 21057796089
        },
        {
            "id" : 100003,
            "name" : "Responsible Parenthood",
            "budget": 11524261619,
            "estimated_cost" : 11224761619,
            "type" : "Social Welfare and Health",
            "date_started": "2017-08-12",
            "actual_cost" : 10224761619
        },
        {
            "id" : 100004,
            "name" : "Sin Taxes",
            "budget": 28801300811,
            "estimated_cost" : 28201700811,
            "type" : "Health",
            "date_started": "2018-02-25",
            "actual_cost" : 1571319939
        },
        {
            "id" : 100006,
            "name" : "Freedom of Information",
            "budget": 12376353252,
            "estimated_cost" : 12276753252,
            "type" : "Social Welfare",
            "date_started": "2011-03-14",
            "actual_cost" : 10276753252
        },
        {
            "id" : 100007,
            "name" : "The People’s Budget",
            "budget": 29734664074,
            "estimated_cost" : 2923476407,
            "type" : "Social Welfare",
            "date_started": "2018-07-02",
            "actual_cost" : 2453480639
        },
        {
            "id" : 100009,
            "name" : "PAMANA Program",
            "budget": 18705445958,
            "estimated_cost" : 1820574595,
            "type" : "Social Welfare",
            "date_started": "2016-06-12",
            "actual_cost" : 1520574595
        },
        {
            "id" : 100010,
            "name" : "Environment and Climate Change",
            "budget": 3842594799,
            "estimated_cost" : 324279479,
            "type" : "Environmental",
            "date_started": "2010-11-08",
            "actual_cost" : 304279479
        },
        {
            "id" : 100011,
            "name" : "Project NOAH",
            "budget": 10382553935,
            "estimated_cost" : 10282753935,
            "type" : "Environmental",
            "date_started": "2014-08-23",
            "actual_cost" : 10182753935
        },
        {
            "id" : 100012,
            "name" : "National Green Program",
            "budget": 8197389556,
            "estimated_cost" : 829778955,
            "type" : "Environmental",
            "date_started": "2012-08-22",
            "actual_cost" : 809778955
        }
    ];
}