import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Title} from "@angular/platform-browser";
import {ActionItemSchema, StandardResponse} from "../../@globals/models";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {BasePage} from "../../@globals/baseclasses/pages/base.page";
import {environment} from "../../../environments/environment";
import {RequestFormService} from "../../@globals/services/api/request-form";
import Swal from "sweetalert2";
import {AuthenticationService} from "../../@globals/services/api/auth";
import Responsive from 'datatables.net-responsive';

@Component({
  selector: 'pg-form-request',
  templateUrl: './flow-control-request.component.html',
  styleUrls: ['./flow-control-request.component.scss']
})

export class FlowControlRequestComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('flow_control_request') modalflowControlRequest: TemplateRef<any>;
  modalTitle: string;

  url: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  flow_control_requests: any = {};
  approvers: any;
  form_alert: any = {
    show: false
  };
  page_alert: any = {
    show: false
  };
  modalReference: any;
  data: any = {
    type: 'validator'
  };
  form_actions = {
    view: [],
    add: [
      {
        text: 'Submit',
        status: 'primary',
        target: 'add_flow_control_request',
        icon: 'ti-plus btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.flow_control.requests.define',
        action_type: 'define',
      },
    ],
    edit:  [
      {
        text: 'Update',
        status: 'primary',
        target: 'update_flow_control_request',
        icon: 'ti-file btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.flow_control.requests.define',
        action_type: 'define',
      },
    ],
  };
  formData = {
    button: this.form_actions.add,
    "endpoint": '',
    "bindings": ["employee_id", "name", "email"],
    "fields": [
      {
        "name": "id",
        "type": "hidden",
        "validators": {},
        "ui": {}
      },
      {
        "name": "type",
        "type": "hidden",
        "validators": {},
        "ui": {}
      },
      {
        "name": "employee_id",
        "type": "text",
        "ui": {
          "label":"Employee ID",
          "placeholder":"Employee ID",
          viewMode: {
            advance: {
              div: ["col-md-12","col-sm-12"]
            }
          },
        },
        "validators": {
          "required": true
        }
      },
      {
        "name": "name",
        "type": "text",
        "ui": {
          "label":"Name",
          "placeholder":"Name",
          viewMode: {
            advance: {
              div: ["col-md-12","col-sm-12"]
            }
          },
        },
        "validators": {
          "required": true
        }
      },
      {
        "name": "email",
        "type": "email",
        "ui": {
          "label":"Email",
          "placeholder":"Email",
          viewMode: {
            advance: {
              div: ["col-md-12","col-sm-12"]
            }
          },
        },
        "validators": {
          "required": true,
          "email": true
        }
      },
    ]
  };

  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private titleService:Title,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    super(authService);
    this.titleService.setTitle("Form Control Request | "+`${environment.APP_NAME}`);
  }

  ngOnInit() {
    if ( !this.page ) {
      this.page = {};
    }
    this.url = `${environment.FRONTEND_BASE_URL}`;
    // region Page settings
    // region Configuration
    this.page.endpoints = {
      fetch: 'v1.flow_control.requests.fetch',
    };

    this.page.indexes = {
      view: 'flow_control_request',
      update: 'flow_control_request',
      table: 'flow_control_request',
      data: 'data',
    };

    this.dtOptions = {
      responsive: {
        details: {
          renderer: Responsive.renderer.listHiddenNodes()
        }
      },
      lengthMenu: [ [5, 10, 20, -1], [5, 25, 20, "All"] ],
      pagingType: 'full_numbers',
      pageLength: 5,
      order:[],
      processing: true,
      autoWidth: false,
      columnDefs: [
        { width: "5%", targets: 5 },
        { width: "25%", targets: 3 },
        {
          render: function ( data, type, row, meta ) {
            let result = '<div class="badge badge-opacity-success me-3">Completed</div>';
            if(data === 'false') result = '<div class="badge badge-opacity-warning me-3">Pending</div>';
            return result;
          },
          targets: [ 4 ]
        }
      ]
    };
    this.fetchflowControlRequest()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.flow_control_requests = result.data.flow_control_request;
          this.dtTrigger.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  clearAlert(){
    this.page_alert = {
      shown: false
    };
    this.form_alert = {
      show:false
    };
  }

  fetchflowControlRequest() {
    return this.data_service.execute(
      {
        slug: 'v1.flow_control.requests.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        'relationship' : 'forms',
        'status' : true,
        'link' : true,
        __response: {
          200: 'Successfully retrieved flow_control_requests.',
        },
      },
    );
  }

  handleAction($event: ActionItemSchema) {
    console.log('flowControlRequests ACTION:', $event);
    switch ( $event.action ) {
      case 'add_flow_control_request':
        if($event.value === 'success'){
          this.page_alert = {
            shown: true,
            messages: $event.data.message,
            type: 'success',
          };
          this.modalReference.close();
          this.rerender();
        } else {
          this.form_alert = {
            shown: true,
            messages: $event.data.message,
            type: 'danger',
          };
        }
        break;
      case 'update_flow_control_request':
        if($event.value === 'success'){
          this.page_alert = {
            shown: true,
            messages: $event.data.message,
            type: 'success',
          };
          this.modalReference.close();
          this.rerender();
        } else {
          this.form_alert = {
            shown: true,
            messages: $event.data.message,
            type: 'danger',
          };
        }
        break;
      case 'table_update':
        this.data_service.call(this.page.endpoints.fetch, {id: $event.value})
          .subscribe(result => {
            const result_data = this.getResultData(result, this.page.indexes);
            this.data = result_data[0];
            this.formData.button = this.form_actions.edit;
            this.modalTitle = 'Update Form Request';
            this.modalReference = this.modalService.open(this.modalflowControlRequest, { size: 'md' });
            this.clearAlert();
          });
        break;
      case 'table_view':
        var approver = [];
        let value = $event.value;
        for (let i = 0; i < value.length; i++) {
          let status = value[i]['approval_status'];
          let icon = 'ti-time';
          let type = 'warning';
          if(status == 'approved') {
            icon = 'ti-thumb-up';
            type = 'success';
            status = 'Approved';
          }
          else if(status == 'rejected') {
            icon = 'ti-thumb-down';
            type = 'danger';
            status = 'Rejected';
          }
          else status = 'Pending';

          approver.push({
            'id' : value[i]['id'],
            'request_id' : value[i]['flow_control_request_id'],
            'request_status' : value[i]['approval_status'],
            'name' : value[i]['approver']['name'],
            'link': this.url+ '/form/'+ value[i]['_link'],
            'email' : value[i]['approver']['email'],
            'status' : status,
            'icon': icon,
            'type': type
          });
        }
        console.log(approver);
        this.approvers = approver;
        this.modalTitle = 'List of Signatories';
        this.modalReference = this.modalService.open(this.modalflowControlRequest, { size: 'md' });
        break;
      case 'table_action_delete':
        break;
      case 'approver_approve':
        Swal.fire({
          title: 'Are you sure?',
          text: "You want to approve this request?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'maroon',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed.'
        }).then((result) => {
          if (result.isConfirmed) {
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
                request_id: $event.data.request_id,
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
                  this.modalReference.close();
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
      case 'approver_notify':
        Swal.fire({
          title: 'Are you sure?',
          text: "You want to send a notification to this employee?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'maroon',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed.'
        }).then((result) => {
          if (result.isConfirmed) {
            return this.data_service.execute(
              {
                slug: 'v1.notifications.send-notification',
                exception: {
                  message: 'Ooopssss. Something went wrong! We will get back to you.',
                  class: 'error',
                  type: 'none',
                },
              },
              {
                approver_id: $event.data.id,
                request_id: $event.data.request_id,
                __response: {
                  200: 'Successfully send a notification.',
                },
              },
            ).subscribe((result: StandardResponse) => {
              if ( result.code === 200 ) {
                Swal.fire(
                  'Notification',
                  'Successfully send a notification.',
                  'success'
                )
              }
            }, error => {
              Swal.fire(
                'Failed',
                'Failed to send a notification.',
                'error'
              )
            });
          }
        });
        break;
      case 'approver_change_password':
        Swal.fire({
          title: 'Input the new password',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonColor: 'maroon',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
        }).then((result) => {
          if (result.isConfirmed) {
            let form_data = {
              target_id: $event.data.id,
              target_type: 'request_approver',
              meta_key: 'password',
              meta_value: result.value,
              override: true,
              __response: {
                200: 'Successfully updated form password.',
              }
            };
            form_data = this.setAddedBy('updated_by', form_data);
            return this.data_service.execute(
              {
                slug: 'v1.utilities.metas.define',
                exception: {
                  message: 'Ooopssss. Something went wrong! We will get back to you.',
                  class: 'error',
                  type: 'none',
                },
              },
              form_data
            ).subscribe((result: StandardResponse) => {
              if ( result.code === 200 ) {
                Swal.fire(
                  'Notification',
                  'Successfully update password.',
                  'success'
                ).then(() => {
                  this.modalReference.close();
                });
              }
            }, error => {
              Swal.fire(
                'Failed',
                'Failed to change signatory form password.',
                'error'
              )
            });
          }
        });
        break;
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.fetchflowControlRequest()
        .subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.flow_control_requests = result.data.flow_control_request;
            this.dtTrigger.next();
          }
        });
    });
  }

}
