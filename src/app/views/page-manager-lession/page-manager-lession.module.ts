import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageManagerLessionRoutingModule } from './page-manager-lession-routing.module';
import { CreateLessiomComponent } from './create-lessiom/create-lessiom.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ListLessionComponent } from './list-lession/list-lession.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import { DetailLessionAdminComponent } from './detail-lession-admin/detail-lession-admin.component';
import { UpdateLessionComponent } from './update-lession/update-lession.component';
import { DeleteLessionComponent } from './delete-lession/delete-lession.component';


@NgModule({
  declarations: [
    CreateLessiomComponent,
    ListLessionComponent,
    DetailLessionAdminComponent,
    UpdateLessionComponent,
    DeleteLessionComponent
  ],
    imports: [
        CommonModule,
        PageManagerLessionRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
      MatDialogModule,
    ]
})
export class PageManagerLessionModule { }
