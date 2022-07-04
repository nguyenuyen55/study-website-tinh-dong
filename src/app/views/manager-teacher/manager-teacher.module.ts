import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { DetailTeacherComponent } from './detail-teacher/detail-teacher.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteTeacherComponent } from './delete-teacher/delete-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';



@NgModule({
  declarations: [
    ListTeacherComponent,
    CreateTeacherComponent,
    DetailTeacherComponent,
    DeleteTeacherComponent,
    UpdateTeacherComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
      MatDialogModule,
    ]
})
export class ManagerTeacherModule { }
