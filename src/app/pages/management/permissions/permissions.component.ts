import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Title} from "@angular/platform-browser";import {RequestFormService} from "../../../@globals/services/api/request-form";
import {StandardResponse} from "../../../@globals/models";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import Responsive from 'datatables.net-responsive';

@Component({
  selector: 'pg-management-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})

export class PermissionsComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  modalTitle: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  permissions: any;
  form_alert: any = {
    show: false
  };
  page_alert: any = {
    show: false
  };
  modalReference: any;
  data: any = {
    id: 1,
    first_name: 2
  };
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
        { width: "5%", targets: 2 }
      ]

    };
    this.fetchPermission()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.permissions = result.data.permission;
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

  fetchPermission() {
    return this.data_service.execute(
      {
        slug: 'rbac.permissions.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        __response: {
          200: 'Successfully retrieved permissions',
        },
      },
    );
  }

}
