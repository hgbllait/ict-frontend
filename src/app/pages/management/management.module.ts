import { NgModule } from '@angular/core';

import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ManagementComponent } from "./management.component";
import {ThemeModule} from "../../@theme/theme.module";
import {FormsComponent} from "./forms/forms.component";
import {UserAssignmentComponent} from "./user-assignment/user-assignment.component";
import {EquipmentsComponent} from "./equipments/equipments.component";

@NgModule({
  imports: [
    ThemeModule
  ],
    declarations: [
        UsersComponent,
        RolesComponent,
        PermissionsComponent,
        FormsComponent,
        EquipmentsComponent,
        ManagementComponent,
        UserAssignmentComponent,
    ],
})
export class ManagementModule {
}
