import {BaseModel} from "./base.model";
export class HideFormTypeModel extends BaseModel {
  private _hide: boolean;

  // @ts-ignore
  get hide() {
    // @ts-ignore
    if(this.controlsConfig.form_type.formControl.value
      && this.controlsConfig.form_type.value){
      if(this.controlsConfig.form_type.formControl.value
        != this.controlsConfig.form_type.value){
        if(this.controlsConfig.form_type.formControl.value  == 'paper'){
          return false;
        }
        this.controlsConfig.form_type.value = this.controlsConfig.form_type.formControl.value;
        this.value = null;
        return true;
      }
    }
    if(this.controlsConfig.form_type.value){
      if (this.controlsConfig.form_type.value == 'paper') {
        return false;
      }
      this.value = null;
      return true;
    }
    if(this.controlsConfig.form_type.formControl.value  == 'paper'){
      return false;
    }
    this.controlsConfig.form_type.value = this.controlsConfig.form_type.formControl.value;
    this.value = null;
    return true;

  }

  set hide(value: boolean) {
    this._hide = value;
  }


}
