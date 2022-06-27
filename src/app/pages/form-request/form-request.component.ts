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
import {AuthenticationService} from "../../@globals/services/api/auth";
import {HideFormTypeModel} from "../../@theme/components/forms/models/hide-form-type.model";
import Responsive from 'datatables.net-responsive';
import Swal from "sweetalert2";
import {ExcelService} from "../../services/excel.service";

@Component({
  selector: 'pg-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss']
})

export class FormRequestComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('form_request') modalFormRequest: TemplateRef<any>;
  modalTitle: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();report_email
  form_requests: any = {};
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
        target: 'add_form_request',
        icon: 'ti-plus btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.definitions.forms.define',
        action_type: 'define',
      },
    ],
    edit:  [
      {
        text: 'Update',
        status: 'primary',
        target: 'update_form_request',
        icon: 'ti-file btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.definitions.forms.define',
        action_type: 'define',
      },
    ],
  };
  formData = {
    button: this.form_actions.add,
    "models": [
      { "modelName": 'formTypeHideModel', "model": HideFormTypeModel, "arguments": [{"field_name": "form_type", "field_value": "paperless"}] }
    ],
    "endpoint": '',
    "bindings": ["name", "date_effective", "revision_no", "issue_no", "form_link"],
    "fields": [
      {
        "name": "id",
        "type": "hidden",
        "validators": {},
        "ui": {}
      },
      {
        "name": "type_id",
        "type": "hidden",
        "validators": {},
        "ui": {}
      },
      {
        "name": "name",
        "type": "text",
        "ui": {
          "label":"Form Name",
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
        "name": "date_effective",
        "type": "date",
        "ui": {
          "label":"Date Effective",
          "placeholder":"Date Effective",
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
        "name": "revision_no",
        "type": "text",
        "ui": {
          "label":"Revision No.:",
          "placeholder":"Revision No.",
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
        "name": "issue_no",
        "type": "number",
        "ui": {
          "label":"Issue Status:",
          "placeholder":"Issue Status",
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
        "name": "form_type",
        "type": "hidden",
        "ui": {},
        "validators": {},
      },
      {
        "name": "form_link",
        "type": "text",
        "modelName": "formTypeHideModel",
        "ui": {
          "hide": false,
          "label":"Form File Link",
          "placeholder":"Form File Link",
          "viewMode": {
            "advance": {
              "div": ["col-md-12","col-sm-12"]
            }
          },
        },
        "validators": {
          "required": {
            "conditionalExpression":"x => x.form_type == \"paper\""
          }
        }
      },
    ]
  };

  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private excel_service: ExcelService,
    private titleService: Title,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    super(authService);
    this.titleService.setTitle("Form Request | "+`${environment.APP_NAME}`);
  }

  ngOnInit() {
    if ( !this.page ) {
      this.page = {};
    }
    // region Page settings
    // region Configuration
    this.page.endpoints = {
      fetch: 'v1.definitions.forms.fetch',
    };

    this.page.indexes = {
      view: 'forms',
      update: 'forms',
      table: 'forms',
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
        { width: "5%", targets: 6 }
      ]
    };
    this.fetchFormRequest()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.form_requests = result.data.forms;
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

  fetchFormRequest() {
    return this.data_service.execute(
      {
        slug: 'v1.definitions.forms.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        'relationship' : 'type',
        __response: {
          200: 'Successfully retrieved form_requests.',
        },
      },
    );
  }

  handleAction($event: ActionItemSchema) {
    console.log('FormRequests ACTION:', $event);
    switch ( $event.action ) {
      case 'report_email':
        // @ts-ignore
        Swal.fire({
          showCancelButton: true,
          type: "warning",
          html: `
                        <div class="form-group">
                            <h4 class="mb-4"">Date Period</h6>
                            <div class="item">
                                <div class="row form-item">
                                    <h6 class="col-sm-4 col-form-label">From</h6>
                                    <div class="col-sm-8">
                                        <input id="swal-date-from" type="date" class="form-control input-square" autocomplete="off">
                                    </div>
                                </div>
                                <div class="row form-item">
                                    <h6 class="col-sm-4 col-form-label">To</h6>
                                    <div class="col-sm-8">
                                        <input id="swal-date-to" type="date" class="form-control input-square">
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
          preConfirm: function () {
            // @ts-ignore
            if((document.getElementById('swal-date-from').value == "") ||
              // @ts-ignore
              (document.getElementById('swal-date-from').value == '') ||
              // @ts-ignore
              ((document.getElementById('swal-date-from').value == null)) ) {
              return Swal.showValidationMessage(
                `Period From is a required field`
              );
            }

            // @ts-ignore
            if((document.getElementById('swal-date-to').value == "") ||
              // @ts-ignore
              (document.getElementById('swal-date-to').value == '') ||
              // @ts-ignore
              ((document.getElementById('swal-date-to').value == null)) ) {
              return Swal.showValidationMessage(
                `Period To is a required field`
              );
            }
            return new Promise(function (resolve) {
              resolve([
                $('#swal-date-from').val(),
                $('#swal-date-to').val()
              ])
            })
          },
          onOpen: function () {
            var date = new Date();

            var day = date.getDate(),
              month = date.getMonth() + 1,
              year = date.getFullYear(),
              hour = date.getHours(),
              min  = date.getMinutes();

            // @ts-ignore
            month = (month < 10 ? "0" : "") + month;
            // @ts-ignore
            day = (day < 10 ? "0" : "") + day;
            // @ts-ignore
            hour = (hour < 10 ? "0" : "") + hour;
            // @ts-ignore
            min = (min < 10 ? "0" : "") + min;

            var today = year + "-" + month + "-" + day,
              displayTime = hour + ":" + min;
            // @ts-ignore
            document.getElementById('swal-date-from').value = today;
            // @ts-ignore
            document.getElementById('swal-date-to').value = displayTime;
            $('#swal-date').focus()
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.emailReport({
              from: result.value[0],
              to: result.value[1]
            });
          }
        });
        break;
      case 'report_accomplishment':
        // @ts-ignore
        Swal.fire({
          showCancelButton: true,
          type: "warning",
          html: `
                        <div class="form-group">
                            <h4 class="mb-4"">Date Period</h6>
                            <div class="item">
                                <div class="row form-item">
                                    <h6 class="col-sm-4 col-form-label">From</h6>
                                    <div class="col-sm-8">
                                        <input id="swal-date-from" type="date" class="form-control input-square" autocomplete="off">
                                    </div>
                                </div>
                                <div class="row form-item">
                                    <h6 class="col-sm-4 col-form-label">To</h6>
                                    <div class="col-sm-8">
                                        <input id="swal-date-to" type="date" class="form-control input-square">
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
          preConfirm: function () {
            // @ts-ignore
            if((document.getElementById('swal-date-from').value == "") ||
              // @ts-ignore
              (document.getElementById('swal-date-from').value == '') ||
              // @ts-ignore
              ((document.getElementById('swal-date-from').value == null)) ) {
              return Swal.showValidationMessage(
                `Period From is a required field`
              );
            }

            // @ts-ignore
            if((document.getElementById('swal-date-to').value == "") ||
              // @ts-ignore
              (document.getElementById('swal-date-to').value == '') ||
              // @ts-ignore
              ((document.getElementById('swal-date-to').value == null)) ) {
              return Swal.showValidationMessage(
                `Period To is a required field`
              );
            }
            return new Promise(function (resolve) {
              resolve([
                $('#swal-date-from').val(),
                $('#swal-date-to').val()
              ])
            })
          },
          onOpen: function () {
            var date = new Date();

            var day = date.getDate(),
              month = date.getMonth() + 1,
              year = date.getFullYear(),
              hour = date.getHours(),
              min  = date.getMinutes();

            // @ts-ignore
            month = (month < 10 ? "0" : "") + month;
            // @ts-ignore
            day = (day < 10 ? "0" : "") + day;
            // @ts-ignore
            hour = (hour < 10 ? "0" : "") + hour;
            // @ts-ignore
            min = (min < 10 ? "0" : "") + min;

            var today = year + "-" + month + "-" + day,
              displayTime = hour + ":" + min;
            // @ts-ignore
            document.getElementById('swal-date-from').value = today;
            // @ts-ignore
            document.getElementById('swal-date-to').value = displayTime;
            $('#swal-date').focus()
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.accomplishmentReport({
              from: result.value[0],
              to: result.value[1]
            });
          }
        });
        break;
      case 'add_form_request':
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
      case 'update_form_request':
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
            this.modalReference = this.modalService.open(this.modalFormRequest, { size: 'md' });
            this.clearAlert();
          });
        break;
    }
  }

  emailReport(form_data) {
    return this.data_service.execute(
      {
        slug: 'v1.definitions.forms.report-email',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      form_data
    ).subscribe((result: StandardResponse) => {
      if ( result.code === 200 ) {
        let result_data = result.data.result;
        let data = [];
        Object.values(result_data).forEach((row: any) => {
          data.push(Object.values(row))
        })

        if(data.length == 0 ) {
          return Swal.fire(
            'Failed',
            'No data to print.',
            'error'
          );
        }

        let reportData = {
          title: 'Email Registry 2022',
          data: data,
          headers: Object.keys(result_data[Object.keys(result_data)[0]])
        }
        this.excel_service.email(reportData, 'Email Request');
      }
    }, error => {
      Swal.fire(
        'Failed',
        'Failed to download reports. Try again later.',
        'error'
      )
    });
  }

  accomplishmentReport(form_data) {
    return this.data_service.execute(
      {
        slug: 'v1.definitions.forms.report-accomplishment',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      form_data
    ).subscribe((result: StandardResponse) => {
      if ( result.code === 200 ) {
        let result_data = result.data.result;
        let data = [];
        Object.values(result_data).forEach((row: any) => {
          data.push(Object.values(row))
        })

        if(data.length == 0 ) {
          return Swal.fire(
            'Failed',
            'No data to print.',
            'error'
          );
        }

        let reportData = {
          title: 'Accomplishment Report',
          data: data,
          headers: Object.keys(result_data[Object.keys(result_data)[0]]),
          date:  result.data.date,
          director: result.data.director,
          user: result.data.user
        }
        this.excel_service.accomplishment(reportData, 'Accomplishment Report');
      }
    }, error => {
      Swal.fire(
        'Failed',
        'Failed to download reports. Try again later.',
        'error'
      )
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.fetchFormRequest()
        .subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.form_requests = result.data.forms;
            this.dtTrigger.next();
          }
        });
    });
  }

}
