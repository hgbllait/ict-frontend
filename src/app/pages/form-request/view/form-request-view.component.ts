import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  DocumentEditorContainerComponent,
  DocumentEditorKeyDownEventArgs,
  FormatType,
  ToolbarService
} from '@syncfusion/ej2-angular-documenteditor';
import {createSpinner, hideSpinner, showSpinner} from '@syncfusion/ej2-popups';
import {ActionItemSchema, StandardResponse, User} from "../../../@globals/models";
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {TemplateHandler} from 'easy-template-x';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {Title} from "@angular/platform-browser";
import {field, fill_out, field_view} from "./fields/fields";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import {Subject} from "rxjs";
import Swal from "sweetalert2";

declare const $:any;
@Component({
  selector: 'pg-form-request-view',
  templateUrl: './form-request-view.component.html',
  styleUrls: ['./form-request-view.component.scss'],
  providers: [ToolbarService]
})
export class FormRequestViewComponent extends BasePage implements OnInit {
  @ViewChild('documenteditor_ref') public container! : DocumentEditorContainerComponent;
  @ViewChild('user') modalUser: TemplateRef<any>;
  @Input() id;
  @Input() userId;
  @Input() isPage = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  serviceLink: string;
  formName: any;
  multiData: any = {
    name: '',
    title: [],
    data: [],
    data_key: []
  };
  typeId: number;
  requestId: any;
  requestApproverId: any;
  jobOrderId: any;
  jobOrderNo: any;
  hasMaterials: boolean = false;
  formState: boolean = false;
  formState2: boolean = true;
  isPaperless: boolean = true;
  forms: any;
  page_alert: any = {
    show: false
  };
  form_alert: any = {
    show: false
  };
  isDirector: boolean = false;
  isContinuation: boolean = false;
  isServiceRequest: boolean = false;
  isFormPending: boolean = true;
  approvers: any;
  modalReference: any;
  toolbarItems = ['Footer', 'PageSetup', 'PageNumber', 'Break', 'Separator', 'Find', 'Separator', 'LocalClipboard'];
  form = {
    data: {},
    group: {
      touched: false,
      invalid: true
    },
    field: {},
    field_array: {},
    data_array: {}
  };
  form_view = {
    data: {},
    field: {},
    field_array: {},
    data_array: {}
  };
  form_signatory = {
    data: {},
    group: {
      invalid: true
    },
    field: {},
    field_array: {},
    data_array: {}
  };
  status: any;
  templateData = {};
  templateFile: any;
  user: User;
  constructor(
    public authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private data_service: RequestFormService,
    private titleService: Title,
    private router: Router) {
    super(authService);
    this.serviceLink = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
    this.titleService.setTitle("Form Request | "+`${environment.APP_NAME}`);
  }

  ngOnInit() {
    if(this.isPage){
      this.user = this.authService.currentUserValue.user;
      this.userId = this.user.id;
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
      });
    }
    this.status = {
      show: false,
      percentage: 100,
      approval: 'Completed'
    };
    createSpinner({
      // Specify the target for the spinner to show
      target: document.getElementById('document_editor')
    });
    this.data_service.execute(
      {
        slug: 'v1.definitions.forms.status',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        id: this.id,
        user_id: this.userId,
        relationship: 'type',
        __response: {
          200: 'Successfully retrieved form request status.',
        },
      },
    ).subscribe(async (result: StandardResponse) => {
      this.page_alert.shown = false;
      if (result.code === 200) {
        this.forms = result.data.forms;
        this.formName = result.data.forms.name;
        if(result.data.request_approver_status.length != undefined
          && result.data.request_approver_status.length == 0){
          this.status.shown = false;
        } else {
          this.approvers = result.data.request_approver;
          this.status.percentage = result.data.request_approver_status.percentage;
          this.status.shown = true;
          if(this.status.percentage == 100) {
            this.status.approval = 'Completed';
          } else {
            this.status.approval = 'Pending';
          }
        }
        if(result.data.forms.form_type == 'paper') {
          this.isPaperless = false;
        }
        this.form.data = result.data.metas;
        for(var key in result.data.metas){
          if(result.data.metas[key].constructor === Array ){
            this.form.data_array[key] = result.data.metas[key];
          } else {}
          this.form.data[key] = result.data.metas[key];

        }
        for(var key in this.form.data_array){
          const split = key.split("_");
          let title = key;
          if(split.length > 1) {
            if (split[0] == 'meta') {
              split.shift();
              title = split.join(" ");
            }
          }
          this.multiData['name'] = title;
          this.multiData['data'] = [];
          this.multiData['data_key'] = [];
          for(var key_ in this.form.data_array[key]){
            this.multiData['data'].push(this.form.data_array[key][key_]);
            this.multiData['data_key'] = [];
            for(var key__ in this.form.data_array[key][key_]){
              this.multiData['data_key'].push(key__);

            }
          }
        }
        this.form.data['id'] = result.data.forms.id;
        this.form.data['file_link'] = result.data.forms.form_link;
        this.requestId = this.form_signatory.data['id'] = result.data.flow_control_request.id;
        this.requestApproverId = result.data.request_approver_id;
        this.templateData = result.data.metas;
        this.templateData = {
          ...this.templateData,
          ...result.data.forms
        }
        if(this.isPaperless){
          this.container.documentEditor.documentName = this.formName;
          this.templateData['name'] = result.data.forms.type.form_no
          this.documentGenerate();
        } else {
          if (result.data.forms.type_id) {
            if(result.data.forms.type_id == 2
              || result.data.forms.type_id == 5) {
              this.hasMaterials = true
              this.form_view.field_array = field_view[result.data.forms.type_id].field_array;
              if(result.data.forms.type_id == 2){
                this.multiData['title'] = ['Materials Needed', 'Quantity', 'Stocks Available', 'To be purchased'];
              } else if(result.data.forms.type_id == 5){
                this.multiData['title'] = ['Employee ID', 'Name', 'Employment Status', 'Nature of Request', 'Designation', 'Load Release', 'Rank', 'Degree Discipline', 'Others'];
              }
            }
            else{
              this.hasMaterials = false;
              this.form_view.field_array = {};
            }
            this.form_view.field = field_view[result.data.forms.type_id].meta;
          }
          this.form_view.data = this.form.data;
        }
        for(var i in result.data.request_approver){
          this.form_signatory.data['approver_' + result.data.request_approver[i]['name']] = result.data.request_approver[i]['approver_id'];
        }
        this.form_signatory.field = field[result.data.forms.type_id].signatories;
        this.typeId = result.data.forms.type_id;
        if(this.typeId == 1){
          this.isServiceRequest = true;
        }
        if(result.data.flow_control_request.approval_status !== "false") {
          this.isFormPending = false;
          if(this.typeId == 1){
            if(!result.data.metas.hasOwnProperty('meta_job_order_form_id')){
              this.isContinuation = true;
            } else {
              this.jobOrderId = result.data.metas.meta_job_order_form_id;
              this.jobOrderNo = result.data.metas.meta_job_order_no;
            }
          }
        }
        else {
          this.isDirector = result.data.is_director;
          this.onClickForm();
          this.isFormPending = true;
        }
        this.formState = true;
      }
    }, async (error) => {
      this.page_alert = {
        shown: true,
        messages: error['error'].message
      }
    });

  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;

  }

  onCreate(): void {
    this.container.documentEditor.spellChecker.languageID = 1033;
  }

  onDocumentChange(): void {
    this.container.documentEditor.focusIn();
  }

  onUpdate(){
    if(!this.form.group.invalid){
      let meta = {};
      let approver = [];
      let deleted = [];
      let form_data = this.form.data;
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

      form_data['meta'] = meta;
      form_data['flow_control_request'] = {};
      form_data['flow_control_request']['name'] = this.formName;
      form_data['flow_control_request']['flow_control_request_approver'] = [];
      for (var approve_key in approver) {
        if(typeof approver[approve_key] === 'object'){
          form_data['flow_control_request']['flow_control_request_approver'].push(approver[approve_key]);
        }
      }
      Object.keys(form_data).forEach(key => {
        if (form_data[key] === null) {
          delete form_data[key];
        }
      });
      this.data_service.execute(
        {
          slug: 'v1.definitions.forms.define-meta',
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
          this.form_alert = {
            shown: true,
            messages: result.message,
            type: 'success',
          };
          this.templateData = {
            ...this.templateData,
            ...this.form.data
          }
          if(this.isPaperless) {
            this.documentGenerate();
          } else {
            this.formState2 = false;
            this.data_service.execute(
              {
                slug: 'v1.definitions.forms.status',
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
              if (result.code === 200) {
                this.formState2 = true;
                this.forms = result.data.forms;
                this.form.data = result.data.metas;
                this.form.data['id'] = result.data.forms.id;
                this.form.data['file_link'] = result.data.forms.form_link;
                for(var key in result.data.metas){
                  if(result.data.metas[key].constructor === Array ){
                    this.form.data_array[key] = result.data.metas[key];
                  } else {}
                  this.form.data[key] = result.data.metas[key];

                }
                for(var key in this.form.data_array){
                  const split = key.split("_");
                  let title = key;
                  if(split.length > 1) {
                    if (split[0] == 'meta') {
                      split.shift();
                      title = split.join(" ");
                    }
                  }
                  this.multiData['name'] = title;
                  this.multiData['data'] = [];
                  this.multiData['data_key'] = [];
                  for(var key_ in this.form.data_array[key]){
                    if(typeof this.form.data_array[key][key_] === 'object') {
                      this.multiData['data'].push(this.form.data_array[key][key_]);
                      this.multiData['data_key'] = [];
                      for (var key__ in this.form.data_array[key][key_]) {
                        this.multiData['data_key'].push(key__);

                      }
                    }
                  }
                }
                this.templateData = result.data.metas;
                this.templateData = {
                  ...this.templateData,
                  ...result.data.forms
                }
                if (result.data.forms.type_id) {
                  if(result.data.forms.type_id == 2
                    || result.data.forms.type_id == 5) {
                    this.hasMaterials = true
                    this.form_view.field_array = field_view[result.data.forms.type_id].field_array;
                    if (result.data.forms.type_id == 2) {
                      this.multiData['title'] = ['Materials Needed', 'Quantity', 'Stocks Available', 'To be purchased'];
                    } else if (result.data.forms.type_id == 5) {
                      this.multiData['title'] = ['Employee ID', 'Name', 'Employment Status', 'Nature of Request', 'Designation', 'Load Release', 'Rank', 'Degree Discipline', 'Others'];

                    }
                  }
                  else{
                    this.hasMaterials = false;
                    this.form_view.field_array = {};
                  }
                  this.form_view.field = field_view[result.data.forms.type_id].meta;
                }
                this.form_view.data = this.form.data;
              }
            }, async (error) => {
              this.page_alert = {
                shown: true,
                messages: error['error'].message
              }
            });
          }
        }, async error => { // Error
          for (var key in deleted) {
            form_data[key] = deleted[key];
          }
          error = error['error'];
          this.form_alert = {
            shown: true,
            messages: error.message,
            type: 'danger',
          };
        });
    }
  }

  onSignatoryUpdate(){
    if(!this.form_signatory.group.invalid){
      let approver = [];
      let deleted = [];
      let form_data = this.form_signatory.data;
      console.log(form_data);
      form_data['id'] = this.form_signatory.data['id'];
      for (var key in form_data) {
        const split = key.split("_");
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

      form_data['flow_control_request'] = {};
      form_data['flow_control_request']['flow_control_request_approver'] = [];
      for (var approve_key in approver) {
        if(typeof approver[approve_key] === 'object'){
          form_data['flow_control_request']['flow_control_request_approver'].push(approver[approve_key]);
        }
      }
      Object.keys(form_data).forEach(key => {
        if (form_data[key] === null) {
          delete form_data[key];
        }
      });
      this.data_service.execute(
        {
          slug: 'v1.definitions.forms.define-flow-control',
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
        this.form_alert = {
          shown: true,
          messages: result.message,
          type: 'success',
        };
        this.data_service.execute(
          {
            slug: 'v1.definitions.forms.status',
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
          if (result.code === 200) {
            if(result.data.request_approver_status.length != undefined
              && result.data.request_approver_status.length == 0){
              this.status.shown = false;
            } else {
              this.approvers = result.data.request_approver;
              this.status.percentage = result.data.request_approver_status.percentage;
              this.status.shown = true;
              if(this.status.percentage == 100) {
                this.status.approval = 'Completed';
              } else {
                this.status.approval = 'Pending';
              }
            }

          }
        }, async (error) => {
          this.page_alert = {
            shown: true,
            messages: error['error'].message
          }
        });
      }, async error => { // Error
        for (var key in deleted) {
          form_data[key] = deleted[key];
        }
        error = error['error'];
        this.form_alert = {
          shown: true,
          messages: error.message,
          type: 'danger',
        };
      });
    }
  }

  onClickForm(){
    $("#theme-settings").toggleClass("open");
    this.form.data = this.templateData;
    if (field.hasOwnProperty(this.typeId)) {
      if(this.typeId == 2
        || this.typeId == 5) {
        this.hasMaterials = true
        this.form.field_array = field[this.typeId].field_array;
      }
      else{
        this.hasMaterials = false;
        this.form.field_array = {};
      }

      this.form.field = field[this.typeId].meta;
      if(this.typeId == 2
        || this.typeId == 6
        || this.typeId == 7) {
        if(this.isDirector){
          this.form.field_array = {};
          this.form.field = fill_out[this.typeId].meta;

        }

      }
    }
    this.formState = true;
  }

  onClickSignatory(){
    $("#signatory-settings").toggleClass("open");
    this.form.data = this.templateData;
    this.formState = true;
  }

  onCloseForm(){
    $("#right-sidebar, #theme-settings, #signatory-settings").removeClass("open");
    this.clearAlert();
  }

  onPrint(){
    this.container.documentEditor.print();
  }

  onDownload(){
    this.container.documentEditor.save(this.container.documentEditor.documentName, 'Docx' as FormatType);
  }

  clearAlert(){
    this.form_alert = {
      show:false
    };
  }

  documentGenerate() {
    showSpinner(document.getElementById('document_editor'));
    ( async () => {
      let ajax: XMLHttpRequest = new XMLHttpRequest();
      ajax.open('POST', this.serviceLink + 'Import', true);
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
          if (ajax.status === 200 || ajax.status === 304) {
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
            hideSpinner(document.getElementById('document_editor'));
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

  handleData( $event: {data, form}, action: any = 0 ) {
    switch ( action ) {
      default:
        this.form.group = $event.form;
        this.form.data = {
          ...this.form.data,
          ...$event.data,
        };
        break;
      case 'nested':
        if(this.form.group.constructor.name !== "RxFormGroup") {
          if (!this.form.group.touched) {
            this.form.group.touched = true;
            this.form.group.invalid = false;
          }
        }
        this.form.data = {
          ...this.form.data,
          ...this.form.data_array
        }
        break;
      case 'signatory':
        this.form_signatory.group = $event.form;
        this.form_signatory.data = $event.data;
        break;
    }
  }

  handleAction($event: ActionItemSchema) {
    console.log('FormRequests ACTION:', $event);
    switch ( $event.action ) {
      case 'approver_approve':
        let prompt = {
          success: 'Successfully submit a request.',
          failed: 'Failed to submit a request.'

        };
        if($event.value === "false") {
          prompt = {
            success: 'Successfully override approved a request.',
            failed: 'Failed to approve a request.'

          };
        }
        if($event.value !== "false" && $event.value !== "submit") {
          return;
        }
        return this.data_service.execute(
          {
            slug: 'v1.flow_control.requests.request_id.approvers.approve',
            exception: {
              message: 'Ooopssss. Something went wrong! We will get back to you.',
              class: 'error',
              type: 'none',
            },
          },
          {
            id: $event.data.id,
            request_id: $event.data.flow_control_request_id,
            override: true,
            __response: {
              200: prompt.success,
            },
          },
        ).subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.form_alert = {
              shown: true,
              messages: prompt.success,
              type: 'success',
            };
            this.data_service.execute(
              {
                slug: 'v1.definitions.forms.status',
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
              if (result.code === 200) {
                this.requestApproverId = result.data.request_approver_id;
                if(result.data.request_approver_status.length != undefined
                  && result.data.request_approver_status.length == 0){
                  this.status.shown = false;
                } else {
                  this.approvers = result.data.request_approver;
                  this.status.percentage = result.data.request_approver_status.percentage;
                  this.status.shown = true;
                  if(this.status.percentage == 100) {
                    this.status.approval = 'Completed';
                  } else {
                    this.status.approval = 'Pending';
                  }
                }
                if(this.typeId == 1){
                  this.isServiceRequest = true;
                }
                if(result.data.flow_control_request.approval_status !== "false") {
                  this.isFormPending = false;
                  if(this.typeId == 1){
                    if(!result.data.metas.hasOwnProperty('meta_job_order_form_id')){
                      this.isContinuation = true;
                    } else {
                      this.jobOrderId = result.data.metas.meta_job_order_form_id;
                      this.jobOrderNo = result.data.metas.meta_job_order_no;
                    }
                  }
                }

              }
              if($event.value === "submit") {
                this.form_alert = {
                  shown: true,
                  messages: 'Redirecting...',
                  type: 'success',
                };
                setTimeout(() => {
                  this.router.navigate(['/pages/form-request/view/' + this.id + '/create']);
                }, 2000);
              }
            }, async (error) => {
              this.page_alert = {
                shown: true,
                messages: error['error'].message
              }
            });
          }
        }, error => {
          this.form_alert = {
            shown: true,
            messages: prompt.failed,
            type: 'danger',
          };
        });
        break;
    }
  }

}
