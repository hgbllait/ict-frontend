import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs'
import {environment} from "../../../../environments/environment";
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {ActionItemSchema, StandardResponse} from "../../../@globals/models";
import {DataTableDirective} from "angular-datatables";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import {Title} from "@angular/platform-browser";
import Responsive from 'datatables.net-responsive';

@Component({
  selector: 'pg-approvers-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})

export class LinkComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  modalTitle: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  links: any = [];
  url: string;
  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private titleService: Title,
  ) {
    super(authService);
  }

  ngOnInit() {
    this.titleService.setTitle("Signatories | "+`${environment.APP_NAME}`);
    if ( !this.page ) {
      this.page = {};
    }
    this.url = `${environment.FRONTEND_BASE_URL}`;
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
    };
    this.fetchLink()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.links = result.data.metas;
          this.dtTrigger.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  fetchLink() {
    return this.data_service.execute(
      {
        slug: 'v1.utilities.metas.fetch-by-approvers',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        'meta_key': 'link',
        __response: {
          200: 'Successfully retrieved link',
        },
      },
    );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.fetchLink()
        .subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.links = result.data.metas;
            this.dtTrigger.next();
          }
        });
    });
  }

}
