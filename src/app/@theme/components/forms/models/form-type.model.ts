import {FormControlConfig} from "@rxweb/reactive-dynamic-forms"
import {BaseModel} from "./base.model";
export class FormTypeModel extends BaseModel {
  constructor(fieldConfig: { [key: string]: any },
              public controlsConfig: { [key: string]: FormControlConfig },
              notificationId:number,
              private argument: any){
    super(fieldConfig,controlsConfig,notificationId);
    if (this.dataService) {
      if(this.argument){
        console.log(this.argument);
      }
      this.dataService.call(
        'v1.definitions.forms.fetch-type',
        {}
      )
        .subscribe((response: any) => {
          let source = [];
          let type = response.data.form_type;
          for (var key in type) {
            let value = type[key]['id'];
            let text = type[key]['form_no'] + ' ' + type[key]['name'];
            if(value === undefined) continue;
            if(this.argument){
              if(!this.argument.hasOwnProperty(type[key]['id'])) continue;
            }
            source.push({value: value, text: text  });
          }
          this.source = source;

        }, error => {
          console.log(error);
        });
    }
  }

}
