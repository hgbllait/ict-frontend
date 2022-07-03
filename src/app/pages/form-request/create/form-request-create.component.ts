import {Component, ElementRef, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {environment} from "../../../../environments/environment";
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {ActionItemSchema, StandardResponse} from "../../../@globals/models";
import {Location} from '@angular/common';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {field} from "./fields/fields";
import {FormTypeModel} from "../../../@theme/components/forms/models/form-type.model";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HrisService} from "../../../@globals/services/api/hris";
import form_json from "./form/form.json";

declare var $: any;
@Component({
  selector: 'pg-form-request-create',
  templateUrl: './form-request-create.component.html',
  styleUrls: ['./form-request-create.component.scss']
})

export class FormRequestCreateComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild('form_request') modalFormRequest: TemplateRef<any>;
  @ViewChild('approver') modalApprover: TemplateRef<any>;
  @ViewChild('metaData') metaData : QueryList<any>;
  @ViewChild('FinalCLick') finalClick: ElementRef<HTMLElement>;
  hasMaterials: boolean = false;
  signatoryState: boolean = true;
  id: any;
  called = 0;
  modalTitle: string;
  flow_control_requests: any = {};
  page_alert: any = {};
  form_alert: any = {};
  modalReference: any;
  form_data: any = {};
  form1: any = {};
  form2: any = {};
  form3: any = {};
  form_approver: any = {
    data: {},
    field: {
      button: [
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
      "endpoint": '',
      "bindings": ["employee_id", "name", "email", "type"],
      "fields": [
        {
          "name": "employee_id",
          "type": "text",
          "ui": {
            "label":"Employee ID/Student ID:",
            "placeholder":"Employee ID/Student ID",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
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
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
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
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            },
          },
          "validators": {
            "required": true,
            "email": true
          }
        },
        {
          "name": "type",
          "type": "select",
          "multiselect": true,
          "source": [
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
          "ui": {
            "label": 'Type',
            "viewMode": {
              "advance": {
                "div": ["type-select", "col-md-12","col-sm-12"]
              }
            },
          },
          "validators": {}
        },
      ]
    }
  };
  step_form = [
    {
      title: "Type of Request",
      data: {}
    },
    {
      title: "Request Data",
      data: {
      }
    },
    {
      title: "Signatories",
      data: {}
    },
    {
      title: "Finish",
      data: {}
    }
  ]

  constructor(
    public authService: AuthenticationService,
    private _fb: FormBuilder,
    private dataService: RequestFormService,
    private hrisService: HrisService,
    private titleService:Title,
    private _location: Location,
    private router: Router,
    private modalService: NgbModal
  ) {
    super(authService);
    this.titleService.setTitle("Create Form Request | "+`${environment.APP_NAME}`);

  }

  ngOnInit() {
    this.clearAlert();
    this.called = 0;
    this.hasMaterials = false;
    this.page_alert = {
      show: false
    };
    this.form_alert = {
      show: false
    };
    this.form_data = {};
    this.form1 = {
      data: {},
      group: {
        invalid: true
      },
      field: {
        "models": [
          { "modelName": 'formTypeModel', "model": FormTypeModel, "arguments": [form_json] },
        ],
        "endpoint": '',
        "bindings": ["name", "type_id", "form_type"],
        "fields": [
          {
            "name": "name",
            "type": "text",
            "ui": {
              "hide": true,
              "label":"Form Name",
              "placeholder":"Form Name",
              "description": "Anything you want to name this form.",
              viewMode: {
                advance: {
                  div: ["col-md-12","col-sm-12"]
                }
              },
            },
            "validators": {}
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
            "validators": {}
          },
          {
            "name": "type_id",
            "type": "select",
            "modelName": "formTypeModel",
            "ui": {
              "label": 'Form Type',
              "placeholder": 'Select Form Type',
              "viewMode": {
                "advance": {
                  "div": ["col-md-12","col-sm-12"]
                }
              },
            },
            "validators": {
              "required": true
            }
          },
          {

            "name": "form_type",
            "type": "select",
            "value": "paper",
            "source": [{ "value": "paper", "text": "Through Paper" }, { "value": "paperless", "text": "Through System" }],
            "ui": {
              "label": 'Type',
              "placeholder": 'Select Type',
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
            "name": "revision_no",
            "type": "number",
            "ui": {
              "label":"Revision No.:",
              "placeholder":"Revision No.",
              viewMode: {
                advance: {
                  div: ["col-md-12","col-sm-12"]
                }
              },
            },
            "validators": {}
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
            "validators": {}
          },
        ]
      }
    };
    this.form2 = {
      data: {},
      group: {
        invalid: true
      },
      field: {},
      field_array: {},
      data_array: {}
    };
    this.form3 = {
      data: {},
      group: {
        invalid: true
      },
      field: {}
    };
  }

  ngAfterContentChecked(){
    if($('.child').attr('id') != this.called && $('.child').length >= 1){
      $(".child").resizable({
        handles: 'n,s',
      });
      this.called = $('.child').attr('id');
    }
  }

  ngOnDestroy(): void {
    //
  }

  addApprover(content){
    this.clearAlert();
    this.form_approver.dasta = {};
    this.modalTitle = 'Add Signatory';
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

  setFormData(form_data) {
    if(form_data['step'] == 1){
      this.dataService.execute(
        {
          slug: 'v1.definitions.forms.type.fetch',
          exception: {
            message: 'Ooopssss. Something went wrong! We will get back to you.',
            class: 'error',
            type: 'none',
          },
        },
        {
          id: form_data['type_id']
        }
      ).subscribe(
        (result: StandardResponse) => { // Success
          let data = result.data.form_type;
          this.form1.data['name'] = form_data['name'] = data['name'];
          this.form1.data['revision_no'] = form_data['revision_no'] = data['revision_no'];
          this.form1.data['issue_no'] = form_data['issue_no'] = data['issue_no'];
          this.form1.data['date_effective'] = form_data['date_effective'] = data['date_effective'];
          this.form_data = {
            ...this.form_data,
            ...form_data
          }
          // Emit Action
        },
        error => {

        });
    } else {
      this.form_data = {
        ...this.form_data,
        ...form_data
      }
    }
  }

  onSubmit($form){
    this.form_data = {
      ...this.form_data,
      ...$form
    }
    $form.submitted = true;
    let value;
    let meta = {};
    let approver = [];
    let deleted = [];
    let form_data = this.form_data;
    for (var key in form_data) {
      const split = key.split("_");
      if(split.length > 1){
        if(split[0] == 'meta'){
          split.shift();
          var join = split.join("_");
          // @ts-ignore
          meta[join] = form_data[key];
          deleted[key] = form_data[key];
          delete form_data[key];
        }
        if(split[0] == 'approver'){
          if (!approver.hasOwnProperty(split[1])) {
            approver[split[1]] = {};
          }
          if(split.length <= 2){
            approver[split[1]]['approver_id'] = form_data[key];
            approver[split[1]]['name'] = split[1];
          } else {
            approver[split[1]][split[2]] = form_data[key];
          }
          deleted[key] = form_data[key];
          delete form_data[key];

        }
      }
    }
    form_data['meta'] = meta;
    form_data['flow_control_request'] = {};
    form_data['flow_control_request']['name'] = form_data['name'];
    form_data['flow_control_request']['flow_control_request_approver'] = [];
    for (var approve_key in approver) {
      if(typeof approver[approve_key] === 'object'){
        form_data['flow_control_request']['flow_control_request_approver'].push(approver[approve_key]);
      }
    }
    Object.keys(form_data).forEach(key => {
      if (form_data[key] === null ) {
        delete form_data[key];
      }
    });
    form_data = this.setAddedBy('added_by', form_data);
    this.dataService.execute(
      {
        slug: 'v1.definitions.forms.generate',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      form_data
    ).subscribe(
      (result: StandardResponse) => { // Success
        value = 'success';
        this.id = result.data.forms.id;
        this.clearAlert();
        this.triggerFinalClick();
        // Emit Action
      },
      error => {
        for (var key in deleted) {
          form_data[key] = deleted[key];
        }
        Swal.fire({
          title: 'Failed',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          html: error.error.message,
        });
      });

  }

  onDone(){
    this.router.navigateByUrl('/pages/form-request');
  }

  handleData( $event: {data, form}, step ) {
    switch ( step ) {
      case 1:
        this.form1.group = $event.form;
        this.form1.data = $event.data;
        this.form2.data = {};
        this.form3.data = {};
        console.log(this.form2);
        // @ts-ignore
        if(this.form2.group.touched){
          // @ts-ignore
          this.form2.group.reset();
        }
        // @ts-ignore
        if(this.form3.group.touched){
          // @ts-ignore
          this.form3.group.reset();
        }
        if (field.hasOwnProperty($event.data.type_id)) {
          // Reset Form Data
          for (var key in this.form_data) {
            const split = key.split("_");
            if(split.length > 1){
              if(split[0] == 'meta'){
                delete this.form_data[key];
              }
              if(split[0] == 'approver'){
                delete this.form_data[key];
              }
            }
          }
          if($event.data.type_id == 2
            || $event.data.type_id == 5) {
            this.hasMaterials = true
            this.form2.field_array = field[$event.data.type_id].field_array;
          }
          else{
            this.hasMaterials = false;
            this.form2.field_array = {};
          }
          this.form2.field = field[$event.data.type_id].meta;
          this.form3.field = field[$event.data.type_id].signatories;
        }
        break
      case 2:
        this.form2.group = $event.form;
        this.form2.data = {
          ...this.form2.data,
          ...$event.data,
        };
        // @ts-ignore
        if(this.form3.group.touched){
          // @ts-ignore
          this.form3.group.reset();
        }
        break;
      case 3:
        this.form3.group = $event.form;
        this.form3.data = $event.data;
        break;
      case 4:
        this.form2.data = {
          ...this.form2.data,
          ...this.form2.data_array
        }
        break;
    }
  }

  handleAction($event: ActionItemSchema) {
    console.log('FormRequests ACTION:', $event);
    switch ( $event.action ) {
      case 'add_approver':
        this.signatoryState = false;
        setTimeout(() => {
          this.signatoryState = true
        }, 100);
        if($event.value === 'success'){
          this.page_alert = {
            shown: true,
            messages: 'Successfully created a signatory',
            type: 'success',
          };
          this.modalReference.close();
        } else {
          this.page_alert = {
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
                this.form_approver.data = {
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
    }
  }

  triggerFinalClick() {
    let el: HTMLElement = this.finalClick.nativeElement;
    el.click();
  }

}
