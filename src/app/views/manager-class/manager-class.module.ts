import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClassComponent } from './list-class/list-class.component';
import {BrowserModule} from "@angular/platform-browser";
import {PagemarkRoutingModule} from "../pagemark/pagemark-routing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import { CreateClassComponent } from './create-class/create-class.component';



@NgModule({
  declarations: [
    ListClassComponent,
    CreateClassComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule
  ]
})
export class ManagerClassModule { }
