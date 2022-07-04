import {Component, OnInit} from '@angular/core';
import {TabletimeService} from "../../core/services/tableTime/tabletime.service";
import {AuthService} from "../../core/services/pagelogin/auth.service";
import {StudentsService} from "../../core/services/pageManagerStudent/students.service";
import {StudentDTO} from "../../core/dto/StudentDTO";
import {LopHocSinhReponse} from "../../core/dto/LopHocSinhReponse";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-student-teacher',
  templateUrl: './list-student-teacher.component.html',
  styleUrls: ['./list-student-teacher.component.scss']
})
export class ListStudentTeacherComponent implements OnInit {
  checkPagination = true;
  p: number | any;

  constructor(private tableTime: TabletimeService,
              private auth: AuthService,
              private studentService: StudentsService,
              private snackbar: MatSnackBar) {

  }

  lopHocSinhReponse!: LopHocSinhReponse | null;
  listStudent: StudentDTO[] = [];

  ngOnInit(): void {
    this.tableTime.getidlopByIdTeacher(this.auth.getUser()!.toUpperCase()).subscribe((data) => {
      this.studentService.getListHocSinhbyidlop(data).subscribe(value => {
        this.lopHocSinhReponse = value
        if (value.hocSinhs.length < 5) {
          this.checkPagination = false;
        }
        this.p = 1;
      })
    });
  }

  exportPDF() {
    document.location.href = 'http://localhost:8080/api/exportPdf/'+this.auth.getUser()?.toUpperCase();
  }

}
