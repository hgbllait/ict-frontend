import {
  Component,
  Input,
  Injectable,
  Output,
  OnInit,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {RequestFormService} from "../../../@globals/services/api/request-form";
import {ActionItemSchema, FormActionSchema} from "../../../@globals/models";
import {DynamicFormBuildConfig, DynamicFormConfiguration, RxDynamicFormBuilder} from "@rxweb/reactive-dynamic-forms";
import {ErrorMessageBindingStrategy, ReactiveFormConfig, ResetFormType} from "@rxweb/reactive-form-validators";
import {BaseForm} from "../../../@globals/baseclasses/forms/base.form";
import {AuthenticationService} from "../../../@globals/services/api/auth";

@Component({
  selector: `ngx-theme-forms`,
  templateUrl: 'forms.component.html',
  styleUrls: ['forms.component.scss'],
})

@Injectable({
  providedIn: 'root',
})

export class FormsComponent extends BaseForm implements OnInit, OnChanges {
  @Input() form: any;
  @Input() data: any;
  @Input() readonly: boolean;

  @Output() dataChanges = new EventEmitter();
  @Output() actionExecuted = new EventEmitter<ActionItemSchema>();

  rxFormBuild: DynamicFormBuildConfig;
  rxFormConfig: DynamicFormConfiguration;
  formGroup: any;
  enable: boolean = false;
  submitted: boolean = false;
  loading: boolean;

  constructor(
    private data_service: RequestFormService,
    private formBuilder: RxDynamicFormBuilder,
    private authService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.isReadOnly();

    if(Object.keys(this.form).length === 0
        && this.form.constructor === Object){
      this.enable = false;
      return;
    }
    this.enable = true;
    this.rxFormConfig = {
      controlConfigModels: this.form.models,
    }
    this.rxFormBuild = this.formBuilder.formGroup(this.form.fields, this.rxFormConfig);
    this.formGroup = this.rxFormBuild.formGroup;
    this.resetForm();
    this.formGroup.patchValue(this.data);
    this.formGroup.valueChanges.subscribe(value => {
      this.data = value;
      Object.keys(this.data).forEach(key => {
        if (this.data[key] === null) {
          delete this.data[key];
        }

        /** Comment out by Glyde
        if(data[key] instanceof Array && this.data[key]){
          var merge_array = data[key].concat(this.data[key])
          data[key] = merge_array.filter((item, pos) => merge_array.indexOf(item) === pos)
        }
         */

      });
      this.dataChanges.emit({
        form: this.formGroup,
        value: 'success',
        data: this.data
      });
    });
  }

  isReadOnly() {
    if (this.form) {
      if(this.form.readonly){
        Object.keys(this.form.fields).map(prop => {
          if(this.form.fields[prop].hasOwnProperty('validators')){
            this.form.fields[prop].validators = {};
          }
          if(this.form.fields[prop].hasOwnProperty('ui')){
            this.form.fields[prop].ui.readonly = true;
          } else {
            this.form.fields[prop].ui = {};
            this.form.fields[prop].ui.readonly = true;
          }
        });
      }
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    ReactiveFormConfig.set({
      "baseConfig": {
        "dateFormat": "ymd",
        "seperator": "-"
      },
      reactiveForm: {
        errorMessageBindingStrategy: ErrorMessageBindingStrategy.OnTouchedOrSubmit
      },
      "validationMessage": {
        "alpha": "Only alphabets are allowed.",
        "alphaNumeric": "Only alphabet and numbers are allowed.",
        "compare":"Inputs are not matched.",
        "contains":"Value is not contains in the input",
        "digit":"Only digit are allowed",
        "email":"Email is not valid",
        "greaterThanEqualTo":"Pease enter greater than or equal to the joining age",
        "greaterThan":"Please enter greater than to the joining age",
        "hexColor":"Please enter hex code",
        "json":"Please enter valid json",
        "lessThanEqualTo":"Please enter less than or equal to the current experience",
        "lessThan":"Mlease enter less than or equal to the current experience",
        "lowerCase":"Only lowercase is allowed",
        "maxLength":"Maximum length is 10 digit",
        "maxNumber":"Enter value less than equal to 3",
        "minNumber":"Enter value greater than equal to 1",
        "minDate":"{{0}} exceeds the Minimum Date Limit",
        "maxDate":"Enter value greater than equal to 1",
        "password":"Please enter valid password",
        "pattern":"Please enter valid zipcode",
        "range":"Please enter age between 18 to 60",
        "required":"This field is required",
        "time":"Only time format is allowed",
        "upperCase":"Only uppercase is allowed",
        "url":"Only url format is allowed.",
        "zipCode":"Enter valid zip code",
        "minLength":"Minimum length is 10 digit"
      }
    });
  }

  actionMade( $event: FormActionSchema ) {
    this.rxFormBuild.formGroup.submitted = true;
    this.loading = true;
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.loading = false;
      return;
    }

    let value;
    if ($event.action_type === 'define') {
      let form_data = this.formGroup.value;

      if (this.formGroup.value !== undefined
        && this.formGroup.value.hasOwnProperty('id')) {
        form_data['id'] = this.formGroup.value.id;
        form_data = this.setFormData('updated_by', form_data);
      } else {
        form_data = this.setFormData('added_by', form_data);
      }

      Object.keys(form_data).forEach(key => {
        if (form_data[key] === null) {
          delete form_data[key];
        }
      });
      this.data_service.execute(
        {
          slug: $event.call,
          exception: {
            message: 'Ooopssss. Something went wrong! We will get back to you.',
            class: 'error',
            type: 'none',
          },
        },
        form_data
      ).subscribe(
          result => { // Success
            value = 'success';
            // Emit Action
            this.actionExecuted.emit({
              action: $event.target,
              value: 'success',
              data: result
            } );
          },
          error => { // Error
            error = error['error'];
            value = 'failed';
            // Emit Action
            this.actionExecuted.emit({
              action: $event.target,
              value: 'failed',
              data: error
            } );
          });

    } else {
      // Emit Action
      this.actionExecuted.emit({
        action: $event.target,
        value: '',
      } );
    }

  }

  resetForm(){
    this.formGroup.resetForm({resetType:ResetFormType.ControlsOnly});
  }

  setFormData(type, form_data){
    if( this.authService.currentUserValue
      && this.authService.currentUserValue.hasOwnProperty('user')) {
      form_data[type] = this.authService.currentUserValue.user.id;
    }
    return form_data;
  }

}
