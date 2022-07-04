import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerStudentRoutingModule } from './manager-student-routing.module';
import { ListStudentComponent } from './list-student/list-student.component';
import {NgxPaginationModule} from "ngx-pagination";
import { CreateStudentComponent } from './create-student/create-student.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';



@NgModule({
  declarations: [
    ListStudentComponent,
      CreateStudentComponent,
      DetailStudentComponent,
      UpdateStudentComponent,
      DeleteStudentComponent
  ],
  imports: [
    CommonModule,
    ManagerStudentRoutingModule,
    NgxPaginationModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class ManagerStudentModule { }
