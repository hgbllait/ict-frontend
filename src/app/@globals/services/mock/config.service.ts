import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Config {
  form: string;
  meta: object;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
  details = [];
    constructor(private http: HttpClient) {
    }

    getData(term: string = null): Observable<Config[]> {
        let items = getMockData();
        if (term) {
            items = items.filter(x => x.form.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }
}

function getMockData() {
    return [
      {
        form: 'details',
        meta: [
          {
            name: 'first_name',
            description: 'First Name',
            class : 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'middle_name',
            description: 'Middle Name',
            class : 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'last_name',
            description: 'Last Name',
            class : 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'birthdate',
            description: 'Birthdate',
            class: 'col-sm-4',
            type: 'text',
            element: 'datepicker',
            children: []
          },
          {
            name: 'age',
            description: 'Age',
            class: 'col-sm-4',
            type: 'number',
            element: 'input',
            children: []
          },
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
                class: 'col-sm-4',
                type: 'text',
                element: 'input',
                children: []
              },
              {
                name: 'city',
                description: 'City',
                class: 'col-sm-4',
                type: 'text',
                element: 'input',
                children: []
              },
              {
                name: 'province',
                description: 'Province',
                class: 'col-sm-4',
                type: 'text',
                element: 'input',
                children: []
              }
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
                name: 'contact_number',
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
              }
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
          {
            name: 'sample',
            description: 'Sample',
            class: 'col-sm-12',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'sample2',
            description: 'Sample2',
            class: 'col-sm-12',
            type: 'text',
            element: 'input',
            children: []
          },
        ]
      },
      {
        form: 'define-view-citizens',
        meta: [
          {
            name: 'first_name',
            description: 'First Name',
            class : 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'middle_name',
            description: 'Middle name',
            class : 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'last_name',
            description: 'Last Name',
            class : 'col-sm-4',
            type: 'text',
            element: 'input',
            children: []
          },
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
                name: 'contact_number',
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
        ]
      },
      {
        form: 'search-families',
        meta: [
          {
            name: 'name',
            description: 'Family Name',
            class : 'col-sm-12',
            type: 'text',
            element: 'input',
            children: []
          },
        ]
      },
      {
        form: 'define-view-families',
        meta: [
          {
            name: 'name',
            description: 'Family Name',
            class : 'col-sm-12',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'origin',
            description: 'Family Origin',
            class : 'col-sm-12',
            type: 'text',
            element: 'input',
            children: []
          }
        ]
      },
      {
        form: 'define-view-programs',
        meta: [
          {
            name: 'name',
            description: 'Program Name',
            class : 'col-sm-12',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'program_type',
            description: 'Program Type',
            class : 'col-sm-6',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'cost_allocated',
            description: 'Cost Allocation',
            class : 'col-sm-6',
            type: 'number',
            element: 'input',
            children: []
          },
          {
            name: 'start_date',
            description: 'Start',
            class : 'col-sm-4',
            type: 'text',
            element: 'datepicker',
            children: []
          },
          {
            name: 'end_date',
            description: 'End',
            class : 'col-sm-4',
            type: 'text',
            element: 'datepicker',
            children: []
          },
        ]
      },
      {
        form: 'data-programs',
        meta: [
          {
            name: 'name',
            description: 'Program Name',
            class : 'col-sm-12',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'program_type',
            description: 'Program Type',
            class : 'col-sm-6',
            type: 'text',
            element: 'input',
            children: []
          },
          {
            name: 'cost_actual',
            description: 'Budget',
            class : 'col-sm-6',
            type: 'text',
            element: 'input',
            children: []
          },
        ]
      },
    ];
}
