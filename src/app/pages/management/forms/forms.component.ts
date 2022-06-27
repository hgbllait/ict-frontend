import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Title} from "@angular/platform-browser";
import {ActionItemSchema, StandardResponse} from "../../../@globals/models";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import Responsive from 'datatables.net-responsive';

@Component({
  selector: 'pg-management-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('form_type') modalFormType: TemplateRef<any>;
  modalTitle: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  form_types: any = {};
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
        target: 'add_form_type',
        icon: 'ti-plus btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.definitions.forms.type.define',
        action_type: 'define',
      },
    ],
    edit:  [
      {
        text: 'Update',
        status: 'primary',
        target: 'update_form_type',
        icon: 'ti-file btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.definitions.forms.type.define',
        action_type: 'define',
      },
    ],
  };
  formData = {
    button: this.form_actions.add,
    "endpoint": '',
    "bindings": ["form_no", "name", "description", ["date_effective", "revision_no", "issue_no"]],
    "fields": [
      {
        "name": "id",
        "type": "hidden",
        "validators": {},
        "ui": {}
      },
      {
        "name": "name",
        "type": "text",
        "ui": {
          "label":"Form Name:",
          "placeholder":"Form Name",
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
        "name": "form_no",
        "type": "text",
        "ui": {
          "label":"Form No:",
          "placeholder":"Form No",
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
        "name": "description",
        "type": "textarea",
        "additionalConfig": {
          "prop": {
            "rows": 7,
            "cols": 50
          }
        },
        "ui": {
          "label":"Description:",
          "placeholder":"Description",
          "description": "Leave blank if not applicable.",
          "viewMode": {
            "advance": {
              "div": ["col-md-12","col-sm-12"]
            }
          }
        },
        "validators": {}
      },
      {
        "name": "date_effective",
        "type": "date",
        "ui": {
          "label":"Date Effective:",
          "placeholder":"Date Effective",
          viewMode: {
            advance: {
              div: ["col-md-4","col-sm-4"]
            }
          },
        },
        "validators": {
          "required": true,
        }
      },
      {
        "name": "revision_no",
        "type": "text",
        "ui": {
          "label":"Revision No.:",
          "placeholder":"Revision No.",
          viewMode: {
            advance: {
              div: ["col-md-4","col-sm-4"]
            }
          },
        },
        "validators": {
          "required": true
        }
      },
      {
        "name": "issue_no",
        "type": "number",
        "ui": {
          "label":"Issue Status:",
          "placeholder":"Issue Status",
          viewMode: {
            advance: {
              div: ["col-md-4","col-sm-4"]
            }
          },
        },
        "validators": {
          "required": true
        }
      },
    ]
  };

  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private titleService: Title,
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
      fetch: 'v1.definitions.forms.type.fetch',
    };

    this.page.indexes = {
      view: 'form_type',
      update: 'form_type',
      table: 'form_type',
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
    this.fetchFormType()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.form_types = result.data.form_type;
          this.dtTrigger.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  addFormType(content){
    this.clearAlert();
    this.data = {};
    this.modalTitle = 'Add Form Type';
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

  fetchFormType() {
    return this.data_service.execute(
      {
        slug: 'v1.definitions.forms.type.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        __response: {
          200: 'Successfully retrieved form type.',
        },
      },
    );
  }

  handleAction($event: ActionItemSchema) {
    console.log('Form Types ACTION:', $event);
    switch ( $event.action ) {
      case 'add_form_type':
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
      case 'update_form_type':
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
        console.log( $event );
        this.data_service.call(this.page.endpoints.fetch, {id: $event.value})
          .subscribe(result => {
            const result_data = this.getResultData(result, this.page.indexes);
            this.data = result_data;
            this.formData.button = this.form_actions.edit;
            this.modalTitle = 'Update Form Type';
            this.modalReference = this.modalService.open(this.modalFormType, { size: 'md' });
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
      this.fetchFormType()
        .subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.form_types = result.data.form_type;
            this.dtTrigger.next();
          }
        });
    });
  }

}
