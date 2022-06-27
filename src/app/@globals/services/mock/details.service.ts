import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Details {
  name: string;
  description: string;
  class: string;
  type: string;
  element: string;
  children: object;
}

@Injectable({
    providedIn: 'root'
})
export class DetailsService {
  details = []
    constructor(private http: HttpClient) {
    }

    getData(term: string = null): Observable<Details[]> {
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
        name: 'birthdate',
        description: 'Birthdate',
        class: 'col-sm-4',
        type: 'text',
        element: 'datepicker',
        children: []
      },
      // {
      //   name: 'age',
      //   description: 'Age',
      //   class: 'col-sm-4',
      //   type: 'number',
      //   element: 'input',
      //   children: []
      // },
      {
        name: 'gender',
        description: 'Gender',
        class: 'col-sm-4',
        type: '',
        element: 'select',
        children: [
          {
            name: 'male',
            description: 'Male',
            class: '',
            type: '',
            element: 'option',
            children: []
          },
          {
            name: 'female',
            description: 'Female',
            class: '',
            type: '',
            element: 'option',
            children: []
          }
        ]
      },
      {
        name: 'address',
        description: 'Address',
        class : 'col-sm-12',
        type: '',
        element: 'div',
        children: [
          {
            name: 'lot',
            description: 'Lot',
            class: 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'street',
            description: 'Street',
            class: 'col-sm-8',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'barangay',
            description: 'Barangay',
            class: 'col-sm-12',
            type: '',
            element: '',
            children: []
          },
          // {
          //   name: 'city',
          //   description: 'City',
          //   class: 'col-sm-4',
          //   type: 'text',
          //   element: 'input',
          //   children: []
          // },
          // {
          //   name: 'province',
          //   description: 'Province',
          //   class: 'col-sm-4',
          //   type: 'text',
          //   element: 'input',
          //   children: []
          // }
        ]
      },
      {
        name: 'contact',
        description: 'Contact',
        class: 'col-sm-12',
        type: '',
        element: 'div',
        children: [
          {
            name: 'mobile',
            description: 'Mobile',
            class: 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'telephone',
            description: 'Telephone',
            class: 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'email',
            description: 'Email',
            class: 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
        ]
      },
      {
        name: 'emergency',
        description: 'Emergency',
        class: 'col-sm-12',
        type: 'text',
        element: 'div',
        children: [
          {
            name: 'emergency_name',
            description: 'Emergency Person Name',
            class: 'col-sm-8',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'emergency_number',
            description: 'Contact Number',
            class: 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          }
        ]
      },
      {
        name: 'occupation',
        description: 'Occupation',
        class: 'col-sm-12',
        type: 'text',
        element: 'input',
        children: []
      },
      // {
      //   name: 'sample',
      //   description: 'Sample',
      //   class: 'col-sm-12',
      //   type: 'text',
      //   element: 'input',
      //   children: []
      // },
      // {
      //   name: 'sample2',
      //   description: 'Sample2',
      //   class: 'col-sm-12',
      //   type: 'text',
      //   element: 'input',
      //   children: []
      // },
    ];
}
