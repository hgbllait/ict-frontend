import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form.component';
import { LinkComponent } from "./link/link.component";
import {RequestSectionComponent} from "./request-section/request-section.component";

export const routes: Routes = [
    {
        path: '',
        component: FormComponent,
        children: [
            {
                path: ':link',
                component: LinkComponent,
            },
            {
              path: 'request/section',
              component: RequestSectionComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormRoutingModule {
}
