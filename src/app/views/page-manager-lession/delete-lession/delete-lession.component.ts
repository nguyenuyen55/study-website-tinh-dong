import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeacherService} from "../../../core/services/pageManagerTeacher/teacher.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LessionService} from "../../../services/lession/lession.service";

@Component({
  selector: 'app-delete-lession',
  templateUrl: './delete-lession.component.html',
  styleUrls: ['./delete-lession.component.scss']
})
export class DeleteLessionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private lessionService: LessionService,
              private snackbar: MatSnackBar,
              private dialogRef: MatDialogRef<DeleteLessionComponent>) { }

  id!: string;
  ten!: string;

  ngOnInit(): void {

    this.id = this.data
  }
  deleteConfirm() {
    this.lessionService.deleteLession(this.id).subscribe(() => {
      this.dialogRef.close();
      this.snackbar.open("Xoá bài giảng thành công ", "Ok", {duration: 3000})
    }, e => {
      this.dialogRef.close();
      this.snackbar.open("Xoá thất bại ! Lỗi server bị chậm vui lòng thử lại, xin lỗi vì sự bất tiện này", "OK", {
        duration: 4000,
        panelClass: ['warning']
      })

    })

  }
}
