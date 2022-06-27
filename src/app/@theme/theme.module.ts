import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  CapitalizePipe,
  MomentPipe,
  MomentHumanizePipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
} from './pipes';
import {
  MainLayoutComponent,
} from './layouts';
import {RouterModule} from '@angular/router';
import {
  FooterComponent,
  HeaderComponent,
  FormsComponent,
  FormsActionComponent,
  SignaturePadComponent,
  FileUploadComponent,
  DataTableComponent,
  DataTableActionComponent
} from "./components";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {RxReactiveDynamicFormsModule} from "@rxweb/reactive-dynamic-forms";
import {DataTablesModule} from "angular-datatables";
import {DocumentEditorContainerAllModule} from '@syncfusion/ej2-angular-documenteditor';
import {MutiStepFormComponent} from "./components/muti-step-form/muti-step-form.component";
import {FormStepDirective} from "./directives/form-step.directive";
import {NestedFormComponent} from "./components/nested-form/nested-form.component";
import {HttpClientModule} from "@angular/common/http";

const CUSTOM_MODULES = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  DataTablesModule,
  RxReactiveFormsModule,
  RxReactiveDynamicFormsModule,
  DataTablesModule.forRoot(),
  DocumentEditorContainerAllModule
];

const COMPONENTS = [
  NestedFormComponent,
  MainLayoutComponent,
  FooterComponent,
  HeaderComponent,
  DataTableComponent,
  DataTableActionComponent,
  FormsComponent,
  FormsActionComponent,
  SignaturePadComponent,
  FileUploadComponent,
  MutiStepFormComponent,
  FormStepDirective
];

const PIPES = [
  CapitalizePipe,
  MomentPipe,
  MomentHumanizePipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
];

const SCHEMAS = [
  CUSTOM_ELEMENTS_SCHEMA,
];

@NgModule({
    imports: [
      HttpClientModule,
      CommonModule,
      ...CUSTOM_MODULES
    ],
    exports: [CommonModule, ...PIPES, ...COMPONENTS, CUSTOM_MODULES],
    declarations: [
      ...COMPONENTS,
      ...PIPES
    ],
    schemas: [...SCHEMAS],
})
export class ThemeModule {
}
