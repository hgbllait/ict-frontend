import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import {Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {RequestFormService} from "../../@globals/services/api/request-form";
import {ActionItemSchema, StandardResponse} from "../../@globals/models";
import Swal from "sweetalert2";

@Component({
  selector: 'pg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  result: any;
  onState: boolean = false;
  constructor(
    private titleService:Title,
    private data_service: RequestFormService) {
    this.titleService.setTitle("Dashboard | "+`${environment.APP_NAME}`);
  }

  ngOnInit(){
    this.rerender();
  }

  fetchDashboard() {
    return this.data_service.execute(
      {
        slug: 'v1.dashboard',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        __response: {
          200: 'Successfully retrieved dashboard.',
        },
      },
    );
  }

  handleAction($event: ActionItemSchema) {
    console.log('flowControlRequests ACTION:', $event);
    switch ( $event.action ) {
      case 'approver_approve':
        Swal.fire({
          title: 'Are you sure?',
          text: "You want to override approve this request?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'maroon',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed.'
        }).then((result) => {
          if (result.isConfirmed) {
            this.onState = false;
            return this.data_service.execute(
              {
                slug: 'v1.flow_control.requests.request_id.approvers.approve',
                exception: {
                  message: 'Ooopssss. Something went wrong! We will get back to you.',
                  class: 'error',
                  type: 'none',
                },
              },
              {
                id: $event.data.id,
                request_id: $event.data.flow_control_request_id,
                override: true,
                __response: {
                  200: 'Successfully approved a request.',
                },
              },
            ).subscribe((result: StandardResponse) => {
              if ( result.code === 200 ) {
                Swal.fire(
                  'Notification',
                  'Successfully approved a request.',
                  'success'
                ).then(() => {
                  this.rerender();
                });
              }
            }, error => {
              Swal.fire(
                'Failed',
                'Failed to override approve a request.',
                'error'
              )
            });
          }
        });
        break;
      case 'approver_reject':
        Swal.fire({
          title: 'Are you sure?',
          text: "You want to override reject this request?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'maroon',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed.'
        }).then((result) => {
          if (result.isConfirmed) {
            this.onState = false;
            return this.data_service.execute(
              {
                slug: 'v1.flow_control.requests.request_id.approvers.reject',
                exception: {
                  message: 'Ooopssss. Something went wrong! We will get back to you.',
                  class: 'error',
                  type: 'none',
                },
              },
              {
                request_id: $event.data.flow_control_request_id,
                id: $event.data.id,
                override: true,
                __response: {
                  200: 'Successfully rejected a request.',
                },
              },
            ).subscribe((result: StandardResponse) => {
              if ( result.code === 200 ) {
                Swal.fire(
                  'Notification',
                  'Successfully rejected a request.',
                  'success'
                ).then(() => {
                  this.rerender();
                });
              }
            }, error => {
              Swal.fire(
                'Failed',
                'Failed to override reject a request.',
                'error'
              )
            });
          }
        });
        break;
    }
  }

  rerender(){
    this.fetchDashboard()
      .subscribe(
        (result: StandardResponse) => { // Success
          this.onState = true;
          this.result = result.data;
          console.log(this.result);
        },
        error => { // Error
          console.log(error);
        });
  }
}
