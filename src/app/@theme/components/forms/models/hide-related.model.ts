import {FormControlConfig, Hooks} from '@rxweb/reactive-dynamic-forms';

export class HideRelatedModel extends FormControlConfig {
  private _hide: boolean;

  // @ts-ignore
  get hide() {
    // @ts-ignore
    if(this.controlsConfig.meta_request_related.value != null
    || this.controlsConfig.meta_request_related.value){
      if (this.controlsConfig.meta_request_related.value == 'Software') {
        return false;
      }
      this.value = null;
      return true;
    }
    if(this.controlsConfig.meta_request_related.formControl.value  == 'Software'){
      return false;
    }
    this.value = null;
    return true;

  }

  set hide(value: boolean) {
    this._hide = value;
  }
}
