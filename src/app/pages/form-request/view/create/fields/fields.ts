import {HideRelatedModel} from "../../../../../@theme/components/forms/models/hide-related.model";
import {HideRelatedHardwareModel} from "../../../../../@theme/components/forms/models/hide-related-hardware.model";
import * as moment from "moment";
export let field = {
  "2": {
    "meta": {
      "models": [
        { "modelName": 'hideSoftware', "model": HideRelatedModel },
        { "modelName": 'hideHardware', "model": HideRelatedHardwareModel },
      ],
      "endpoint": "",
      "bindings": [
        ["meta_date_requested", "meta_priority_level"],
        ["meta_college", "meta_date_created", "meta_schedule_of_visit"],
        "meta_request_related",
        "meta_hardware_type",
        "meta_hardware_type_others",
        "meta_software",
        ["meta_property_no", "meta_brand_model"],
        "meta_findings",
        "meta_action_taken",
        ["meta_result_repaired", "meta_result_repair_others"],
        [ "meta_repair_started_date", "meta_repair_started_time" , "meta_repair_ended_date", "meta_repair_ended_time"]
      ],
      "fields": [
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
          "name": "meta_priority_level",
          "type": "select",
          "source": [{ "value": "High", "text": "High" },{ "value": "Low", "text": "Low" }],
          "ui": {
            "label":"Priority Leave:",
            "placeholder":"Priority Level",
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
                "div": ["col-md-4","col-sm-4"]
              }
            }
          },
          "validators": {
            "required": true
          }
        },
        {
          "name": "meta_date_created",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Date Created:",
            "placeholder":"Date Created",
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
          "name": "meta_schedule_of_visit",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Schedule of Visit:",
            "placeholder":"Schedule of Visit",
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
          "name": "meta_request_related",
          "type": "select",
          "source": [{ "value": "Hardware", "text": "Hardware" },{ "value": "Software", "text": "Software" }],
          "ui": {
            "label":"Request Related:",
            "placeholder":"Request Related",
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
          "name": "meta_hardware_type",
          "type": "select",
          "modelName": "hideHardware",
          "source": [
            { "value": "System Unit", "text": "System Unit" },
            { "value": "Monitor", "text": "Monitor" },
            { "value": "Printer/Scanner", "text": "Printer/Scanner" },
            { "value": "Laptop", "text": "Laptop" },
            { "value": "Projector", "text": "Projector" },
            { "value": "Switch/Routers", "text": "Switch/Routers" },
            { "value": "CCTV", "text": "CCTV" },
            { "value": "SIP PHONE", "text": "SIP PHONE" },
            { "value": "Network/Cabling", "text": "Network/Cabling" },
            { "value": "Others", "text": "Others" }
            ],
          "ui": {
            "hide": true,
            "label":"Hardware Type:",
            "placeholder":"Choose Hardware Type",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": {
              "conditionalExpression":"x => x.meta_request_related == \"Hardware\""
            }
          }
        },
        {
          "name": "meta_hardware_type_others",
          "type": "textarea",
          "modelName": "hideHardware",
          "ui": {
            "hide": true,
            "label":"Others: (Specify Hardware Type)",
            "placeholder":"Others",
            "description": "Leave blank if not hardware type others",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": {
              "conditionalExpression":"x => x.meta_hardware_type == \"Others\""
            }
          }
        },
        {
          "name": "meta_software",
          "type": "textarea",
          "modelName": "hideSoftware",
          "ui": {
            "hide": true,
            "label":"Software Type:",
            "placeholder":"Software Type",
            "description":"Please Specify",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": {
              "conditionalExpression":"x => x.meta_request_related == \"Software\""
            }
          }
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
          "name": "meta_result_repaired",
          "type": "select",
          "source": [
            { "value": "Repaired", "text": "Repaired" },
            { "value": "Pending Repair upon Purchase of required material", "text": "Pending Repair upon Purchase of required material" },
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
          "name": "meta_result_repair_others",
          "type": "textarea",
          "ui": {
            "label":"Other Remarks: (Specify Repair Result)",
            "placeholder":"Other Remarks",
            "description": "Leave blank if not repair result others",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {
            "required": {
              "conditionalExpression":"x => x.meta_result_repaired == \"Others\""
            }
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
      "endpoint": "",
      "bindings": ["approver_requested_full_name", ["approver_requested_required", "approver_requested_approvestatus", "approver_requested_notify"],
        "approver_certified_full_name", ["approver_certified_required", "approver_certified_approvestatus", "approver_certified_notify"],
        "approver_approved_full_name", ["approver_approved_required", "approver_approved_approvestatus", "approver_approved_notify"]],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested_full_name",
          "type": "text",
          "ui": {
            "disabled": true,
            "label": "Repaired By",
            "placeholder": "",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
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
                "div": ["col-md-2","col-sm-2"]
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
                "div": ["col-md-2","col-sm-2"]
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
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_certified_full_name",
          "type": "text",
          "ui": {
            "disabled": true,
            "label": "Accepted By",
            "placeholder": "",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
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
                "div": ["col-md-2","col-sm-2"]
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
                "div": ["col-md-2","col-sm-2"]
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
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_approved_full_name",
          "type": "text",
          "ui": {
            "disabled": true,
            "label": "Validated By",
            "placeholder": "",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
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
                "div": ["col-md-2","col-sm-2"]
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
                "div": ["col-md-2","col-sm-2"]
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
        ["meta_job_order_date", "meta_related", "meta_college"],
        "meta_nature_of_complaints",
        "meta_nature_of_last_repair",
        "meta_findings",
        "meta_recommendations"
      ],
      "fields": [
        {
          "name": "meta_job_order_date",
          "type": "date",
          "value": moment().format('YYYY-MM-DD'),
          "ui": {
            "label":"Job Order Date:",
            "placeholder":"Job Order Date",
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
          "name": "meta_related",
          "type": "select",
          "source": [{ "value": "Hardware", "text": "Hardware" },{ "value": "Software", "text": "Software" }],
          "ui": {
            "label":"Request Related:",
            "placeholder":"Choose Request Related",
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
          "name": "meta_college",
          "type": "text",
          "ui": {
            "label":"Office/College:",
            "placeholder":"Office/College",
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
      "endpoint": "",
      "bindings": ["approver_requested_full_name", ["approver_requested_required", "approver_requested_approvestatus", "approver_requested_notify"],
        "approver_certified_full_name", ["approver_certified_required", "approver_certified_approvestatus", "approver_certified_notify"],
        "approver_approved_full_name", ["approver_approved_required", "approver_approved_approvestatus", "approver_approved_notify"]],
      "fields": [
        {
          "name": "id",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested",
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_requested_full_name",
          "type": "text",
          "ui": {
            "disabled": true,
            "label": "Diagnosed By",
            "placeholder": "",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
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
                "div": ["col-md-2","col-sm-2"]
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
                "div": ["col-md-2","col-sm-2"]
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
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_certified_full_name",
          "type": "text",
          "ui": {
            "disabled": true,
            "label": "Validated By",
            "placeholder": "",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
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
                "div": ["col-md-2","col-sm-2"]
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
                "div": ["col-md-2","col-sm-2"]
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
          "type": "hidden",
          "validators": {},
          "ui": {}
        },
        {
          "name": "approver_approved_full_name",
          "type": "text",
          "ui": {
            "disabled": true,
            "label": "Noted By",
            "placeholder": "",
            "viewMode": {
              "advance": {
                "div": ["col-md-12","col-sm-12"]
              }
            }
          },
          "validators": {}
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
                "div": ["col-md-2","col-sm-2"]
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
                "div": ["col-md-2","col-sm-2"]
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
