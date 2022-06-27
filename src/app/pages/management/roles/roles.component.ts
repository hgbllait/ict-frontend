import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {ActionItemSchema, StandardResponse} from "../../../@globals/models";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataTableDirective} from "angular-datatables";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import Responsive from 'datatables.net-responsive';

@Component({
  selector: 'pg-management-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RolesComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('rolemodal') modalRole: TemplateRef<any>;
  modalTitle: string;
  table_data: any;
  roleUser: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  roles: any;
  rows: any;
  modalReference: any;

  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private modalService: NgbModal
  ) {
    super(authService);
  }

  ngOnInit() {
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
    this.fetchRole()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.roles = result.data.role;
          this.dtTrigger.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }

  fetchData(endpoint, target) {
    this.data_service.call( endpoint )
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.table_data = result.data[target];
          this.dtTrigger2.next();
        }
      });
  }

  fetchRole() {
    return this.data_service.execute(
      {
        slug: 'rbac.roles.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        __response: {
          200: 'Successfully retrieved roles',
        },
      },
    );
  }

  handleAction($event: ActionItemSchema) {
    switch ( $event.action ) {
      case 'table_user':
        this.modalTitle = 'Assign User';
        this.modalReference = this.modalService.open(this.modalRole, { size: 'lg' });
        this.fetchData('v1.employees.all', 'employee');
        this.roleUser = false;
        break;
      case 'table_permission':
        this.modalTitle = 'Assign User';
        this.modalReference = this.modalService.open(this.modalRole, { size: 'lg' });
        this.fetchData('v1.employees.all', 'employee');
        this.roleUser = true;
        break;
    }
  }

}
