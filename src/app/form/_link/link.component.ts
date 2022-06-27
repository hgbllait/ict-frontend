import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  ToolbarService,
  DocumentEditorContainerComponent,
  FormatType,
  DocumentEditorKeyDownEventArgs
} from '@syncfusion/ej2-angular-documenteditor';
import { ActionItemSchema, StandardResponse } from "../../@globals/models";
import { RequestFormService } from "../../@globals/services/api/request-form";
import { TemplateHandler } from 'easy-template-x';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FormControlConfig, DynamicFormBuildConfig, RxDynamicFormBuilder } from "@rxweb/reactive-dynamic-forms";
import {environment} from "../../../environments/environment";
import {Title} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {SpinnerService} from "../../@globals/helpers/ui/loader/loader.helper";
import {ErrorMessageUtilityService} from "../../@globals/services/utility/errors/error.message.utility.service";
import {BasePage} from "../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../@globals/services/api/auth";
declare const $:any;

@Component({
  selector: 'form-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  providers: [ToolbarService]
})
export class LinkComponent extends BasePage implements OnInit {
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
  link: any;
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
      this.link = params['link'];
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
        slug: 'v1.definitions.forms.fetch-link-form',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        link: this.link,
        relationship: 'type',
        __response: {
          200: 'Successfully retrieved form request by link.',
        },
      },
    ).subscribe(async (result: StandardResponse) => {
      this.page_alert.shown = false;
      if (result.code === 200) {
        if(result.data.request_approver_status.length != undefined
          && result.data.request_approver_status.length == 0){
          this.status.shown = false;
        } else {
          this.status.percentage = result.data.request_approver_status.percentage;
          this.status.shown = true;
          if(this.status.percentage == 100) {
            this.status.approval = 'Completed';
          } else {
            this.status.approval = 'Pending';
          }
        }
        this.form.data = result.data.metas;
        this.form.data['id'] = result.data.forms.id
        this.formName = result.data.forms.name;
        this.templateData = result.data.metas;
        this.templateData = {
          ...this.templateData,
          ...result.data.forms
        }
        this.approvers = result.data.request_approver;
        this.templateData['name'] = result.data.forms.type.form_no
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
            slug: 'v1.definitions.forms.fetch-link-form',
            exception: {
              message: 'Ooopssss. Something went wrong! We will get back to you.',
              class: 'error',
              type: 'none',
            },
          },
          {
            link: this.link,
            relationship: 'type',
            __response: {
              200: 'Successfully retrieved form request by link.',
            },
          },
        ).subscribe(async (result: StandardResponse) => {
          this.page_alert.shown = false;
          if (result.code === 200) {
            if(result.data.request_approver_status.length != undefined
              && result.data.request_approver_status.length == 0){
              this.status.shown = false;
            } else {
              this.status.percentage = result.data.request_approver_status.percentage;
              this.status.shown = true;
              if(this.status.percentage == 100) {
                this.status.approval = 'Completed';
              } else {
                this.status.approval = 'Pending';
              }
            }
            this.form.data = result.data.metas;
            this.form.data['id'] = result.data.forms.id
            this.formName = result.data.forms.name;
            this.templateData = result.data.metas;
            this.templateData = {
              ...this.templateData,
              ...result.data.forms
            }
            this.approvers = result.data.request_approver;
            this.templateData['name'] = result.data.forms.type.form_no
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
    this.container.documentEditor.save(this.container.documentEditor.documentName, 'Docx' as FormatType);
  }

  onVerify(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.data_service.execute(
      {
        slug: 'v1.flow_control.requests.verify',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        link: this.link,
        password: this.loginForm.value.password,
        __response: {
          200: 'Successfully verify form request.',
        },
      },
    ).subscribe((result: StandardResponse) => {
      this.submitted = false;
      this.page_alert.shown = false;
      if (result.code === 200) {
        this.approverId = result.data.flow_control_request_approver.approver_id;
        this.requestId = result.data.flow_control_request_approver.flow_control_request_id;
        this.requestApproverId = result.data.flow_control_request_approver.id;
        if(result.data.flow_control_request_approver.approval_status !== "false") this.isFormPending = false;
        else this.isFormPending = true;
        this.defaultESig = result.data.signature;
        this.verified = true;
        this.clearAlert();
        this.documentGenerate();
        this.onClickForm();
      }
    }, (error) => {
      this.verified = false;
      this.form_alert = {
        shown: true,
        messages: error['error'].message
      }
    });
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
    ( async () => {
      let ajax: XMLHttpRequest = new XMLHttpRequest();
      ajax.open('POST', this.serviceLink + 'Import', true);
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          if (ajax.status === 200 || ajax.status === 304) {
            this.container.documentEditor.documentName = this.formName;
            let ajax_response = JSON.parse(ajax.responseText);
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
        }
      };
      const response = await fetch('/assets/files/FM-USeP-ICT-06.docx');
      const templateFile = await response.blob();

      const handler = new TemplateHandler();
      const docx = await handler.process(templateFile, this.templateData);

      let formData: FormData = new FormData();
      formData.append('files', docx);
      ajax.send(formData);
      this.templateFile = templateFile;
    })();
  }

  parse(arr) {
    return arr.map(obj => {
      Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
          this.parse(obj[key]);
        }
        if (key === 'textWrappingStyle') {
          if( obj['name'] == 'Picture 8'){
            if(this.templateData['meta_requested_signature'])  obj['imageString'] = this.templateData['meta_requested_signature'];
            else obj['imageString'] = '';
          }
          else if( obj['name'] == 'Picture 7'){
            if(this.templateData['meta_certified_signature'])  obj['imageString'] = this.templateData['meta_certified_signature'];
            else obj['imageString'] = '';
          }
          else if( obj['name'] == 'Picture 6'){
            if(this.templateData['meta_approved_signature'])  obj['imageString'] = this.templateData['meta_approved_signature'];
            else obj['imageString'] = '';
          }
        }
      })

      return obj;
    })
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
