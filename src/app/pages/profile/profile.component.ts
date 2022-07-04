import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActionItemSchema, StandardResponse} from "../../@globals/models";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {SpinnerService} from "../../@globals/helpers/ui/loader/loader.helper";
import {AuthenticationService} from "../../@globals/services/api/auth";
import {RequestFormService} from "../../@globals/services/api/request-form";
import {Subject} from "rxjs";
import Responsive from 'datatables.net-responsive';
@Component({
  selector: 'pg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('signature') modalSignature: TemplateRef<any>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  modalReference: any;
  open: boolean = false;
  user: any = {
    logs: [],
    username: '...',
    created_at: '...',
    employee: {
      first_name: '...',
      last_name: '...',
      position: '...',
      address: '...',
      email: '...',
      contact_number: '...'
    }
  };
  form_data: any = {};
  form1 = {
    data: {},
    group: {
      invalid: true
    },
    field: {},
    field_array: {},
    data_array: {}
  };
  form2 = {
    data: {},
    group: {
      invalid: true
    },
    field: {},
    field_array: {},
    data_array: {}
  };
  approverId: number;
  form_alert: any = {
    show: false
  };
  defaultESig;

  constructor(private cd: ChangeDetectorRef,
              public authService: AuthenticationService,
              private data_service: RequestFormService,
              private modalService: NgbModal,
              private titleService: Title,
              private httpClient: HttpClient,
              public spinner: SpinnerService) {
    this.titleService.setTitle("Signature | " + `${environment.APP_NAME}`);
    this.approverId = 1;
  }

  ngOnInit() {
    this.dtOptions = {
      responsive: {
        details: {
          renderer: Responsive.renderer.listHiddenNodes()
        }
      },
      dom: '<"top"i>rt<"bottom"p><"clear">',
      lengthMenu: [[5, 10, 20, -1], [5, 25, 20, "All"]],
      pagingType: 'full_numbers',
      pageLength: 5,
      order: [],
      processing: true,
      autoWidth: false,
    };

    let result = this.data_service.execute(
      {
        slug: 'v1.users.fetch-personal',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        id: this.authService.currentUserValue.user.id,
        __response: {
          200: 'Successfully retrieved personal information.',
        },
      },
    ).subscribe(async (result: StandardResponse) => {
      if (result.code === 200) {
        this.open = true;
        this.user = result.data.user;
        this.form_data['id'] = result.data.user.employee.id;
        this.form1.data = {
          first_name: result.data.user.employee.first_name,
          last_name: result.data.user.employee.last_name,
          position: result.data.user.employee.position,
          address: result.data.user.employee.address
        };
        this.form_data = {
          ...this.form_data,
          ...this.form1.data
        }
        this.form2.data['email'] = result.data.user.employee.email;
        this.form2.data['contact_number'] = result.data.user.employee.contact_number;
        this.form_data = {
          ...this.form_data,
          ...this.form2.data
        }
        this.defaultESig = result.data.signature;
        this.dtTrigger.next();
      }
    }, (error) => {
    });

    console.log(result);

    this.form1.field = {
      "models": [],
      "endpoint": '',
      "bindings": ["first_name", "last_name", "position", "address"],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "first_name",
          "type": "text",
          "ui": {
            "label": "First Name",
            "placeholder": "First Name",
            viewMode: {
              advance: {
                div: ["col-md-12", "col-sm-12"]
              }
            },
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "last_name",
          "type": "text",
          "ui": {
            "label": "Last Name",
            "placeholder": "Last Name",
            viewMode: {
              advance: {
                div: ["col-md-12", "col-sm-12"]
              }
            },
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "position",
          "type": "text",
          "ui": {
            "label": "Position",
            "placeholder": "Position",
            viewMode: {
              advance: {
                div: ["col-md-12", "col-sm-12"]
              }
            },
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "address",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 10,
              "cols": 50
            }
          },
          "ui": {
            "label": "Address:",
            "placeholder": "Address",
            "viewMode": {
              "advance": {
                "div": ["col-md-12", "col-sm-12"]
              }
            }
          },
          "validators": {
            "required": true
          }
        }
      ]
    };
    this.form2.field = {
      "models": [],
      "endpoint": '',
      "bindings": ["email", "contact_number"],
      "fields": [
        {
          "name": "email",
          "type": "text",
          "ui": {
            "label": "Email:",
            "placeholder": "Email",
            viewMode: {
              advance: {
                div: ["col-md-12", "col-sm-12"]
              }
            },
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "contact_number",
          "type": "text",
          "ui": {
            "label": "Contact No.:",
            "placeholder": "Contact No.",
            viewMode: {
              advance: {
                div: ["col-md-12", "col-sm-12"]
              }
            },
          },
          "validators": {
            "required": true
          }
        },
      ]
    };


  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onClickSignature() {
    this.modalReference = this.modalService.open(this.modalSignature, {size: 'lg'});
  }

  onSubmit() {
    console.log(this.form_data);
    this.data_service.execute(
      {
        slug: 'v1.employees.define',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      this.form_data
    ).subscribe(async (result: StandardResponse) => { // Success
      this.form_alert = {
        shown: true,
        messages: result.message,
        type: 'success',
      };
    }, async error => { // Error
      this.form_alert = {
        shown: true,
        messages: error.message,
        type: 'danger',
      };
    });

  }

  handleData( $event: {data, form}, step ) {
    this.form_data = {
      ...this.form_data,
      ...$event.data
    }
    switch ( step ) {
      case 1:
        this.form1.group = $event.form;
        this.form1.data = {
          ...this.form1.data,
          ...$event.data,
        };
        break;
      case 2:
        this.form2.group = $event.form;
        this.form2.data = $event.data;
        break;
    }
  }

  handleAction($event: ActionItemSchema) {
    console.log('FormRequests ACTION:', $event);
    switch ( $event.action ) {
      case 'add_form_request':
        break;
      case 'update_form_request':
        break;
      case 'table_update':
        break;
      case 'table_action_update':
        break;
      case 'table_action_delete':
        break;
      case 'draw-signature':
        var file = new File([$event.value], 'signature.png');
        var formData: FormData = new FormData();
        console.log('formData', formData);
        // @ts-ignore
        formData.append('approver_id', this.approverId);
        formData.append('file', file);
        this.spinner.show();
        this.httpClient
          .post<any>('http://localhost:8000/api/v1/utilities/files/upload', formData)
          .subscribe((result: StandardResponse) => {
            this.spinner.hide();
            if (result.code === 200) {
              this.defaultESig = result.data.signature
              this.modalReference.close();
              Swal.fire({
                title: 'Notification',
                icon: 'success',
                showConfirmButton: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                html: result.message,
              });
            }
          }, (error) => {
            this.spinner.hide();
            Swal.fire({
              title: 'Failed',
              icon: 'error',
              showConfirmButton: true,
              allowOutsideClick: true,
              allowEscapeKey: true,
              html: error.error.message,
            });
          });
        break;
      case 'upload-signature':
        var formData: FormData = new FormData();
        // @ts-ignore
        formData.append('approver_id', this.approverId);
        formData.append('file', $event.value);
        this.spinner.show();
        this.httpClient
          .post<any>('http://localhost:8000/api/v1/utilities/files/upload', formData)
          .subscribe((result: StandardResponse) => {
            this.spinner.hide();
            if (result.code === 200) {
              this.defaultESig = result.data.signature
              this.modalReference.close();
              Swal.fire({
                title: 'Notification',
                icon: 'success',
                showConfirmButton: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                html: result.message,
              });
            }
          }, (error) => {
            this.spinner.hide();
            Swal.fire({
              title: 'Failed',
              icon: 'error',
              showConfirmButton: true,
              allowOutsideClick: true,
              allowEscapeKey: true,
              html: error.error.message,
            });
          });
        break;
    }
  }

}
