import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesHelper {
  access(obj,string){
    let parts = string.split('.');
    let newObj = obj[parts[0]];
    if(parts[1]){
      parts.splice(0,1);
      let newString = parts.join('.');
      return this.access(newObj,newString);
    }
    return newObj;
  }
}
