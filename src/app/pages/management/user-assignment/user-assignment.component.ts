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
import {ApproverModel} from "../../../@theme/components/forms/models/approver.model";
import {UserModel} from "../../../@theme/components/forms/models/user.model";

@Component({
  selector: 'pg-management-user-assignment',
  templateUrl: './user-assignment.component.html',
  styleUrls: ['./user-assignment.component.scss']
})

export class UserAssignmentComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('user_assign') modalUserAssign: TemplateRef<any>;
  modalTitle: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  user_assigns: any = {};
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
        target: 'add_user_assign',
        icon: 'ti-plus btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.definitions.user_assign.define',
        action_type: 'define',
      },
    ],
    edit:  [
      {
        text: 'Update',
        status: 'primary',
        target: 'update_user_assign',
        icon: 'ti-file btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.definitions.user_assign.define',
        action_type: 'define',
      },
    ],
  };
  formData = {
    button: this.form_actions.add,
    "models": [
      { "modelName": 'userModel', "model": UserModel },
      { "modelName": 'approverModel', "model": ApproverModel },
    ],
    "endpoint": '',
    "bindings": ["user_id", "approver_id"],
    "fields": [
      {
        "name": "id",
        "type": "hidden",
        "validators": {},
        "ui": {}
      },
      {
        "name": "user_id",
        "type": "select",
        "modelName": "userModel",
        "ui": {
          "label": "Select a User:",
          "placeholder": "Select a User",
          "viewMode": {
            "advance": {
              "div": ["col-md-12","col-sm-12"]
            }
          }
        },
        "validators": {
          "required": true
        }
      },
      {
        "name": "approver_id",
        "type": "select",
        "modelName": "approverModel",
        "ui": {
          "label": "Select a Signatory:",
          "placeholder": "Select a Signatory",
          "viewMode": {
            "advance": {
              "div": ["col-md-12","col-sm-12"]
            }
          }
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
      fetch: 'v1.definitions.user_assign.fetch',
    };

    this.page.indexes = {
      view: 'user_assign',
      update: 'user_assign',
      table: 'user_assign',
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
    this.fetchUserAssign()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.user_assigns = result.data.user_assign;
          this.dtTrigger.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  addUserAssign(content){
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

  fetchUserAssign() {
    return this.data_service.execute(
      {
        slug: 'v1.definitions.user_assign.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        __response: {
          200: 'Successfully retrieved user assign.',
        },
      },
    );
  }

  handleAction($event: ActionItemSchema) {
    console.log('Form Types ACTION:', $event);
    switch ( $event.action ) {
      case 'add_user_assign':
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
      case 'update_user_assign':
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
            this.data = result_data[0];
            this.formData.button = this.form_actions.edit;
            this.modalTitle = 'Update Form Type';
            this.modalReference = this.modalService.open(this.modalUserAssign, { size: 'md' });
            this.clearAlert();
          });
        break;
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.fetchUserAssign()
        .subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.user_assigns = result.data.user_assign;
            this.dtTrigger.next();
          }
        });
    });
  }

}
