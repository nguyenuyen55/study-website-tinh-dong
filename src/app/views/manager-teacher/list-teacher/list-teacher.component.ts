import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {TeacherService} from "../../../core/services/pageManagerTeacher/teacher.service";
import {GiaoVien} from "../../../core/model/GiaoVien";
import {PhongBan} from "../../../core/model/PhongBan";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {CreateTeacherComponent} from "../create-teacher/create-teacher.component";
import {DetailTeacherComponent} from "../detail-teacher/detail-teacher.component";
import {DeleteTeacherComponent} from "../delete-teacher/delete-teacher.component";
import {UpdateTeacherComponent} from "../update-teacher/update-teacher.component";

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent implements OnInit {
  p: number | any;
  checkPagination = true;
  constructor(private studentService: StudentsService,
              private teacherService: TeacherService,
              private snackbar: MatSnackBar,
              private matDialog: MatDialog) {
  }

  listgv: GiaoVien[] = [];
  listphongbans: PhongBan[] = [];


  ngOnInit(): void {
    this.teacherService.getAllPhongBan().subscribe((data) => {
      this.listphongbans = data;
    })
    this.studentService.getListGV().subscribe(data => {

      if (data.length < 3) {
        this.checkPagination = false;
      }
      this.p = 1;
      this.listgv = data
    })
  }
  openDialogDetail(id: string) {
    const dialogRef = this.matDialog.open(DetailTeacherComponent, {
      width: '1000px',
      height: '480px',
      data: id
    });

  }
  searchTeacher(name: string) {
// @ts-ignore
    let phong = document.getElementById("phong").value;
    if (phong == 'null' && name != null) {
      this.teacherService.searchByName(name).subscribe(
        data => {
          this.listgv = data
          if (data.length < 5) {
            this.checkPagination = false;
          }
          this.p = 1;
        }
      )
    }
    if (phong != 'null' && name == null) {
      this.checkPagination = true;
      this.teacherService.searchByPhongBan(phong).subscribe(
        data => {
          this.listgv = data
          if (data.length < 5) {
            this.checkPagination = false;
          }
          this.p = 1;
        }
      )
    }
    if (phong != 'null' && name != null) {
      this.checkPagination = true;
      this.teacherService.searchByNameAndPhongBan(phong, name).subscribe(
        data => {
          this.listgv = data
          if (data.length < 5) {
            this.checkPagination = false;
          }
          this.p = 1;
        }
      )
    }
  }

  openDialogCreate() {
    const dialogRef = this.matDialog.open(CreateTeacherComponent, {
      width: '1000px',
      height: '700px',
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.ngOnInit()
      //     .then(() => {
            window.location.reload();
          // });
    })
  }

  openDialogDelete(id: string) {
    const dialogRef = this.matDialog.open(DeleteTeacherComponent, {
      width: '500px',
      height: '200px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    })
  }
  openDialogUpdate(id: string) {
    const dialogRef = this.matDialog.open(UpdateTeacherComponent, {
      width: '1000px',
      height: '700px',
      data: id
    }
    );
    dialogRef.afterClosed().subscribe(() => {
  this.ngOnInit()
    })
  }
}
