import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {NamHoc} from "../../../core/model/NamHoc";
import {Khoi} from "../../../core/model/Khoi";
import {ScheduleService} from "../../../services/schedule/schedule.service";
import {Lop} from "../../../core/model/Lop";
import {LopHocSinhReponse} from "../../../core/dto/LopHocSinhReponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateStudentComponent} from "../create-student/create-student.component";
import {MatDialog} from "@angular/material/dialog";
import {DetailStudentComponent} from "../detail-student/detail-student.component";
import {DeleteStudentComponent} from "../delete-student/delete-student.component";
import {UpdateStudentComponent} from "../update-student/update-student.component";
import {GiaoVien} from "../../../core/model/GiaoVien";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  p: number | any;
  idlopmove: any;

  constructor(private studentService: StudentsService,
              private schedule: ScheduleService,
              private snackbar: MatSnackBar,
              private matDialog: MatDialog,
              private route: Router) {
    // @ts-ignore
    this.idlopmove = this.route.getCurrentNavigation()?.extras.state?.idlop;
  }

  lopHocSinhReponse!: LopHocSinhReponse | null;

  listNamHocs: NamHoc[] = []
  listKhois: Khoi[] = []
  listLops: Lop[] = []
  khoiValue: any;
  namhocValue: any;
  checkPagination = true;
  listgv: GiaoVien[] = [];

  ngOnInit(): void {
    this.checkPagination = false;
    this.studentService.getListGV().subscribe(data => {
      this.listgv = data
    })

    this.studentService.getListNameHoc().subscribe(
      data => {
        this.listNamHocs = data;
      }
    )
    this.schedule.getAllBlock().subscribe(data => {
      this.listKhois = data;
    })

    if (this.idlopmove != null) {
      this.studentService.getListHocSinhbyidlop(this.idlopmove).subscribe(data => {
          this.isDisplayLoad = false
          this.lopHocSinhReponse = data;
          if (data.hocSinhs.length < 5) {
            this.checkPagination = false;
          }
          this.p = 1;
        }
        , error => {
          this.isDisplayLoad = false
          this.snackbar.open("Không tìm thấy học sinh trong lớp này", "", {duration: 2000, verticalPosition: "top"})
        })

    }

  }

  setValueNamHoc(e: any) {
    this.namhocValue = e.target.value;
  }

  setValueKhoi(e: any) {
    this.khoiValue = e.target.value;
  }

  handlerOnChangeLop() {
    if (this.namhocValue != null && this.khoiValue != null) {
      this.studentService.getListLopNameHocAndKhoi(this.khoiValue, this.namhocValue).subscribe(data => {
          this.listLops = data;
        }
      )
    }
  }

  idlop!: number;
  isDisplay: boolean = false;
  isDisplayLoad: boolean = false;

  handlerOnChangeLopNew(e: any) {
    this.lopHocSinhReponse = null;
    this.isDisplay = true
    this.isDisplayLoad = true;
    this.idlop = e.target.value;

    this.studentService.getListHocSinhbyidlop(this.idlop).subscribe(data => {
        this.isDisplayLoad = false
        this.lopHocSinhReponse = data;
        if (data.hocSinhs.length < 5) {
          this.checkPagination = false;
        }
        this.p = 1;
      }
      , error => {
        this.isDisplayLoad = false
        this.snackbar.open("Không tìm thấy học sinh trong lớp này", "", {duration: 2000, verticalPosition: "top"})
      })
  }

  handlerOnChangeLopNewTime(e: number) {
    this.lopHocSinhReponse = null;
    this.isDisplay = true
    this.isDisplayLoad = true
    this.idlop = e;

    this.studentService.getListHocSinhbyidlop(this.idlop).subscribe(data => {
        this.isDisplayLoad = false
        this.lopHocSinhReponse = data;
        if (data.hocSinhs.length < 5) {
          this.checkPagination = false;
        }
        this.p = 1;
      }
      , error => {
        this.isDisplayLoad = false
        this.snackbar.open("Không tìm thấy học sinh trong lớp này", "", {duration: 2000, verticalPosition: "top"})
      })
  }

  openDialogCreate() {
    const dialogRef = this.matDialog.open(CreateStudentComponent, {
      width: '1000px',
      height: '700px',
      data: this.idlop
    });
    dialogRef.afterClosed().subscribe(() => {
      this.handlerOnChangeLopNewTime(this.idlop)
    })
  }

  openDialogDetail(id: string) {
    const dialogRef = this.matDialog.open(DetailStudentComponent, {
      width: '1000px',
      height: '480px',
      data: id
    });

  }

  openDialogDelete(id: string) {
    const dialogRef = this.matDialog.open(DeleteStudentComponent, {
      width: '500px',
      height: '200px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      this.handlerOnChangeLopNewTime(this.idlop)
    })
  }

  openDialogUpdate(id: string) {
    const dialogRef = this.matDialog.open(UpdateStudentComponent, {
      width: '1000px',
      height: '700px',
      data: {idlop: this.idlop, idhocsinh: id}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.handlerOnChangeLopNewTime(this.idlop)
    })
  }

  updateGv(Idgv: string) {
    this.studentService.updateTeacher({
      idLop: this.idlop, idGv: Idgv
    }).subscribe(() => {
      this.snackbar.open("Cập nhật giáo viên chủ nhiệm thành công", "", {duration: 3000})
    }, error => console.log(error))
  }
}
