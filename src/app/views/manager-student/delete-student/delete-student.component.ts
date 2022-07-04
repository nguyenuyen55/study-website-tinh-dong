import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WARN} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.scss']
})
export class DeleteStudentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private studentService: StudentsService,
              private snackbar:MatSnackBar,
              private dialogRef: MatDialogRef<DeleteStudentComponent>) { }

  mshs!: string;
  isDisplay: boolean = false;
  ngOnInit(): void {
    this.mshs=this.data;
  }
  deleteConfirm(){
    this.isDisplay=true;
    this.studentService.deleteById(this.mshs).subscribe(()=>{
      this.dialogRef.close();
      this.snackbar.open("Xoá học sinh thành công ","Ok",{duration:3000})
    },e=>{
      this.dialogRef.close();
        this.snackbar.open("Xoá thất bại ! Lỗi server bị chậm vui lòng thử lại, xin lỗi vì sự bất tiện này","OK",{
          duration:4000,
          panelClass: ['warning']
    })

  })

}
}
