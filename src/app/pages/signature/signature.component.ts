import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
@Component({
  selector: 'app-forms',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent {

  constructor(
    private titleService:Title) {
    this.titleService.setTitle("Signature | "+`${environment.APP_NAME}`);
  }
}
