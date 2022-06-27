import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Report {
  id: number;
  name: string;
  created_by: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private http: HttpClient) {
  }

  getData(term: string = null): Observable<Report[]> {
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
      "name" : "Year-to-date Cost Allocation Report",
      "report": {
        "from" : "2019-01-01",
        "to" : "present",
        "data": [

        ]
      },
      "created_by" : "George",
      "created_at" : "Davao City"
    },
    {
      "id" : 100001,
      "name" : "Budget Demographics Report",
      "report": {
        "config": {
          "url": "reports.demographics.budget",
        },
        filters: [
          {
            name: 'data',
            description: 'Date',
            value: '',
            class : 'col-sm-8',
            type: '',
            element: 'div',
            children: {
              from: {
                name: 'from',
                description: 'From',
                value: '2019-01-01',
                class : 'col-sm-6',
                type: 'text',
                element: 'datepicker',
                children: {}
              },
              to: {
                name: 'to',
                description: 'To',
                value: 'now',
                class : 'col-sm-6',
                type: 'text',
                element: 'datepicker',
                children: {}
              }
            }
          },
          {
            name: 'age',
            description: 'Age',
            value: 'present',
            class : 'col-sm-4',
            type: 'text',
            element: 'input',
            children: {}
          },
          {
            name: 'municipality',
            description: 'Municipality',
            value: 'present',
            class : 'col-sm-6',
            type: 'text',
            element: 'input',
            children: {}
          }
        ],
        "data": [
          {
            "type": "graph"
          }
        ]
      },
      "created_by" : "Albert",
      "created_at" : "Tagum City"
    },
    {
      "id" : 100002,
      "name" : "Report 458935",
      "created_by" : "Obet",
      "created_at" : "Cagayan de Oro City"
    },
    {
      "id" : 100003,
      "name" : "Report 934672",
      "created_by" : "Melody",
      "created_at" : "Malaybalay Bukidnon"
    },
    {
      "id" : 100004,
      "name" : "Year-to-date Actual Cost Report",
      "report": {
        "from" : "2019-01-01",
        "to" : "present",
        "data": [

        ]
      },
      "created_by" : "Joy",
      "created_at" : "Montevista, Compostella Valley"
    },
    {
      "id" : 100006,
      "name" : "Report 456893",
      "created_by" : "George",
      "created_at" : "Maragusan, Compostella Valley"
    },
    {
      "id" : 100007,
      "name" : "Report 784578",
      "created_by" : "Joanna",
      "created_at" : "Digos City"
    },
    {
      "id" : 100009,
      "name" : "Report 894578",
      "created_by" : "Merla",
      "created_at" : "Calinan, Davao City"
    },
    {
      "id" : 100010,
      "name" : "Report 894567",
      "created_by" : "Teofilo",
      "created_at" : "Iligan City"
    },
    {
      "id" : 100011,
      "name" : "Report 357532",
      "created_by" : "Michael",
      "created_at" : "Zamboanga City"
    },
    {
      "id" : 100012,
      "name" : "Report 893467",
      "created_by" : "Jeffrey",
      "created_at" : "Kidapawan City"
    }
  ];
}
