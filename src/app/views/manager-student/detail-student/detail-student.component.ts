import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HocSinh} from "../../../core/model/hocSinh";

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.scss']}
)
export class DetailStudentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private studentService: StudentsService,
              private dialogRef: MatDialogRef<DetailStudentComponent>,) { }
hocSinh!:HocSinh;
  ngOnInit(): void {

    this.studentService.getStudentByid(this.data).subscribe(data=>{
      this.hocSinh=data;
    })
  }

}
