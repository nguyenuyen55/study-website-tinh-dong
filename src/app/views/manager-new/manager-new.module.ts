import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerNewRoutingModule } from './manager-new-routing.module';
import { ListNewComponent } from './list-new/list-new.component';
import {NgxPaginationModule} from "ngx-pagination";
import { DetailNewComponent } from './detail-new/detail-new.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteNewComponent } from './delete-new/delete-new.component';
import { CreateNewComponent } from './create-new/create-new.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateNewComponent } from './update-new/update-new.component';


@NgModule({
  declarations: [
    ListNewComponent,
    DetailNewComponent,
    DeleteNewComponent,
    CreateNewComponent,
    UpdateNewComponent
  ],
  imports: [
    CommonModule,
    ManagerNewRoutingModule,
    NgxPaginationModule, MatDialogModule, ReactiveFormsModule,
  ]
})
export class ManagerNewModule { }
