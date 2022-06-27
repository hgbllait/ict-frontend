import {
  Component, ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {BasePage} from "../../@globals/baseclasses/pages/base.page";
import {environment} from "../../../environments/environment";
import {RequestFormService} from "../../@globals/services/api/request-form";
import {ActionItemSchema, StandardResponse} from "../../@globals/models";
import {Location} from '@angular/common';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import form_json from "./form/form.json";
import {field} from "./fields/fields";
import {FormTypeModel} from "../../@theme/components/forms/models/form-type.model";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../@globals/services/api/auth";

declare var $: any;
@Component({
  selector: 'form-request-section',
  templateUrl: './request-section.component.html',
  styleUrls: ['./request-section.component.scss']
})

export class RequestSectionComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild('form_request') modalFormRequest: TemplateRef<any>;
  @ViewChild('metaData') metaData : QueryList<any>;
  @ViewChild('NextClick') nextClick: ElementRef<HTMLElement>;
  @ViewChild('FinalCLick') finalClick: ElementRef<HTMLElement>;
  hasMaterials: boolean = false;
  requester: any;
  url: any;
  called = 0;
  modalTitle: string;
  flow_control_requests: any = {};
  page_alert: any = {};
  form_alert: any = {};
  modalReference: any;
  form_data: any = {};
  form_email: any = {};
  form1: any = {};
  form2: any = {};
  form3: any = {};
  step_form = [
    {
      title: "Requester Email",
      data: {}
    },
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
      title: "Finish",
      data: {}
    }
  ]

  constructor(
    public authService: AuthenticationService,
    private _fb: FormBuilder,
    private data_service: RequestFormService,
    private titleService:Title,
    private _location: Location,
    private router: Router
  ) {
    super(authService);
    this.titleService.setTitle("Request Section | "+`${environment.APP_NAME}`);

  }

  ngOnInit() {
    this.url = `${environment.FRONTEND_BASE_URL}`+'/form';
    this.called = 0;
    this.hasMaterials = false;
    this.page_alert = {
      show: false
    };
    this.form_alert = {
      show: false
    };
    this.form_data = {};
    this.form_email = {
      data: {},
      group: {
        invalid: true
      },
      field: {
        "endpoint": '',
        "bindings": ["email"],
        "fields": [
          {
            "name": "email",
            "type": "email",
            "ui": {
              "label":"Email",
              "placeholder":"Email",
              "description": "We'll never share your email with anyone else.",
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
        ]
      }
    };
    this.form1 = {
      data: {},
      group: {
        invalid: true
      },
      field: {}
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

  setFormData(form_data) {
    if(form_data['step'] == 2){
      this.data_service.execute(
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
        if(split[0] == 'requester'){
          if (!approver.hasOwnProperty(split[0])) {
            approver[split[0]] = {};
          }
          if (form_data.hasOwnProperty('requester_id')) {
            approver[split[0]]['approver_id'] = form_data[key];
            approver[split[0]]['name'] = 'requested';
          }
          else {
            approver[split[0]][split[1]] = form_data[key];
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
    this.data_service.execute(
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
        this.requester = result.data.requester;
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
      case 0:
        this.form_email.group = $event.form;
        this.form_email.data = $event.data;
        break;
      case 1:
        this.form1.group = $event.form;
        this.form1.data = $event.data;
        this.form2.data = {};
        this.form3.data = {};
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

  verifyEmail(data,group){
    if(group.invalid){
      return false;
    }
    this.data_service.execute(
      {
        slug: 'v1.flow_control.definitions.approvers.fetch-email',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        email: data.email
      }
    ).subscribe(
      (result: StandardResponse) => { // Success
        this.form1.data['requester_id'] = result.data.approver.id;
        this.form1.data['requester_name'] = result.data.approver.name;
        this.form1.data['requester_email'] = result.data.approver.email;
        this.form1.field = {
          "models": [
            { "modelName": 'formTypeModel', "model": FormTypeModel, "arguments": [form_json] },
          ],
          "endpoint": '',
          "bindings": ["name", "type_id", "requester_name", "requester_email"],
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
              "name": "requester_name",
              "type": "text",
              "ui": {
                "disabled": true,
                "label":"Requester Name",
                "placeholder":"Requester Name",
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
              "name": "requester_email",
              "type": "email",
              "ui": {
                "disabled": true,
                "label":"Requester Email",
                "placeholder":"Requester Email",
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
              "name": "requester_id",
              "type": "number",
              "ui": {},
              "validators": {}
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
        };
        let el: HTMLElement = this.nextClick.nativeElement;
        el.click();
      },
      error => {
        this.form1.data['requester_email'] = data.email;
        this.form1.data['requester_type'] = 'end user';
        this.form1.field = {
          "models": [
            { "modelName": 'formTypeModel', "model": FormTypeModel, "arguments": [form_json] },
          ],
          "endpoint": '',
          "bindings": ["name", "type_id", "requester_name", "requester_email"],
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
              "name": "requester_name",
              "type": "text",
              "ui": {
                "label":"Requester Name",
                "placeholder":"Requester Name",
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
              "name": "requester_email",
              "type": "email",
              "ui": {
                "label":"Requester Email",
                "placeholder":"Requester Email",
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
              "name": "requester_type",
              "type": "text",
              "ui": {},
              "validators": {}
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
        };
        let el: HTMLElement = this.nextClick.nativeElement;
        el.click();
      });

  }

}
