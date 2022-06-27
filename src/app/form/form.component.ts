import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-form',
    styleUrls: ['./form.component.scss'],
    template: `
      <div class="container-scroller">
        <router-outlet></router-outlet>
      </div>`,
})
export class FormComponent implements OnInit  {
    ngOnInit() {

    }
}
