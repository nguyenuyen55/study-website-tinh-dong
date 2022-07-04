import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TeacherService} from "../../../core/services/pageManagerTeacher/teacher.service";

@Component({
  selector: 'app-delete-teacher',
  templateUrl: './delete-teacher.component.html',
  styleUrls: ['./delete-teacher.component.scss']
})
export class DeleteTeacherComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private teacherService: TeacherService,
              private snackbar: MatSnackBar,
              private dialogRef: MatDialogRef<DeleteTeacherComponent>) {
  }

  idgv!: string;
  ten!: string;

  ngOnInit(): void {

    this.idgv = this.data
  }

  deleteConfirm() {
    this.teacherService.deleteById(this.idgv).subscribe(() => {
      this.dialogRef.close();
      this.snackbar.open("Xoá giáo viên thành công ", "Ok", {duration: 3000})
    }, e => {
      this.dialogRef.close();
      this.snackbar.open("Xoá thất bại ! Lỗi server bị chậm vui lòng thử lại, xin lỗi vì sự bất tiện này", "OK", {
        duration: 4000,
        panelClass: ['warning']
      })

    })

  }
}
