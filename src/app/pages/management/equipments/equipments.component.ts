import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {Title} from "@angular/platform-browser";
import {ActionItemSchema, StandardResponse} from "../../../@globals/models";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {BasePage} from "../../../@globals/baseclasses/pages/base.page";
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {AuthenticationService} from "../../../@globals/services/api/auth";
import Responsive from 'datatables.net-responsive';

@Component({
  selector: 'pg-management-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})

export class EquipmentsComponent extends BasePage implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('equipment') modalEquipment: TemplateRef<any>;
  modalTitle: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  equipments: any = {};
  form_alert: any = {
    show: false
  };
  page_alert: any = {
    show: false
  };
  modalReference: any;
  data: any = {};
  form_actions = {
    view: [],
    add: [
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
    edit:  [
      {
        text: 'Update',
        status: 'primary',
        target: 'update_equipment',
        icon: 'ti-file btn-icon-prepend',
        size: 'medium',
        display: true,
        call: 'v1.definitions.equipments.define',
        action_type: 'define',
      },
    ],
  };
  formData = {
    button: this.form_actions.add,
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
  };

  constructor(
    public authService: AuthenticationService,
    private data_service: RequestFormService,
    private titleService: Title,
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
      fetch: 'v1.definitions.equipments.fetch',
    };

    this.page.indexes = {
      view: 'equipment',
      update: 'equipment',
      table: 'equipment',
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
        { width: "5%", targets: 4 }
      ]
    };
    this.fetchEquipment()
      .subscribe((result: StandardResponse) => {
        if ( result.code === 200 ) {
          this.equipments = result.data.equipment;
          this.dtTrigger.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  addEquipment(content){
    this.clearAlert();
    this.data = {};
    this.modalTitle = 'Add Equipment';
    this.formData.button = this.form_actions.add;
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

  fetchEquipment() {
    return this.data_service.execute(
      {
        slug: 'v1.definitions.equipments.all',
        exception: {
          message: 'Ooopssss. Something went wrong! We will get back to you.',
          class: 'error',
          type: 'none',
        },
      },
      {
        __response: {
          200: 'Successfully retrieved equipments.',
        },
      },
    );
  }

  handleAction($event: ActionItemSchema) {
    console.log('Equipments ACTION:', $event);
    switch ( $event.action ) {
      case 'add_equipment':
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
      case 'update_equipment':
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
        console.log( $event );
        this.data_service.call(this.page.endpoints.fetch, {id: $event.value})
          .subscribe(result => {
            const result_data = this.getResultData(result, this.page.indexes);
            console.log(result_data);
            this.data = result_data;
            this.formData.button = this.form_actions.edit;
            this.modalTitle = 'Update Equipment';
            this.modalReference = this.modalService.open(this.modalEquipment, { size: 'md' });
            this.clearAlert();
          });
        break;
      case 'table_action_update':
        break;
      case 'table_action_delete':
        break;
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.fetchEquipment()
        .subscribe((result: StandardResponse) => {
          if ( result.code === 200 ) {
            this.equipments = result.data.equipment;
            this.dtTrigger.next();
          }
        });
    });
  }

}
