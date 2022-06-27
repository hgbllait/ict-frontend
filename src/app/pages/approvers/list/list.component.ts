import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Title} from "@angular/platform-browser";
import {ActionItemSchema, StandardResponse} from "../../../@globals/models";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {environment} from "../../../../environments/environment";
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import Responsive from 'datatables.net-responsive';
import {HrisService} from "../../../@globals/services/api/hris";
import Swal from "sweetalert2";

@Component({
  selector: 'pg-approvers-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('approver') modalApprover: TemplateRef<any>;
  modalTitle: string;

  dtOptions: DataTables.Settings = {};
  dtOptionsModal: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTriggerModal: Subject<any> = new Subject<any>();
  approvers: any = {};
  form_alert: any = {
    show: false
  };
  page_alert: any = {
    show: false
  };
  modalReference: any;
  data: any = {};
  form_actions = {
    view: [],
    add: [
      {
        text: 'Submit',
        status: 'primary',
        target: 'add_approver',
        icon: 'ti-plus btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.flow_control.definitions.approvers.define',
        action_type: 'define',
      },
    ],
    edit:  [
      {
        text: 'Update',
        status: 'primary',
        target: 'update_approver',
        icon: 'ti-file btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.flow_control.definitions.approvers.define',
        action_type: 'define',
      },
    ],
  };
  formData = {
    button: this.form_actions.add,
    "endpoint": '',
    "bindings": ["employee_id", "name", "email", "type"],
    "fields": [
      {
        "name": "id",
        "type": "hidden",
        "validators": {},
        "ui": {}
      },
      {
        "name": "employee_id",
        "type": "text",
        "ui": {
          "label":"Employee ID/Student ID:",
          "placeholder":"Employee ID/Student ID",
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
          "label":"Name:",
          "placeholder":"Name",
          "description":"Format: Last Name, First Name M.I",
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
      {
        name: "type",
        type: "select",
        multiselect: true,
        source: [
          {
            "value": 'SDMD Personnel',
            "text": "SDMD Personnel",
          },
          {
            "value": 'End User',
            "text": "End User",
          },
          {
            "value": 'SDMD Director',
            "text": "SDMD Director",
          },
          {
            "value": 'Head Office',
            "text": "Head Office",
          },
          {
            "value": 'Vice President',
            "text": "Vice President",
          },
          {
            "value": 'President',
            "text": "President",
          },
          {
            "value": 'VP-PQuA',
            "text": "VP-PQuA",
          }
        ],
        ui: {
          label: 'Type',
          viewMode: {
            advance: {
              div: ["type-select", "col-md-12","col-sm-12"]
            }
          },
        },
        validators: {}
      },
    ]
  };

  constructor(
    public authService: AuthenticationService,
    private dataService: RequestFormService,
    private hrisService: HrisService,
    private titleService: Title,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    super(authService);
  }

  ngOnInit() {
    this.titleService.setTitle("Signatories | "+`${environment.APP_NAME}`);
    if ( !this.page ) {
      this.page = {};
    }
    // region Page settings
    // region Configuration
    this.page.endpoints = {
      fetch: 'v1.flow_control.definitions.approvers.fetch',
    };

    this.page.indexes = {
      view: 'approver',
      update: 'approver',
      table: 'approver',
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
    this.dtOptionsModal = {
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
        { width: "5%", targets: 2 }
      ]
    };

    this.fetchHrisEmployee()
        .subscribe((result: StandardResponse) => {
          console.log(result.data);
          if ( result.code === 200 ) {
            // this.employees = result.data;
            this.dtTriggerModal.next();
          }
        });

    this.fetchApprover()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.approvers = result.data.approver;
          this.dtTrigger.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTriggerModal.unsubscribe();
  }

  addApprover(content){
    this.clearAlert();
    this.data = {};
    this.modalTitle = 'Add Signatory';
    this.formData.button = this.form_actions.add;
    this.modalReference = this.modalService.open(content, { size: 'md' });
  }

  clearAlert(){
    this.page_alert = {
      shown: false
    };
    this.form_alert = {
      show:false
    };
  }

  fetchApprover() {
    return this.dataService.execute(
      {
        slug: 'v1.flow_control.definitions.approvers.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        __response: {
          200: 'Successfully retrieved approvers.',
        },
      },
    );
  }

  fetchHrisEmployee() {
    return this.hrisService.execute(
        {
          slug: 'api.custom.active-users',
          exception: {
            message: 'Ooopssss. Something went wrong! We will get back to you.',
            class: 'error',
            type: 'none',
          },
        },
        {
          token: 'a3fbd181665bcbc428be0c1412366979',
          __response: {
            200: 'Successfully retrieved employee.',
          },
        },
    );
  }

  handleAction($event: ActionItemSchema) {
    console.log('Approvers ACTION:', $event);
    switch ( $event.action ) {
      case 'add_approver':
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
      case 'add_approver_hris':
        Swal.fire({
          title: 'Input employee id',
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
            this.modalReference.close();
            let id = result.value;
            return this.hrisService.execute(
                {
                  slug: 'api.custom.email',
                  exception: {
                    message: 'Ooopssss. Something went wrong! We will get back to you.',
                    class: 'error',
                    type: 'none',
                  },
                },
                {
                  token: 'a3fbd181665bcbc428be0c1412366979',
                  employee_id: result.value
                }
            ).subscribe((result: StandardResponse) => {
              if ( result.code === 200 ) {
                let middle_name = "";
                if(result.data.MiddleName){
                  middle_name = result.data.MiddleName.charAt(0);
                }
                let full_name = result.data.LastName + ', ' + result.data.FirstName + ' ' + middle_name.toUpperCase() + '.';
                this.data = {
                  name: full_name.replace(
                    /\w\S*/g,
                    function(txt) {
                      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    }
                  ),
                  employee_id: id,
                  email: result.data.Email
                };
                this.modalReference = this.modalService.open(this.modalApprover, { size: 'md' });
                this.clearAlert();
              }
            }, error => {
              console.log(error.error.message);
              this.modalReference = this.modalService.open(this.modalApprover, { size: 'md' });
              this.form_alert = {
                shown: true,
                messages: 'Failed to find employee.',
                type: 'danger',
              };
            });
          }
        });
        break;
      case 'update_approver':
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
        this.dataService.call(this.page.endpoints.fetch, {id: $event.value})
          .subscribe(result => {
            const result_data = this.getResultData(result, this.page.indexes);
            this.data = result_data[0];
            this.data['type'] = result_data[0]['type'].split(", ");
            this.formData.button = this.form_actions.edit;
            this.modalTitle = 'Update Signatory';
            this.modalReference = this.modalService.open(this.modalApprover, { size: 'md' });
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
      this.fetchApprover()
        .subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.approvers = result.data.approver;
            this.dtTrigger.next();
          }
        });
    });
  }

}
