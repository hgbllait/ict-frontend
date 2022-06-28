import {FormControlConfig} from "@rxweb/reactive-dynamic-forms"
import {RequestFormService} from "../../../../@globals/services/api/request-form";
import {HttpClient} from "@angular/common/http";
import {VariablesHelper} from "../../../../@globals/helpers/objects/variables.helper";
import {ErrorMessageUtilityService} from "../../../../@globals/services/utility/errors/error.message.utility.service";
import {SpinnerService} from "../../../../@globals/helpers/ui/loader/loader.helper";
import {InjectorInstance} from "../../../../app.module";
export class BaseModel extends FormControlConfig {
  dataService: any;
  constructor(fieldConfig: { [key: string]: any },
              public controlsConfig: { [key: string]: FormControlConfig },
              notificationId:number){
    super(fieldConfig,controlsConfig,notificationId);
    const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
    this.dataService = new RequestFormService( httpClient, new VariablesHelper(), new ErrorMessageUtilityService (), new SpinnerService());
  }

}
