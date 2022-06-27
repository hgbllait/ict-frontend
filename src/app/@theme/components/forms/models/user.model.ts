import {FormControlConfig} from "@rxweb/reactive-dynamic-forms"
import {BaseModel} from "./base.model";
export class UserModel extends BaseModel {
  constructor(fieldConfig: { [key: string]: any },
              public controlsConfig: { [key: string]: FormControlConfig },
              notificationId:number,
              private argument: any){
    super(fieldConfig,controlsConfig,notificationId);
    if (this.dataService) {
      const source = [];
      this.dataService.call(
        'v1.users.all',
        {}
      )
        .subscribe( response => {
          const user = response.data.user;
          for (var key in user) {
            let value = user[key]['id'];
            let text = user[key]['employee']['full_name'];
            if(value === undefined) continue;
            if(this.argument){
              if(this.argument.hasOwnProperty('name')){
                if(this.argument.name != user[key]['type']) continue;
              }
            }
            source.push({value: value, text: text  });
          }
          this.source = source;

          if(this.formControl.value){
            this.formControl.setValue(this.formControl.value);
          }

        }, error => {
          console.log(error);
        });
    }
  }

}
