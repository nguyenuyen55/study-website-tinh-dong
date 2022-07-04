import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeacherService} from "../../../core/services/pageManagerTeacher/teacher.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NewsService} from "../../../services/news/news.service";

@Component({
  selector: 'app-delete-new',
  templateUrl: './delete-new.component.html',
  styleUrls: ['./delete-new.component.scss']
})
export class DeleteNewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private newService: NewsService,
              private snackbar: MatSnackBar,
              private dialogRef: MatDialogRef<DeleteNewComponent>) {
  }

  id!: number;
  ten!: string;

  ngOnInit(): void {

    this.id = this.data
  }

  deleteConfirm() {
    this.newService.deleteById(this.id).subscribe(() => {
      this.dialogRef.close();
      this.snackbar.open("Xoá tin tức thành công ", "Ok", {duration: 3000})
    }, e => {
      this.dialogRef.close();
      console.log(e)
      this.snackbar.open("Xoá thất bại !", "OK", {
        duration: 4000,
        panelClass: ['warning']
      })

    })

  }

}
