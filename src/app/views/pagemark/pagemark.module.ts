import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagemarkRoutingModule } from './pagemark-routing.module';
import { DetailmarkComponent } from './detailmark/detailmark.component';
import {BrowserModule} from "@angular/platform-browser";
import { UpdateMarkStudentComponent } from './update-mark-student/update-mark-student.component';
import { UpdateDetailStudentComponent } from './update-detail-student/update-detail-student.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ListClassMarkComponent } from './list-class-mark/list-class-mark.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    DetailmarkComponent,
    UpdateMarkStudentComponent,
    UpdateDetailStudentComponent,
    ListClassMarkComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PagemarkRoutingModule,
    MatSnackBarModule, BrowserAnimationsModule, MatFormFieldModule,
    MatDialogModule
  ]
})
export class PagemarkModule { }
