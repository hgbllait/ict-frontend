import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  ToolbarService,
  DocumentEditorContainerComponent,
  FormatType,
  DocumentEditorKeyDownEventArgs
} from '@syncfusion/ej2-angular-documenteditor';
import { ActionItemSchema, StandardResponse } from "../../@globals/models";
import { RequestFormService } from "../../@globals/services/api/request-form";
import * as moment from 'moment';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FormControlConfig, DynamicFormBuildConfig, RxDynamicFormBuilder } from "@rxweb/reactive-dynamic-forms";
import {environment} from "../../../environments/environment";
import {Title} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {SpinnerService} from "../../@globals/helpers/ui/loader/loader.helper";
import * as form2 from './json/form-2.json';
import * as form3 from './json/form-3.json';
import {BasePage} from "../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../@globals/services/api/auth";
declare const $:any;

@Component({
  selector: 'pg-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  providers: [ToolbarService]
})
export class DocumentComponent extends BasePage implements OnInit {
  @ViewChild('documenteditor_ref') public container! : DocumentEditorContainerComponent;
  @ViewChild('signature') modalSignature: TemplateRef<any>;
  public serviceLink: string;
  open: boolean = false;
  formName: string;
  approvers: any;
  approverId: number;
  requestId: number;
  requestApproverId: number;
  page_alert: any = {
    show: false
  };
  form_alert: any = {
    show: false
  };
  verified: boolean = false;
  jobOrderNo: any;
  defaultESig;
  modalReference: any;
  toolbarItems = ['Footer', 'PageSetup', 'PageNumber', 'Break', 'Separator', 'Find', 'Separator', 'LocalClipboard'];
  form = {
    data: {},
    group: {
      invalid: true
    },
    field: {}
  };
  uiBindings: string[] = ["action","remarks"];
  dynamicFormBuildConfig: DynamicFormBuildConfig;
  status: any;
  templateData = {};
  templateFile: any;
  loginForm: FormGroup;
  showPassword: boolean;
  submitted: boolean = false;
  isFormPending: boolean = true;
  constructor(
    public authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private data_service: RequestFormService,
    private fb: FormBuilder,
    private titleService: Title,
    private formBuilder: RxDynamicFormBuilder,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    public spinner: SpinnerService) {
    super(authService);
    this.serviceLink = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
    this.titleService.setTitle("Form | "+`${environment.APP_NAME}`);
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      password: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.jobOrderNo = params['link'];
    });
    this.verified = false;
    this.status = {
      show: false,
      percentage: 100,
      approval: 'Completed'
    };
    this.showPassword = false;
    this.data_service.execute(
      {
        slug: 'v1.definitions.forms.fetch-job-order-form',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        job_order_no: this.jobOrderNo,
        relationship: 'type',
        __response: {
          200: 'Successfully retrieved form request by link.',
        },
      },
    ).subscribe(async (result: StandardResponse) => {
      this.page_alert.shown = false;
      if (result.code === 200) {
        this.templateData = result.data.result;
        this.documentGenerate();
      }
    }, async (error) => {
      this.page_alert = {
        shown: true,
        messages: error['error'].message
      }
    });
    this.dynamicFormBuildConfig = this.formBuilder.formGroup([
      {
        name: "id",
        type: "hidden",
        validators: {},
        ui: {}
      },
      {
        name: "action",
        type: "select",
        value: 1,
        source: [
          {
            "value": 1,
            "text": "Approve",
          },
          {
            "value": 0,
            "text": "Reject",
          }
        ],
        ui: {
          label: 'Action',
          placeholder: 'Select Action',
          viewMode: {
            advance: {
              div: ["col-md-12","col-sm-12"]
            }
          },
        },
        validators: {
          "required": true
        }
      },
      {
        name: "remarks",
        type: "textarea",
        modelName: 'actionModel',
        additionalConfig: {
          prop: {
            rows: 5,
            cols: 50
          }
        },
        ui: {
          label: "Remarks (optional)",
          placeholder: "Remarks",
          viewMode: {
            advance: {
              div: ["col-md-12", "col-sm-12"]
            }
          },
        }
      },
    ], {});
  }

  onCreate(): void {
    this.container.documentEditor.spellChecker.languageID = 1033;
  }

  onDocumentChange(): void {
    this.container.documentEditor.focusIn();
  }

  onUpdate(){
    this.dynamicFormBuildConfig.formGroup.submitted = true;
    if(!this.dynamicFormBuildConfig.formGroup.invalid){
      let deleted = [];
      let form_data = this.dynamicFormBuildConfig.formGroup.value;
      Object.keys(form_data).forEach(key => {
        if (form_data[key] === null) {
          delete form_data[key];
        }
      });
      form_data['flow_control_request_id'] = this.requestId;
      form_data['flow_control_request_approver_id'] = this.requestApproverId;
      this.data_service.execute(
        {
          slug: 'v1.flow_control.requests.approval',
          exception: {
            message: 'Ooopssss. Something went wrong! We will get back to you.',
            class: 'error',
            type: 'none',
          },
        },
        form_data
      ).subscribe( async (result: StandardResponse) => { // Success
        for (var key in deleted) {
          form_data[key] = deleted[key];
        }
        let message = result.message;
        this.isFormPending = false;
        this.data_service.execute(
          {
            slug: 'v1.definitions.forms.fetch-job-order-form',
            exception: {
              message: 'Ooopssss. Something went wrong! We will get back to you.',
              class: 'error',
              type: 'none',
            },
          },
          {
            job_order_no: this.jobOrderNo,
            relationship: 'type',
            __response: {
              200: 'Successfully retrieved form request by link.',
            },
          },
        ).subscribe(async (result: StandardResponse) => {
          this.page_alert.shown = false;
          if (result.code === 200) {
            this.templateData = result.data.result[0];
            this.documentGenerate();
            Swal.fire({
              title: 'Notification',
              icon: 'success',
              showConfirmButton: true,
              allowOutsideClick: true,
              allowEscapeKey: true,
              html: message,
            });
          }
        }, async (error) => {
          this.page_alert = {
            shown: true,
            messages: error['error'].message
          }
          Swal.fire({
            title: 'Failed',
            icon: 'error',
            showConfirmButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            html: 'Failed to update. Please reload this page',
          });
        });
      }, async error => { // Error
        for (var key in deleted) {
          form_data[key] = deleted[key];
        }
        Swal.fire({
          title: 'Failed',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          html: error.error.message
        });
      });
    }
  }

  onClickForm(){
    $("#theme-settings").toggleClass("open");
    this.form.data = this.templateData;
    this.open = true;
  }

  onClickSignature(){
    this.modalReference = this.modalService.open(this.modalSignature, { size: 'lg' });
  }

  onCloseForm(){
    $("#right-sidebar,#theme-settings").removeClass("open");
    this.clearAlert();
  }

  onPrint(){
    this.container.documentEditor.print();
  }

  onDownload(){
    this.container.documentEditor.save(this.jobOrderNo, 'Docx' as FormatType);
  }

  changeFieldType() {
    this.showPassword = !this.showPassword;
  }

  clearAlert(){
    this.form_alert = {
      show:false
    };
    this.page_alert = {
      show:false
    };
  }

  documentGenerate() {
    this.container.documentEditor.documentName = this.formName;
    let ajax_response;
    if(this.templateData['ii_type_id'] == 3) {
      ajax_response = JSON.parse(JSON.stringify((<any>form3)));
    } else {
      ajax_response = JSON.parse(JSON.stringify((<any>form2)));
    }
    ajax_response['sections'] = this.parse(ajax_response['sections']);
    this.container.documentEditor.open(ajax_response);
    this.container.documentEditor.keyDown = function (args: DocumentEditorKeyDownEventArgs) {
      let keyCode: number = args.event.which || args.event.keyCode;
      let isCtrlKey: boolean = (args.event.ctrlKey || args.event.metaKey) ? true : ((keyCode === 17) ? true : false);
      if (isCtrlKey && keyCode === 83) { // 83 is the character code for 'S'
        args.isHandled = true;
      } else if (isCtrlKey && keyCode === 80) { // 80 is the character code for 'S'
        args.isHandled = true;
      }
    }
  }

  parse(arr) {
    return arr.map(obj => {
      Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
          this.parse(obj[key]);
        }
        if(key === 'text') {
          let new_value = null;
          if (obj[key].indexOf('i_') > -1) {
            new_value = obj[key].replace('i_','');
          } else {}
          if(obj[key].indexOf('ii_') > -1){
            new_value = obj[key].replace('ii_','');
          } else {}
          if(new_value){
            if (this.templateData.hasOwnProperty(obj[key])) {
              if(new_value == 'meta_requested_name'
                || new_value == 'meta_certified_name'
                || new_value == 'meta_approved_name'){
                obj[key] = this.addSpace(this.templateData[obj[key]], 35);
                return;
              }
              if(new_value == 'date_effective'
                || new_value == 'meta_job_order_date'
                || new_value == 'meta_date_requested'
                || new_value == 'meta_date_created'
                || new_value == 'meta_requested_date_signed'
                || new_value == 'meta_certified_date_signed'
                || new_value == 'meta_approved_date_signed'){
                obj[key] = moment(this.templateData[obj[key]]).format('MMM DD, YYYY');
              } else {
                obj[key] = this.templateData[obj[key]];
              }
            }
            else {
              if(new_value == 'meta_requested_date_signed'
              || new_value == 'meta_certified_date_signed'
              || new_value == 'meta_approved_date_signed'){
                obj[key] = this.addSpace('', 20);
                return;
              }
              obj[key] = '';
            }
          }

        }

        /*
        * Update Docs Image
        */
        if (key === 'textWrappingStyle') {
          if( obj['name'] == 'i_meta_requested_signature'){
            if(this.templateData['i_meta_requested_signature'])  obj['imageString'] = this.templateData['i_meta_requested_signature'];
            else obj['imageString'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          }
          else if( obj['name'] == 'i_meta_certified_signature'){
            if(this.templateData['i_meta_certified_signature'])  obj['imageString'] = this.templateData['i_meta_certified_signature'];
            else obj['imageString'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          }
          else if( obj['name'] == 'i_meta_approved_signature'){
            if(this.templateData['i_meta_approved_signature'])  obj['imageString'] = this.templateData['i_meta_approved_signature'];
            else obj['imageString'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          }
          else if( obj['name'] == 'ii_meta_requested_signature'){
            if(this.templateData['ii_meta_requested_signature'])  obj['imageString'] = this.templateData['ii_meta_requested_signature'];
            else obj['imageString'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          }
          else if( obj['name'] == 'ii_meta_hardware_related'){
            if(this.templateData['ii_meta_related']
              && this.templateData['ii_meta_related'] == 'Hardware') obj['imageString'] = "data:image/webp;base64,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";
          }
          else if( obj['name'] == 'ii_meta_software_related'){
            if(this.templateData['ii_meta_related']
              && this.templateData['ii_meta_related'] == 'Software') obj['imageString'] = "data:image/webp;base64,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";
          }
          else if( obj['name'] == 'ii_meta_certified_signature'){
            if(this.templateData['ii_meta_certified_signature'])  obj['imageString'] = this.templateData['ii_meta_certified_signature'];
            else obj['imageString'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          }
          else if( obj['name'] == 'ii_meta_approved_signature'){
            if(this.templateData['ii_meta_approved_signature'])  obj['imageString'] = this.templateData['ii_meta_approved_signature'];
            else obj['imageString'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          }
        }
      })

      return obj;
    })
  }

  addSpace(s,maxLength){
    return s.length >= maxLength ? s : s + " ".repeat(maxLength-s.length);
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
      case 'draw-signature':
        var file = new File([$event.value], 'signature.png');
        var formData: FormData = new FormData();
        // @ts-ignore
        formData.append('approver_id', this.approverId);
        formData.append('file', file);
        this.spinner.show();
        this.httpClient
          .post<any>('http://localhost:8000/api/v1/utilities/files/upload', formData)
          .subscribe((result: StandardResponse) => {
            this.spinner.hide();
            if (result.code === 200) {
              this.defaultESig = result.data.signature
              this.modalReference.close();
              Swal.fire({
                title: 'Notification',
                icon: 'success',
                showConfirmButton: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                html: result.message,
              });
            }
          }, (error) => {
            this.spinner.hide();
            Swal.fire({
              title: 'Failed',
              icon: 'error',
              showConfirmButton: true,
              allowOutsideClick: true,
              allowEscapeKey: true,
              html: error.error.message,
            });
          });
        break;
      case 'upload-signature':
        var formData: FormData = new FormData();
        // @ts-ignore
        formData.append('approver_id', this.approverId);
        formData.append('file', $event.value);
        this.spinner.show();
        this.httpClient
          .post<any>('http://localhost:8000/api/v1/utilities/files/upload', formData)
          .subscribe((result: StandardResponse) => {
            this.spinner.hide();
            if (result.code === 200) {
              this.defaultESig = result.data.signature
              this.modalReference.close();
              Swal.fire({
                title: 'Notification',
                icon: 'success',
                showConfirmButton: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                html: result.message,
              });
            }
          }, (error) => {
            this.spinner.hide();
            Swal.fire({
              title: 'Failed',
              icon: 'error',
              showConfirmButton: true,
              allowOutsideClick: true,
              allowEscapeKey: true,
              html: error.error.message,
            });
          });
        break;
    }
  }

}
