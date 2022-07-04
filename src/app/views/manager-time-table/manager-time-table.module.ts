import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerTimeTableRoutingModule } from './manager-time-table-routing.module';
import { UpdateTimeTableComponent } from './update-time-table/update-time-table.component';
import { CreateTimetableComponent } from './create-timetable/create-timetable.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    UpdateTimeTableComponent,
    CreateTimetableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatSnackBarModule,
    ManagerTimeTableRoutingModule
  ]
})
export class ManagerTimeTableModule { }
