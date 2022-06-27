import { Component } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-main-layout>
      <router-outlet></router-outlet>
    </ngx-main-layout>
  `,
})
export class PagesComponent {
}
