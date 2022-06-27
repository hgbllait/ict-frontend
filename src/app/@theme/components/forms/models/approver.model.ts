import {FormControlConfig} from "@rxweb/reactive-dynamic-forms"
import {BaseModel} from "./base.model";
export class ApproverModel extends BaseModel {
  constructor(fieldConfig: { [key: string]: any },
              public controlsConfig: { [key: string]: FormControlConfig },
              notificationId:number,
              private argument: any){
    super(fieldConfig,controlsConfig,notificationId);
    if (this.dataService) {
      const source = [];
      this.dataService.execute(
        {
          slug: 'v1.flow_control.definitions.approvers.all',
          exception: {
            message: 'Ooopssss. Something went wrong! We will get back to you.',
            class: 'error',
            type: 'none',
          },
        },
        {
          __response: {
            200: 'Successfully retrieved approvers.',
          },
        },
      )
        .subscribe( response => {
          const approver = response.data.approver;
          let user = null;
          for (var key in approver) {
            let value = approver[key]['id'];
            let text = approver[key]['name'];
            if(value === undefined) continue;
            if(this.argument){
              if(this.argument.hasOwnProperty('name')){
                var str = approver[key]['type'];
                var split_str = str.split(", ");
                if (split_str.indexOf(this.argument.name ) !== -1) {
                  // Check if in array
                } else {
                  continue;
                }
              }
            }
            if(approver[key]['is_user']) user = approver[key];
            source.push({value: value, text: text  });
          }
          this.source = source;

          if(this.formControl.value){
            this.formControl.setValue(this.formControl.value);
            return;
          }

          if(this.argument){
            if(this.argument.hasOwnProperty('director')
              && this.argument.director){
              this.formControl.setValue(this.source[0].value);
            }
          }

          if(this.argument){
            if(this.argument.hasOwnProperty('user')
              && this.argument.user){
              if(user !== null){
                this.formControl.setValue(user['id']);
              }
            }
          }

        }, error => {
          console.log(error);
        });
    }
  }

}
