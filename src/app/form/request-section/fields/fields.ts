import {ApproverModel} from "../../../@theme/components/forms/models/approver.model";
import {FormTypeModel} from "../../../@theme/components/forms/models/form-type.model";
import * as moment from 'moment';
export let field = {
  "1": {
    "meta": {
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
    },
    "signatories": {
      "models": [
        { "modelName": 'approverModel', "model": ApproverModel },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_notify"]],
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
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
          "modelName": "approverModel",
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
          "modelName": "approverModel",
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
        { "modelName": 'approverModel', "model": ApproverModel },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_notify"]],
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
          "modelName": "approverModel",
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
          "modelName": "approverModel",
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
          "modelName": "approverModel",
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
        "meta_full_name",
        "meta_date_prepared",
        ["meta_position", "meta_college"]
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
        }
      ]
    },
    "signatories": {
      "models": [
        { "modelName": 'approverModel', "model": ApproverModel },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_notify"]],
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
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
          "modelName": "approverModel",
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
          "modelName": "approverModel",
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
        ["meta_office", "meta_date_of_request"],
        "meta_brief_overview",
        "meta_purpose",
        "meta_significance"
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
        { "modelName": 'approverModel', "model": ApproverModel },
      ],
      "endpoint": "",
      "bindings": ["approver_requested", ["approver_requested_required", "approver_requested_notify"],
        "approver_certified", ["approver_certified_required", "approver_certified_notify"],
        "approver_approved", ["approver_approved_required", "approver_approved_notify"]],
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
          "name": "approver_requested_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
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
          "name": "approver_certified_required",
          "type": "checkbox",
          "value": 1,
          "source": [{ "value": 1, "text": "Required" }],
          "ui": {
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
          "modelName": "approverModel",
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
