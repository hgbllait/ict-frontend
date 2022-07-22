import {ApproverModel} from "../../../../@theme/components/forms/models/approver.model";
import {FormTypeModel} from "../../../../@theme/components/forms/models/form-type.model";
import {HideRelatedModel} from "../../../../@theme/components/forms/models/hide-related.model";
import {HideRelatedHardwareModel} from "../../../../@theme/components/forms/models/hide-related-hardware.model";
import * as moment from "moment";
export let field = {
  "1": {
    "meta": {
      "models": [
        { "modelName": 'formTypeModel', "model": FormTypeModel }
      ],
      "endpoint": "",
      "bindings": ["file_link", "meta_request_college", "meta_request_details"],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "file_link",
          "type": "text",
          "ui": {
            "label":"File Link",
            "placeholder":"File Link",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_request_college",
          "type": "text",
          "ui": {
            "label":"Request College/Office:",
            "placeholder":"Request College/Office",
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
          "name": "meta_request_details",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 10,
              "cols": 50
            }
          },
          "ui": {
            "label":"Request Details:",
            "placeholder":"Request Details",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": true
          }
        }
      ]
    },
    "signatories": {
      "models": [
        { "modelName": 'approverRequestedModel', "model": ApproverModel, "arguments": [{
            name: 'End User'
          }] },
        { "modelName": 'approverCertifiedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Personnel', 'user': true
          }] },
        { "modelName": 'approverApprovedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Director', 'director': true
          }] },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_approvestatus", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_approvestatus", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_approvestatus", "approver_approved_notify"]],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested",
          "type": "select",
          "modelName": "approverRequestedModel",
          "ui": {
            "label": "Requested By",
            "placeholder": "Select Requested By",
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified",
          "type": "select",
          "modelName": "approverCertifiedModel",
          "ui": {
            "label": "Reviewed By",
            "placeholder": "Select Reviewed By",
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
          "name": "approver_certified_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_approvestatus",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved",
          "type": "select",
          "modelName": "approverApprovedModel",
          "ui": {
            "label": "Endorsed By",
            "placeholder": "Select Endorsed By",
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
          "name": "approver_approved_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        }
      ]
    }
  },
  "2": {
    "meta": {
      "models": [
        { "modelName": 'hideSoftware', "model": HideRelatedModel },
        { "modelName": 'hideHardware', "model": HideRelatedHardwareModel },
      ],
      "endpoint": "",
      "bindings": [
        "file_link",
        ["meta_date_requested", "meta_date_needed"],
        ["meta_job_order_no", "meta_college"],
        "meta_hardware",
        "meta_software",
        "meta_others",
        ["meta_property_no", "meta_brand_model"],
        "meta_findings",
        "meta_action_taken",
        ["meta_result", "meta_result_others"],
        "meta_result_remarks",
        [ "meta_repair_started_date", "meta_repair_started_time" , "meta_repair_ended_date", "meta_repair_ended_time"]
      ],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "file_link",
          "type": "text",
          "ui": {
            "label":"File Link",
            "placeholder":"File Link",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_date_requested",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Date Requested:",
            "placeholder":"Date Requested",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_date_needed",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Date Needed:",
            "placeholder":"Date Needed",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_job_order_no",
          "type": "text",
          "ui": {
            "label":"Job Order No.:",
            "placeholder":"Job Order No.",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"College/Office:",
            "placeholder":"College/Office",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_hardware",
          "type": "select",
          "source": [
            { "value": "System Unit", "text": "System Unit" },
            { "value": "Switch/Routers/AP", "text": "Switch/Routers/AP" },
            { "value": "Monitor", "text": "Monitor" },
            { "value": "CCTV", "text": "CCTV" },
            { "value": "Printer/Scanner", "text": "Printer/Scanner" },
            { "value": "Projector", "text": "Projector" },
            { "value": "UPS/AVR", "text": "UPS/AVR" },
            { "value": "Turnstile", "text": "Turnstile" },
            { "value": "Bio-metric", "text": "Bio-metric" },
            { "value": "SIP Phone", "text": "SIP Phone" }
          ],
          "ui": {
            "label":"Hardware Type:",
            "placeholder":"Choose Hardware Type",
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
          "name": "meta_software",
          "type": "textarea",
          "ui": {
            "label":"Software:",
            "placeholder":"Software",
            "description":"Leave blank if not applicable.",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_others",
          "type": "textarea",
          "ui": {
            "label":"Others:",
            "placeholder":"Others",
            "description":"Leave blank if not applicable.",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_property_no",
          "type": "text",
          "ui": {
            "label":"Property No:",
            "placeholder":"Property No",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_brand_model",
          "type": "text",
          "ui": {
            "label":"Brand/Model:",
            "placeholder":"Brand/Model",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_findings",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Remarks/Findings:",
            "placeholder":"Remarks/Findings",
            "description":"Please Specify",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_action_taken",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Action Taken:",
            "placeholder":"Action Taken",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_result",
          "type": "select",
          "source": [
            { "value": "Repaired", "text": "Repaired" },
            { "value": "Pending", "text": "Pending" },
            { "value": "Others", "text": "Others" },
          ],
          "ui": {
            "label":"Repair Results:",
            "placeholder":"Choose Repair Results",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_result_others",
          "type": "textarea",
          "ui": {
            "label":"Other Result: (Specify Other Result)",
            "placeholder":"Other Result",
            "description": "Leave blank if not result others",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": {
              "conditionalExpression":"x => x.meta_result == \"Others\""
            }
          }
        },
        {
          "name": "meta_result_remarks",
          "type": "textarea",
          "ui": {
            "label":"Result Remarks:",
            "placeholder":"Result Remarks",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_repair_started_date",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Repair Started Date:",
            "placeholder":"Repair Started Date",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_repair_started_time",
          "type": "time",
          "ui": {
            "label":"Repair Started Time:",
            "placeholder":"Repair Started Time",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_repair_ended_date",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Repair Ended Date:",
            "placeholder":"Repair Ended Date",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_repair_ended_time",
          "type": "time",
          "ui": {
            "label":"Repair Ended Time:",
            "placeholder":"Repair Ended Time",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
      ],
    },
    "signatories": {
      "models": [
        { "modelName": 'approverRequestedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Personnel', 'user': true
          }] },
        { "modelName": 'approverCertifiedModel', "model": ApproverModel, "arguments": [{
            name: 'End User'
          }] },
        { "modelName": 'approverApprovedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Director', 'director': true
          }] },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_approvestatus", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_approvestatus", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_approvestatus", "approver_approved_notify"]],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested",
          "type": "select",
          "modelName": "approverRequestedModel",
          "ui": {
            "label": "Repaired By",
            "placeholder": "Select Repaired By",
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_approvestatus",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified",
          "type": "select",
          "modelName": "approverCertifiedModel",
          "ui": {
            "label": "Accepted By",
            "placeholder": "Select Accepted By",
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
          "name": "approver_certified_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved",
          "type": "select",
          "modelName": "approverApprovedModel",
          "ui": {
            "label": "Validated By",
            "placeholder": "Select Validated By",
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
          "name": "approver_approved_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        }
      ]
    },
    "field_array": {
      "title": "Materials Needed",
      "bindings": ["needed", ["quantity", "stocks"], "purchase"],
      "name": "meta_materials",
      "type": "array",
      "controlConfigs": {
        "needed": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Material Needed:",
            "placeholder": "Material Needed",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "quantity": {
          "type": "number",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Quantity:",
            "placeholder": "Quantity",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "stocks": {
          "type": "number",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Stocks Available:",
            "placeholder": "Stocks Available",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "purchase": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "To be purchased",
            "placeholder": "To be purchased",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        }
      },
      "minimumRepeatCount": 1,
    },
  },
  "3": {
    "meta": {
      "endpoint": "",
      "bindings": [
        "file_link",
        ["meta_job_order_no", "meta_job_order_date"],
        ["meta_related", "meta_college"],
        "meta_nature_of_complaints",
        "meta_nature_of_last_repair",
        "meta_findings",
        "meta_recommendations"
      ],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "file_link",
          "type": "text",
          "ui": {
            "label":"File Link",
            "placeholder":"File Link",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_job_order_no",
          "type": "text",
          "ui": {
            "label":"Job Order No:",
            "placeholder":"Job Order No",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_job_order_date",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Job Order Date:",
            "placeholder":"Job Order Date",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_related",
          "type": "select",
          "source": [{ "value": "Hardware", "text": "Hardware" },{ "value": "Software", "text": "Software" }],
          "ui": {
            "label":"Request Related:",
            "placeholder":"Choose Request Related",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"Office/College:",
            "placeholder":"Office/College",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_nature_of_complaints",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Nature of Complaints:",
            "placeholder":"Nature of Complaints",
            "description": "Write N/A if not applicable",
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
          "name": "meta_nature_of_last_repair",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Nature of Last Repair:",
            "placeholder":"Nature of Last Repair",
            "description": "Write N/A if not applicable",
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
          "name": "meta_findings",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Findings:",
            "placeholder":"Findings",
            "description": "Write N/A if not applicable",
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
          "name": "meta_recommendations",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Recommendations:",
            "placeholder":"Recommendations",
            "description": "Write N/A if not applicable",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": true
          }
        }
      ]
    },
    "signatories": {
      "models": [
        { "modelName": 'approverRequestedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Personnel', 'user': true
          }] },
        { "modelName": 'approverCertifiedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Director', 'director': true
          }] },
        { "modelName": 'approverApprovedModel', "model": ApproverModel, "arguments": [{
            name: 'End User'
          }] },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_approvestatus", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_approvestatus", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_approvestatus", "approver_approved_notify"]],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested",
          "type": "select",
          "modelName": "approverRequestedModel",
          "ui": {
            "label": "Diagnosed By",
            "placeholder": "Select Diagnosed By",
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_approvestatus",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified",
          "type": "select",
          "modelName": "approverCertifiedModel",
          "ui": {
            "label": "Validated By",
            "placeholder": "Select Validated By",
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
          "name": "approver_certified_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved",
          "type": "select",
          "modelName": "approverApprovedModel",
          "ui": {
            "label": "Noted By",
            "placeholder": "Select Noted By",
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
          "name": "approver_approved_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        }
      ]
    }
  },
  "5": {
    "meta": {
      "endpoint": "",
      "bindings": [
        "file_link", "meta_name",
        ["meta_college", "meta_campus", "meta_date_prepared"],
      ],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "file_link",
          "type": "text",
          "ui": {
            "label":"File Link",
            "placeholder":"File Link",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_name",
          "type": "text",
          "ui": {
            "label":"Name of the Information System(s):",
            "placeholder":"Name of the Information System(s)",
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
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"Office/College:",
            "placeholder":"Office/College",
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_campus",
          "type": "text",
          "ui": {
            "label":"Campus:",
            "placeholder":"Campus",
            "viewMode": {
              "advance": {
                "div": ["col-md-4","col-sm-4"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_date_prepared",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Date Prepared:",
            "placeholder":"Date Prepared",
            "viewMode": {
              "advance": {
                "div": ["col-md-4","col-sm-4"]
              }
            }
          },
          "validators": {
            "required": true
          }
        }
      ],
    },
    "signatories": {
      "models": [
        { "modelName": 'approverRequestedModel', "model": ApproverModel, "arguments": [{
            name: 'End User'
          }] },
        { "modelName": 'approverCertifiedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Director', 'director': true
          }] },
        { "modelName": 'approverApprovedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Personnel', 'user': true
          }] },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_approvestatus", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_approvestatus", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_approvestatus", "approver_approved_notify"]],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested",
          "type": "select",
          "modelName": "approverRequestedModel",
          "ui": {
            "label": "Requested By",
            "placeholder": "Select Repaired By",
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified",
          "type": "select",
          "modelName": "approverCertifiedModel",
          "ui": {
            "label": "Validated & Approved By",
            "placeholder": "Select Validated & Approved By",
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
          "name": "approver_certified_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved",
          "type": "select",
          "modelName": "approverApprovedModel",
          "ui": {
            "label": "Administered By",
            "placeholder": "Select Administered By",
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
          "name": "approver_approved_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_approvestatus",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        }
      ],
    },
    "field_array": {
      "title": "Name of Employees for Information System User Credentials Creation/Update",
      "bindings": [
        "employee_id",
        "name",
        "employment_status",
        "nature_of_request",
        "designation",
        "load_release",
        "rank",
        "degree_discipline",
        "others"
      ],
      "name": "meta_credentials",
      "type": "array",
      "controlConfigs": {
        "employee_id": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Employee ID:",
            "placeholder": "Employee ID",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "name": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Name:",
            "placeholder": "Name",
            "description":"(Title First Name M.I. Last Name) e.g. Engr. Juan P. Dela Cruz",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "employment_status": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Employment Status:",
            "placeholder": "Employment Status",
            "description":"(Part-time/Full-time/JO/COS)",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "nature_of_request": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Nature of Request:",
            "placeholder": "Nature of Request",
            "description":"New/Update Account",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "designation": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Designation:",
            "placeholder": "Designation",
            "description":"(If with Designation, otherwise write N/A) e.g. IT Program Head",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "load_release": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Load Release:",
            "placeholder": "Load Release",
            "description":"(If with Designation, otherwise write N/A) e.g. 9",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "rank": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Rank:",
            "placeholder": "Rank",
            "description":"e.g. Instructor I",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "degree_discipline": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Degree Discipline:",
            "placeholder": "Degree Discipline",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "others": {
          "type": "textarea",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label": "Others:",
            "placeholder": "Others",
            "description":"(Please Specify Others)",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
      },
      "minimumRepeatCount": 1,
    },
  },
  "6": {
    "meta": {
      "endpoint": "",
      "bindings": [
        "file_link",
        "meta_full_name",
        "meta_date_prepared",
        ["meta_position", "meta_college"],
        ["meta_email_date_created","meta_email_registered"]
      ],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "file_link",
          "type": "text",
          "ui": {
            "label":"File Link:",
            "placeholder":"File Link",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_full_name",
          "type": "text",
          "ui": {
            "label":"Full Name:",
            "placeholder":"Full Name",
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
          "name": "meta_date_prepared",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Date Prepared:",
            "placeholder":"Date Prepared",
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
          "name": "meta_position",
          "type": "text",
          "ui": {
            "label":"Position:",
            "placeholder":"Position",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"College/Department/Division:",
            "placeholder":"College/Department/Division",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_email_date_created",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Email Date Created:",
            "placeholder":"Email Date Created",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_email_registered",
          "type": "email",
          "ui": {
            "label":"Email Registered:",
            "placeholder":"Email Registered",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "email": true
          }
        }
      ]
    },
    "signatories": {
      "models": [
        { "modelName": 'approverRequestedModel', "model": ApproverModel, "arguments": [{
            name: 'End User'
          }] },
        { "modelName": 'approverCertifiedModel', "model": ApproverModel, "arguments": [{
            name: 'Head Office'
          }] },
        { "modelName": 'approverApprovedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Director', 'director': true
          }] },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_approvestatus", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_approvestatus", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_approvestatus", "approver_approved_notify"]],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested",
          "type": "select",
          "modelName": "approverRequestedModel",
          "ui": {
            "label": "Requested By",
            "placeholder": "Select Requested By",
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified",
          "type": "select",
          "modelName": "approverCertifiedModel",
          "ui": {
            "label": "Certified By",
            "placeholder": "Select Certified By",
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
          "name": "approver_certified_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved",
          "type": "select",
          "modelName": "approverApprovedModel",
          "ui": {
            "label": "Approved By",
            "placeholder": "Select Approved By",
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
          "name": "approver_approved_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_approvestatus",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        }
      ]
    }
  },
  "7": {
    "meta": {
      "endpoint": "",
      "bindings": [
        "file_link",
        ["meta_office", "meta_date_of_request"],
        "meta_brief_overview",
        "meta_purpose",
        "meta_significance"
      ],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "file_link",
          "type": "text",
          "ui": {
            "label":"File Link",
            "placeholder":"File Link",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_office",
          "type": "text",
          "ui": {
            "label":"Request College/Office:",
            "placeholder":"Request College/Office:",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_date_of_request",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Date of Request:",
            "placeholder":"Date of Request",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_brief_overview",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Brief Overview of the Request:",
            "placeholder":"Brief Overview of the Request",
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
          "name": "meta_purpose",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Purpose/Objectives of the Request:",
            "placeholder":"Purpose/Objectives of the Request",
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
          "name": "meta_significance",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Significance of the Request to USeP's stakeholders:",
            "placeholder":"Significance of the Request to USeP's stakeholders",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": true
          }
        }
      ]
    },
    "signatories": {
      "models": [
        { "modelName": 'approverRequestedModel', "model": ApproverModel, "arguments": [{
            name: 'End User'
          }] },
        { "modelName": 'approverCertifiedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Personnel', 'user': true
          }] },
        { "modelName": 'approverApprovedModel', "model": ApproverModel, "arguments": [{
            name: 'SDMD Director', 'director': true
          }] },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_approvestatus", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_approvestatus", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_approvestatus", "approver_approved_notify"]],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested",
          "type": "select",
          "modelName": "approverRequestedModel",
          "ui": {
            "label": "Requested By",
            "placeholder": "Select Requested By",
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_requested_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified",
          "type": "select",
          "modelName": "approverCertifiedModel",
          "ui": {
            "label": "Noted By",
            "placeholder": "Select Noted By",
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
          "name": "approver_certified_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_approvestatus",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_certified_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved",
          "type": "select",
          "modelName": "approverApprovedModel",
          "ui": {
            "label": "Approved By",
            "placeholder": "Select Approved By",
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
          "name": "approver_approved_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_approvestatus",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Approve" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_approved_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "hide": true,
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        }
      ]
    }
  }
}
export let fill_out = {
  "2": {
    "meta": {
      "models": [
        { "modelName": 'hideSoftware', "model": HideRelatedModel },
        { "modelName": 'hideHardware', "model": HideRelatedHardwareModel },
      ],
      "endpoint": "",
      "bindings": [
        ["meta_result", "meta_result_others"],
        "meta_result_remarks",
        [ "meta_repair_started_date", "meta_repair_started_time" ],
        [ "meta_repair_ended_date", "meta_repair_ended_time"]
      ],
      "fields": [
        {
          "name": "meta_result",
          "type": "select",
          "source": [
            { "value": "Repaired", "text": "Repaired" },
            { "value": "Pending", "text": "Pending" },
            { "value": "Others", "text": "Others" },
          ],
          "ui": {
            "label":"Repair Results:",
            "placeholder":"Choose Repair Results",
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
          "name": "meta_result_others",
          "type": "textarea",
          "ui": {
            "label":"Other Result: (Specify Other Result)",
            "placeholder":"Other Result",
            "description": "Leave blank if not result others",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": {
              "conditionalExpression":"x => x.meta_result == \"Others\""
            }
          }
        },
        {
          "name": "meta_result_remarks",
          "type": "textarea",
          "ui": {
            "label":"Result Remarks:",
            "placeholder":"Result Remarks",
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
          "name": "meta_repair_started_date",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Repair Started Date:",
            "placeholder":"Repair Started Date",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_repair_started_time",
          "type": "time",
          "ui": {
            "label":"Repair Started Time:",
            "placeholder":"Repair Started Time",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_repair_ended_date",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Repair Ended Date:",
            "placeholder":"Repair Ended Date",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_repair_ended_time",
          "type": "time",
          "ui": {
            "label":"Repair Ended Time:",
            "placeholder":"Repair Ended Time",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
      ],
    },
  },
  "6": {
    "meta": {
      "endpoint": "",
      "bindings": ["meta_email_date_created","meta_email_registered"],
      "fields": [
        {
          "name": "meta_email_date_created",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Email Date Created:",
            "placeholder":"Email Date Created",
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
          "name": "meta_email_registered",
          "type": "email",
          "ui": {
            "label":"Email Registered:",
            "placeholder":"Email Registered",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": true,
            "email": true
          }
        }
      ]
    },
  },
  "7": {
    "meta": {
      "models": [
        { "modelName": 'approverModel', "model": ApproverModel },
      ],
      "endpoint": "",
      "bindings": [
        "meta_nature_of_request",
        "meta_priority_level",
        "approver_vp", ["approver_vp_required", "approver_vp_notify"],
        "approver_president", ["approver_president_required", "approver_president_notify"],
      ],
      "fields": [
        {
          "name": "meta_nature_of_request",
          "type": "select",
          "source": [{ "value": "New IS", "text": "New IS" },{ "value": "Enhancement of Existing IS", "text": "Enhancement of Existing IS" }],
          "ui": {
            "label":"Nature of Request:",
            "placeholder":"Nature of Request",
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
          "name": "meta_priority_level",
          "type": "select",
          "source": [{ "value": "High", "text": "High" },{ "value": "Low", "text": "Low" }],
          "ui": {
            "label":"Priority Leave:",
            "placeholder":"Priority Level",
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
          "name": "approver_vp",
          "type": "select",
          "modelName": "approverModel",
          "ui": {
            "label": "Requested By",
            "placeholder": "Select Requested By",
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
          "name": "approver_vp_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_vp_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_president",
          "type": "select",
          "modelName": "approverModel",
          "ui": {
            "label": "Noted By",
            "placeholder": "Select Noted By",
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
          "name": "approver_president_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "approver_president_notify",
          "type": "checkbox",
          "value": 0,
          "source": [{ "value": 1, "text": "Notify" }],
          "ui": {
            "viewMode": {
              "advance": {
                "div": ["col-md-5","col-sm-5"]
              }
            }
          },
          "validators": {}
        },
      ]
    },
  }
}
export let field_view = {
  "1": {
    "meta": {
      "readonly": true,
      "models": [
        { "modelName": 'formTypeModel', "model": FormTypeModel }
      ],
      "endpoint": "",
      "bindings": ["meta_request_college", "meta_request_details"],
      "fields": [
        {
          "name": "meta_request_college",
          "type": "text",
          "ui": {
            "label":"Request College/Office:",
            "placeholder":"Request College/Office",
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
          "name": "meta_request_details",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 10,
              "cols": 50
            }
          },
          "ui": {
            "label":"Request Details:",
            "placeholder":"Request Details",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": true
          }
        }
      ]
    }
  },
  "2": {
    "meta": {
      "readonly": true,
      "models": [
        { "modelName": 'hideSoftware', "model": HideRelatedModel },
        { "modelName": 'hideHardware', "model": HideRelatedHardwareModel },
      ],
      "endpoint": "",
      "bindings": [
        ["meta_date_requested", "meta_date_needed"],
        ["meta_job_order_no", "meta_college"],
        ["meta_hardware", "meta_software"],
        "meta_others",
        ["meta_property_no", "meta_brand_model"],
        ["meta_findings", "meta_action_taken"],
        ["meta_result", "meta_result_others"],
        "meta_result_remarks",
        [ "meta_repair_started_date", "meta_repair_started_time" , "meta_repair_ended_date", "meta_repair_ended_time"]
      ],
      "fields": [
        {
          "name": "meta_date_requested",
          "type": "text",
          "ui": {
            "label":"Date Requested:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_date_needed",
          "type": "text",
          "ui": {
            "label":"Date Created:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_job_order_no",
          "type": "text",
          "ui": {
            "label":"Job Order No:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"College/Office:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_hardware",
          "type": "text",
          "ui": {
            "label":"Hardware Type:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_software",
          "type": "textarea",
          "ui": {
            "label":"Software:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_others",
          "type": "textarea",
          "ui": {
            "label":"Others:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_property_no",
          "type": "text",
          "ui": {
            "label":"Property No:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_brand_model",
          "type": "text",
          "ui": {
            "label":"Brand/Model:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_findings",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Remarks/Findings:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_action_taken",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Action Taken:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_result",
          "type": "text",
          "ui": {
            "label":"Repair Results:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_result_others",
          "type": "textarea",
          "ui": {
            "label":"Other Result:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_result_remarks",
          "type": "textarea",
          "ui": {
            "label":"Result Remarks:",
            "placeholder":"Result Remarks",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_repair_started_date",
          "type": "text",
          "ui": {
            "label":"Repair Started Date:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_repair_started_time",
          "type": "text",
          "ui": {
            "label":"Repair Started Time:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_repair_ended_date",
          "type": "text",
          "ui": {
            "label":"Repair Ended Date:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
        {
          "name": "meta_repair_ended_time",
          "type": "text",
          "ui": {
            "label":"Repair Ended Time:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {}
        },
      ],
    },
    "field_array": {
      "title": "Materials Needed",
      "bindings": ["needed", ["quantity", "stocks"], "purchase"],
      "name": "meta_materials",
      "type": "array",
      "controlConfigs": {
        "needed": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Material Needed:",
            "placeholder": "Material Needed",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "quantity": {
          "type": "number",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Quantity:",
            "placeholder": "Quantity",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "stocks": {
          "type": "number",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Stocks Available:",
            "placeholder": "Stocks Available",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "purchase": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "To be purchased",
            "placeholder": "To be purchased",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        }
      },
      "minimumRepeatCount": 1,
    },
  },
  "3": {
    "meta": {
      "readonly": true,
      "endpoint": "",
      "bindings": [
        ["meta_job_order_no", "meta_job_order_date"],
        ["meta_related", "meta_college"],
        "meta_nature_of_complaints",
        "meta_nature_of_last_repair",
        "meta_findings",
        "meta_recommendations"
      ],
      "fields": [
        {
          "name": "meta_job_order_no",
          "type": "text",
          "ui": {
            "label":"Job Order No:",
            "placeholder":"Job Order No",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_job_order_date",
          "type": "text",
          "ui": {
            "label":"Job Order Date:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_related",
          "type": "text",
          "ui": {
            "label":"Request Related:",
            "placeholder":"Choose Request Related",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"Office/College:",
            "placeholder":"Office/College",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_nature_of_complaints",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Nature of Complaints:",
            "placeholder":"Nature of Complaints",
            "description": "Write N/A if not applicable",
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
          "name": "meta_nature_of_last_repair",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Nature of Last Repair:",
            "placeholder":"Nature of Last Repair",
            "description": "Write N/A if not applicable",
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
          "name": "meta_findings",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Findings:",
            "placeholder":"Findings",
            "description": "Write N/A if not applicable",
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
          "name": "meta_recommendations",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Recommendations:",
            "placeholder":"Recommendations",
            "description": "Write N/A if not applicable",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": true
          }
        }
      ]
    }
  },
  "5": {
    "meta": {
      "readonly": true,
      "endpoint": "",
      "bindings": [
        "meta_name",
        ["meta_college", "meta_campus", "meta_date_prepared"],
      ],
      "fields": [
        {
          "name": "meta_name",
          "type": "text",
          "ui": {
            "label":"Name of the Information System(s):",
            "placeholder":"Name of the Information System(s)",
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
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"Office/College:",
            "placeholder":"Office/College",
            "viewMode": {
              "advance": {
                "div": ["col-md-3","col-sm-3"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_campus",
          "type": "text",
          "ui": {
            "label":"Campus:",
            "placeholder":"Campus",
            "viewMode": {
              "advance": {
                "div": ["col-md-4","col-sm-4"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_date_prepared",
          "type": "text",
          "ui": {
            "label":"Date Prepared:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-4","col-sm-4"]
              }
            }
          },
          "validators": {
            "required": true
          }
        }
      ],
    },
    "field_array": {
      "title": "Name of Employees for Information System User Credentials Creation/Update",
      "bindings": [
        "employee_id",
        "name",
        "employment_status",
        "nature_of_request",
        "designation",
        "load_release",
        "rank",
        "degree_discipline",
        "others"
      ],
      "name": "meta_credentials",
      "type": "array",
      "controlConfigs": {
        "employee_id": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Employee ID:",
            "placeholder": "Employee ID",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "name": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Name:",
            "placeholder": "Name",
            "description":"(Title First Name M.I. Last Name) e.g. Engr. Juan P. Dela Cruz",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "employment_status": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Employment Status:",
            "placeholder": "Employment Status",
            "description":"(Part-time/Full-time/JO/COS)",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "nature_of_request": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Nature of Request:",
            "placeholder": "Nature of Request",
            "description":"New/Update Account",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "designation": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Designation:",
            "placeholder": "Designation",
            "description":"(If with Designation, otherwise write N/A) e.g. IT Program Head",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "load_release": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Load Release:",
            "placeholder": "Load Release",
            "description":"(If with Designation, otherwise write N/A) e.g. 9",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "rank": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Rank:",
            "placeholder": "Rank",
            "description":"e.g. Instructor I",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "degree_discipline": {
          "type": "text",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "ui": {
            "label": "Degree Discipline:",
            "placeholder": "Degree Discipline",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
        "others": {
          "type": "textarea",
          "actionKeyNames": [],
          "validators": {
            "required": true
          },
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label": "Others:",
            "placeholder": "Others",
            "description":"(Please Specify Others)",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          }
        },
      },
      "minimumRepeatCount": 1,
    },
  },
  "6": {
    "meta": {
      "readonly": true,
      "endpoint": "",
      "bindings": [
        "meta_full_name",
        "meta_date_prepared",
        ["meta_position", "meta_college"],
        ["meta_email_date_created", "meta_email_registered"]
      ],
      "fields": [
        {
          "name": "meta_full_name",
          "type": "text",
          "ui": {
            "label":"Full Name:",
            "placeholder":"Full Name",
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
          "name": "meta_date_prepared",
          "type": "text",
          "ui": {
            "label":"Date Prepared:",
            "placeholder":"N/A",
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
          "name": "meta_position",
          "type": "text",
          "ui": {
            "label":"Position:",
            "placeholder":"Position",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"College/Department/Division:",
            "placeholder":"College/Department/Division",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_email_date_created",
          "type": "text",
          "ui": {
            "label":"Email Date Created:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_email_registered",
          "type": "email",
          "ui": {
            "label":"Email Registered:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true,
            "email": true
          }
        }
      ]
    }
  },
  "7": {
    "meta": {
      "readonly": true,
      "endpoint": "",
      "bindings": [
        ["meta_office", "meta_date_of_request"],
        "meta_brief_overview",
        "meta_purpose",
        "meta_significance",
        ["meta_nature_of_request", "meta_priority_level"]
      ],
      "fields": [
        {
          "name": "meta_office",
          "type": "text",
          "ui": {
            "label":"Request College/Office:",
            "placeholder":"Request College/Office:",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_date_of_request",
          "type": "text",
          "ui": {
            "label":"Date of Request:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_brief_overview",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Brief Overview of the Request:",
            "placeholder":"Brief Overview of the Request",
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
          "name": "meta_purpose",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Purpose/Objectives of the Request:",
            "placeholder":"Purpose/Objectives of the Request",
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
          "name": "meta_significance",
          "type": "textarea",
          "additionalConfig": {
            "prop": {
              "rows": 7,
              "cols": 50
            }
          },
          "ui": {
            "label":"Significance of the Request to USeP's stakeholders:",
            "placeholder":"Significance of the Request to USeP's stakeholders",
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
          "name": "meta_nature_of_request",
          "type": "text",
          "ui": {
            "label":"Nature of Request:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_priority_level",
          "type": "text",
          "ui": {
            "label":"Priority Leave:",
            "placeholder":"N/A",
            "viewMode": {
              "advance": {
                "div": ["col-md-6","col-sm-6"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
      ]
    }
  }
}

