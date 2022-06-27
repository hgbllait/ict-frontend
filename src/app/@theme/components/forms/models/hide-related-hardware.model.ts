import { FormControlConfig } from '@rxweb/reactive-dynamic-forms';

export class HideRelatedHardwareModel extends FormControlConfig {

  private _hide: boolean;

  // @ts-ignore
  get hide() {
    // @ts-ignore
    if(this.controlsConfig.meta_request_related.value != null
    || this.controlsConfig.meta_request_related.value){
      if (this.controlsConfig.meta_request_related.value == 'Hardware') {
        return false;
      }
      this.value = null;
      return true;
    }
    if(this.controlsConfig.meta_request_related.formControl.value  == 'Hardware'){
      return false;
    }
    this.value = null;
    return true;
  }

  set hide(value: boolean) {
    this._hide = value;
  }
}
