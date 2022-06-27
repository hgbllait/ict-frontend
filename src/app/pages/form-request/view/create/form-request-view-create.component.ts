import {
  Component, ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {BasePage} from "../../../../@globals/baseclasses/pages/base.page";
import {environment} from "../../../../../environments/environment";
import {RequestFormService} from "../../../../@globals/services/api/request-form";
import {ActionItemSchema, StandardResponse} from "../../../../@globals/models";
import {Location} from '@angular/common';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import form_json from "../create/form/form.json";
import {field} from "./fields/fields";
import {FormTypeModel} from "../../../../@theme/components/forms/models/form-type.model";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../../../@globals/services/api/auth";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare var $: any;
@Component({
  selector: 'pg-form-request-view-create',
  templateUrl: './form-request-view-create.component.html',
  styleUrls: ['./form-request-view-create.component.scss']
})

export class FormRequestViewCreateComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild('form_request') modalFormRequest: TemplateRef<any>;
  @ViewChild('equipment') modalEquipment: TemplateRef<any>;
  @ViewChild('FinalClick') finalClick: ElementRef<HTMLElement>;
  hasMaterials: boolean = false;
  hasEquipment: boolean = false;
  formState: boolean = false;
  requestDataState: boolean = true;
  called = 0;
  modalTitle: string;
  jobOrder: string;
  id: any;
  form_id: any;
  forms: any;
  result_data: any;
  flow_control_requests: any = {};
  page_alert: any = {};
  form_alert: any = {};
  modalReference: any;
  form_data: any = {};
  form1: any = {};
  form2: any = {};
  form3: any = {};
  form3_default: any = {};
  form_equipment: any = {
    data: {},
    field: {
      button: [
        {
          text: 'Submit',
          status: 'primary',
          target: 'add_equipment',
          icon: 'ti-plus btn-icon-prepend',
          size: 'medium',
          display: true,
          call: 'v1.definitions.equipments.define',
          action_type: 'define',
        },
      ],
      "endpoint": '',
      "bindings": ["alias", "equipment", ["serial_no", "brand"], "location", "details"],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "alias",
          "type": "text",
          "ui": {
            "label":"Alias:",
            "placeholder":"Alias",
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
          "name": "equipment",
          "type": "select",
          "source": [
            { "value": "System Unit", "text": "System Unit" },
            { "value": "Laptop", "text": "Laptop" },
            { "value": "Printer/Scanner", "text": "Printer/Scanner" },
            { "value": "UPS/AVR", "text": "UPS/AVR" },
            { "value": "Biometric", "text": "Biometric" },
            { "value": "Switch/Routers/AP", "text": "Switch/Routers/AP" },
            { "value": "CCTV", "text": "CCTV" },
            { "value": "Projector", "text": "Projector" },
            { "value": "Turnstile", "text": "Turnstile" },
            { "value": "SIP PHONE", "text": "SIP PHONE" }
          ],
          "ui": {
            "label": 'Equipment',
            "placeholder": 'Select Equipment',
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
          "name": "serial_no",
          "type": "text",
          "ui": {
            "label":"Property/Serial No.:",
            "placeholder":"Property/Serial No.",
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
          "name": "brand",
          "type": "text",
          "ui": {
            "label":"Brand/Model:",
            "placeholder":"Brand/Model",
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
          "name": "location",
          "type": "text",
          "ui": {
            "label":"Location:",
            "placeholder":"Location",
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
          "name": "details",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Details:",
            "placeholder":"Details",
            "description": "Leave blank if not applicable.",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
      ]
    }
  };
  requester: any = {
    id: '',
    name: ''
  };
  personnel: any = {
    id: '',
    name: ''
  };
  director: any = {
    id: '',
    name: ''
  };
  step_form = [
    {
      title: "Type of Request",
      data: {}
    },
    {
      title: "Request Data",
      data: {}
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
    private data_service: RequestFormService,
    private titleService:Title,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    super(authService);
    this.titleService.setTitle("Create Form Request | "+`${environment.APP_NAME}`);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.called = 0;
    this.hasMaterials = false;
    this.hasEquipment = false;
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
      field: {},
    };

    this.data_service.execute(
      {
        slug: 'v1.definitions.forms.continuation-status',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        id: this.id,
        relationship: 'type',
        __response: {
          200: 'Successfully retrieved form request status.',
        },
      },
    ).subscribe(async (result: StandardResponse) => {
      this.page_alert.shown = false;
      this.formState = true;
      if (result.code === 200) {
        this.forms = result.data.forms;
        this.jobOrder = result.data.job_order;
        this.result_data = result.data;
        if(result.data.forms.type_id != 1
          && result.data.flow_control_request.approval_status == "approved") {
          this.router.navigateByUrl('/pages/form-request');
        }
        for(var key in result.data.request_approver){
          if(result.data.request_approver[key].name === 'certified' ){
            this.personnel.id = result.data.request_approver[key].approver_id;
            this.personnel.name = result.data.request_approver[key].approver.name;
          } else if(result.data.request_approver[key].name === 'requested' ){
            this.requester.id = result.data.request_approver[key].approver_id;
            this.requester.name = result.data.request_approver[key].approver.name;
          } else {
            this.director.id = result.data.request_approver[key].approver_id;
            this.director.name = result.data.request_approver[key].approver.name;
          }

        }

      }
    }, async (error) => {
      if( error.error.message == "Job Order No. already assigned." ){
        this.page_alert = {
          shown: true,
          messages: "Job Order already created for this form. Redirecting...",
          type: 'success',
        };
        setTimeout(() => {
          this.router.navigateByUrl('/pages/form-request/view/'+ error.error.data.id);
        }, 3000);
      } else {
        this.router.navigateByUrl('/pages/form-request');
      }
    });

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
    if(form_data['step'] == 1){
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
    console.log( $form );
    this.form_data = {
      ...this.form_data,
      ...$form
    }
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
    form_data['form_id'] = this.id;
    form_data['job_order_no'] = this.jobOrder;
    this.data_service.execute(
      {
        slug: 'v1.definitions.forms.continuation-generate',
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
        this.form_id = result.data.forms.id;
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

  clearAlert(){
    this.page_alert = {
      show:false
    };
    this.form_alert = {
      show:false
    };
  }

  onDone(){
    this.router.navigateByUrl('/pages/form-request/view/'+this.id);
  }

  addEquipment(content){
    this.clearAlert();
    this.form_equipment.data = {};
    this.modalReference = this.modalService.open(content, { size: 'md' });
  }

  searchEquipment(content){
    this.clearAlert();
    this.form_equipment.data = {};
    this.modalTitle = 'Search Equipment';
    this.modalReference = this.modalService.open(content, { size: 'lg' });
  }

  handleData( $event: {data, form}, step ) {
    switch ( step ) {
      case 1:
        this.form1.group = $event.form;
        this.form1.data = $event.data;
        this.form2.data = {
          'meta_college': this.result_data.metas.meta_request_college
        };
        console.log(this.form2);
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
            if($event.data.type_id == 2) this.hasEquipment = true;
            this.hasMaterials = true
            this.form2.field_array = field[$event.data.type_id].field_array;
          }
          else{
            this.hasEquipment = false;
            this.hasMaterials = false;
            this.form2.field_array = {};
          }
          this.form2.field = field[$event.data.type_id].meta;
          this.form3.field = field[$event.data.type_id].signatories;
          if($event.data.type_id == 3){
            this.form3_default['approver_requested'] = this.personnel.id;
            this.form3_default['approver_requested_approvestatus'] = 0;
            this.form3_default['approver_requested_full_name'] = this.personnel.name;
            this.form3_default['approver_certified'] = this.director.id;
            this.form3_default['approver_certified_approvestatus'] = 1;
            this.form3_default['approver_certified_full_name'] = this.director.name;
            this.form3_default['approver_approved'] = this.requester.id;
            this.form3_default['approver_approved_approvestatus'] = 1;
            this.form3_default['approver_approved_full_name'] = this.requester.name;
          } else {
            this.form3_default['approver_requested'] = this.personnel.id;
            this.form3_default['approver_requested_full_name'] = this.personnel.name;
            this.form3_default['approver_requested_approvestatus'] = 0;
            this.form3_default['approver_certified'] = this.requester.id;
            this.form3_default['approver_certified_full_name'] = this.requester.name;
            this.form3_default['approver_certified_approvestatus'] = 1;
            this.form3_default['approver_approved'] = this.director.id;
            this.form3_default['approver_approved_full_name'] = this.director.name;
            this.form3_default['approver_approved_approvestatus'] = 1;
          }
          this.form3.data = this.form3_default;
        }
        break
      case 2:
        this.form2.group = $event.form;
        this.form2.data = {
          ...this.form2.data,
          ...$event.data,
        };
        break;
      case 3:
        this.form3.group = $event.form;
        this.form3.data = {
          ...this.form3_default,
          ...$event.data,
        };
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
      case 'table_choose_equipment':
        this.requestDataState = false;
        let value = {
          "meta_property_no": $event.data.serial_no,
          "meta_brand_model": $event.data.brand
        };

        this.form2.data = {
          ...this.form2.data,
          ...value,
        };
        this.modalService.dismissAll();
        setTimeout(() => {
          this.requestDataState = true
        }, 100);
        break;
      case 'add_equipment':
        if($event.data.code == 200) {
          this.requestDataState = false;
          let request_data = $event.data.data.equipment;
          let value = {
            "meta_property_no": request_data.serial_no,
            "meta_brand_model": request_data.brand
          };

          this.form2.data = {
            ...this.form2.data,
            ...value,
          };
          this.modalService.dismissAll();
          setTimeout(() => {
            this.requestDataState = true
          }, 100);
        } else {
          this.form_alert = {
            shown: true,
            messages: $event.data.message
          }
        }
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
