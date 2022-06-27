import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Title} from "@angular/platform-browser";
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {ActionItemSchema, StandardResponse, User} from "../../../@globals/models";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import Responsive from 'datatables.net-responsive';

@Component({
  selector: 'pg-management-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('user') modalUser: TemplateRef<any>;
  modalTitle: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  users: User;
  form_alert: any = {
    show: false
  };
  page_alert: any = {
    show: false
  };
  modalReference: any;
  data: {};
  form_actions = {
    view: [],
    add: [
      {
        text: 'Submit',
        status: 'primary',
        target: 'add_user',
        icon: 'ti-plus btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.auth.register',
        action_type: 'define',
      },
    ],
    edit:  [
      {
        text: 'Update',
        status: 'primary',
        target: 'update_user',
        icon: 'ti-file btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.employees.define',
        action_type: 'define',
      },
    ],
  };
  formData = {};

  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private titleService:Title,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    super(authService);
  }

  ngOnInit() {
    if ( !this.page ) {
      this.page = {};
    }
    // region Page settings
    // region Configuration
    this.page.endpoints = {
      fetch: 'v1.employees.fetch',
    };

    this.page.indexes = {
      view: 'employee',
      update: 'employee',
      table: 'employee',
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
        { width: "5%", targets: 4 }
      ]
    };
    this.fetchUser()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.users = result.data.user;
          this.dtTrigger.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  addUser(content){
    this.clearAlert();
    this.data = {};
    this.formData = {
      button: this.form_actions.add,
      "endpoint": '',
      "bindings": [["first_name", "last_name"], ["contact_number", "email"], "address", ["username", "password"]],
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
            "label":"First Name",
            "placeholder":"First name",
            viewMode: {
              advance: {
                div: ["col-md-6","col-sm-6"]
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
            "label":"Last Name",
            "placeholder":"Last name",
            viewMode: {
              advance: {
                div: ["col-md-6","col-sm-6"]
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
                div: ["col-md-6","col-sm-6"]
              }
            },
          },
          "validators": {
            "required": true,
            "email": true
          }
        },
        {
          "name": "contact_number",
          "type": "number",
          "ui": {
            "label":"Contact No.",
            "placeholder":"Contact No.",
            viewMode: {
              advance: {
                div: ["col-md-6","col-sm-6"]
              }
            },
          },
          "validators": {
            "required": true,
            "number": true
          }
        },
        {
          "name": "address",
          "type": "textarea",
          "ui": {
            "label":"Address",
            "placeholder":"Address",
            viewMode: {
              advance: {
                div: ["col-md-12","col-sm-12"]
              }
            },
          },
          "validators": {
            "required": true,
          }
        },
        {
          "name": "username",
          "type": "text",
          "ui": {
            "label":"Username",
            "placeholder":"Username",
            viewMode: {
              advance: {
                div: ["col-md-6","col-sm-6"]
              }
            },
          },
          "validators": {
            "required": true,
          }
        },
        {
          "name": "password",
          "type": "password",
          "ui": {
            "label":"Password",
            "placeholder":"Password",
            viewMode: {
              advance: {
                div: ["col-md-6","col-sm-6"]
              }
            },
          },
          "validators": {
            "required": true,
          }
        },
      ]
    };
    this.modalTitle = 'Add User';
    this.modalReference = this.modalService.open(content, { size: 'lg' });
  }

  clearAlert(){
    this.page_alert = {
      shown: false
    };
    this.form_alert = {
      show:false
    };
  }

  fetchUser() {
    return this.data_service.execute(
      {
        slug: 'v1.users.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        __response: {
          200: 'Successfully retrieved user.',
        },
      },
    );
  }

  handleAction($event: ActionItemSchema) {
    console.log('Management ACTION:', $event);
    switch ( $event.action ) {
      case 'add_user':
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
      case 'update_user':
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
            this.formData = {
              button: this.form_actions.edit,
              "endpoint": '',
              "bindings": [["first_name", "last_name"], ["contact_number"], "address"],
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
                    "label":"First Name",
                    "placeholder":"First name",
                    viewMode: {
                      advance: {
                        div: ["col-md-6","col-sm-6"]
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
                    "label":"Last Name",
                    "placeholder":"Last name",
                    viewMode: {
                      advance: {
                        div: ["col-md-6","col-sm-6"]
                      }
                    },
                  },
                  "validators": {
                    "required": true
                  }
                },
                {
                  "name": "contact_number",
                  "type": "number",
                  "ui": {
                    "label":"Contact No.",
                    "placeholder":"Contact No.",
                    viewMode: {
                      advance: {
                        div: ["col-md-12","col-sm-12"]
                      }
                    },
                  },
                  "validators": {
                    "required": true,
                    "number": true
                  }
                },
                {
                  "name": "address",
                  "type": "textarea",
                  "ui": {
                    "label":"Address",
                    "placeholder":"Address",
                    viewMode: {
                      advance: {
                        div: ["col-md-12","col-sm-12"]
                      }
                    },
                  },
                  "validators": {
                    "required": true,
                  }
                }
              ]
            };
            this.modalTitle = 'Update User';
            this.modalReference = this.modalService.open(this.modalUser, { size: 'lg' });
            this.clearAlert();
          });
        break;
      case 'table_action_update':
        break;
      case 'table_action_delete':
        break;
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.fetchUser()
        .subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.users = result.data.user;
            this.dtTrigger.next();
          }
        });
    });
  }

}
