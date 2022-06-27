import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {RxDynamicFormBuilder, AbstractControlConfig } from "@rxweb/reactive-dynamic-forms";
import {RxFormGroup} from "@rxweb/reactive-form-validators";
declare var $: any;
@Component({
  selector: 'theme-nested-form',
  templateUrl: './nested-form.component.html',
})

export class NestedFormComponent extends AbstractControlConfig implements OnInit {
  @Input() form: any;
  @Input() data: any;
  @Input() readonly: boolean;

  @Output() dataChanges = new EventEmitter();

  enable: boolean = false;
  formGroup: any;
  temp: any = [];

  constructor(private formBuilder: RxDynamicFormBuilder) {
    super();
  }

  ngOnInit() {
    if(Object.keys(this.form).length === 0
      && this.form.constructor === Object){
      this.enable = false;
      return;
    }
    this.enable = true;
    if(Object.keys(this.data).length === 0
      && Object.getPrototypeOf(this.data) === Object.prototype){
      this.data[this.form.name] = [];
    } else {
      let result = [];
      for(var key in this.data[this.form.name]){
        result[key] = {};
        result[key]['fields'] = [];
        for(var key_ in this.data[this.form.name][key]){
          result[key]['fields'].push({'name': key_, 'value': this.data[this.form.name][key][key_]});

        }

      }
      this.form['rows'] = result;

    }

    this.dynamicFormBuildConfig = this.formBuilder.formGroup([this.form], {});
    // @ts-ignore
    this.controlConfig = this.dynamicFormBuildConfig;
    // @ts-ignore
    this.formGroup = this.dynamicFormBuildConfig.formGroup.controls[this.form.name].controls[0];
    this.formGroup.valueChanges.subscribe(value => {
      this.data[this.form.name][0] = value;
      Object.keys(value).forEach(key => {
        if (value[key] === null) {
          delete this.data[this.form.name][0][key];
        }
      });
      this.dataChanges.emit({
        form: this.formGroup,
        value: 'success',
        data: this.data
      });
    });
  }

  ngAfterContentChecked(){
    if(this.dynamicFormBuildConfig){
      // @ts-ignore
      let dynamicFormBuild = this.dynamicFormBuildConfig.formGroup.controls[this.form.name].controls;
      if(dynamicFormBuild.length > 0){
        this.data[this.form.name] = [];
        for( var key in dynamicFormBuild ){
          var rxFormGroup: RxFormGroup = dynamicFormBuild[key];
          if(rxFormGroup.constructor.name === "RxFormGroup"){
            if(rxFormGroup.value != undefined
              && Object.keys(rxFormGroup.value).length > 0
              && Object.getPrototypeOf(rxFormGroup.value) === Object.prototype){
              this.data[this.form.name][key] = rxFormGroup.value;
              for( var key_ in rxFormGroup.value ){
                if (rxFormGroup.value[key_] === null) {
                  delete this.data[this.form.name][key][key_];
                } else {
                  this.data[this.form.name][key][key_] = rxFormGroup.value[key_];
                }
              }
            }
          }

        }
        this.dataChanges.emit({
          form: this.formGroup,
          value: 'success',
          data: this.data
        });
      }
    }
  };

  _addItem(index) {
    this.dynamicFormBuildConfig.controlsConfig[this.form.name]["addItem"]();
  }

  removeItem(index) {
    // @ts-ignore
    if(this.dynamicFormBuildConfig.controlsConfig[this.form.name].length === 1){
      return $( ".remove-form" ).effect( "shake", { times: 3, distance: 3}, 1000 );
    }
    this.dynamicFormBuildConfig.controlsConfig[this.form.name]["removeItem"](index);
  }

}
