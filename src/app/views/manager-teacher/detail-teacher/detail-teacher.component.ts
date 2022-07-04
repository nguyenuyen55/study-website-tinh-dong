import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {TeacherService} from "../../../core/services/pageManagerTeacher/teacher.service";
import {GiaoVien} from "../../../core/model/GiaoVien";

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.component.html',
  styleUrls: ['./detail-teacher.component.scss']
})
export class DetailTeacherComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private teacherService: TeacherService,
              private dialogRef: MatDialogRef<DetailTeacherComponent>,) { }
giaoVien!:GiaoVien;
  ngOnInit(): void {
    console.log(this.data)
    this.teacherService.getTeacherById(this.data).subscribe((data)=>{
        console.log(data)
        this.giaoVien=data;
    },error => console.log(error)
    )
  }

}
