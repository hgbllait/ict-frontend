import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface ProgramUpdate {
    id: number;
    budget: number
    date: string;
    estimated_cost: number;
    actual_cost: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProgramUpdatesService {
    constructor(private http: HttpClient) {
    }

    getPrograms(term: string = null): Observable<ProgramUpdate[]> {
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
            "budget": 169893935,
            "date": "Week 1",
            "estimated_cost" : 149935049,
            "actual_cost" : 35393500
        },
        {
            "id" : 100001,
            "budget": 210077250,
            "date": "Week 2",
            "estimated_cost" : 190980000,
            "actual_cost" : 101987000
        },
        {
            "id" : 100002,
            "budget": 510468250,
            "date": "Week 3",
            "estimated_cost" : 491890076,
            "actual_cost" : 290765921
        },
        {
            "id" : 100003,
            "budget": 781789120,
            "date": "Week 4",
            "estimated_cost" : 681789120,
            "actual_cost" : 320876098
        },
        {
            "id" : 100004,
            "budget": 121196760,
            "date": "Week 5",
            "estimated_cost" : 120000000,
            "actual_cost" : 128798710
        },
        {
            "id" : 100005,
            "budget": 440306000,
            "date": "Week 6",
            "estimated_cost" : 393502500,
            "actual_cost" : 229543576
        },
        {
            "id" : 100006,
            "budget": 305309000,
            "date": "Week 7",
            "estimated_cost" : 290050272,
            "actual_cost" : 20911187
        },
        {
            "id" : 100007,
            "budget": 220154500,
            "date": "Week 8",
            "estimated_cost" : 190789000,
            "actual_cost" : 22789000
        },
        {
            "id" : 100008,
            "budget": 298154500,
            "date": "Week 9",
            "estimated_cost" : 280987600,
            "actual_cost" : 210917600
        },
        {
            "id" : 100009,
            "budget": 320154500,
            "date": "Week 10",
            "estimated_cost" : 300000000,
            "actual_cost" : 115000000
        },
        {
            "id" : 1000010,
            "budget": 55038625,
            "date": "Week 11",
            "estimated_cost" : 50000125,
            "actual_cost" : 4755125
        },

        {
            "id" : 1000011,
            "budget": 440306000,
            "date": "Week 12",
            "estimated_cost" : 393502500,
            "actual_cost" : 229543576
        },
        {
            "id" : 1000012,
            "budget": 55038625,
            "date": "Week 13",
            "estimated_cost" : 50000125,
            "actual_cost" : 387055474
        },
        {
            "id" : 1000013,
            "budget": 305309000,
            "date": "Week 14",
            "estimated_cost" : 290050272,
            "actual_cost" : 6889009
        },

        {
            "id" : 1000014,
            "budget": 169893935,
            "date": "Week 15",
            "estimated_cost" : 149935049,
            "actual_cost" : 35393500
        },

    ];
}