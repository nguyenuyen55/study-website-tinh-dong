import {Component, OnInit} from '@angular/core';
import {NamHoc} from "../../../core/model/NamHoc";
import {Khoi} from "../../../core/model/Khoi";
import {Lop} from "../../../core/model/Lop";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {ScheduleService} from "../../../services/schedule/schedule.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ChiTietThoiKhoaBieu} from "../../../core/model/ChiTietThoiKhoaBieu";
import {MonHoc} from "../../../core/model/MonHoc";
import {SubjectService} from "../../../services/subject/subject.service";
import {ClassService} from "../../../core/services/class/class.service";
import {TabletimeService} from "../../../core/services/tableTime/tabletime.service";
import {ThoiKhoaBieuDTO} from "../../../core/dto/ThoiKhoaBieuDTO";

@Component({
  selector: 'app-update-time-table',
  templateUrl: './update-time-table.component.html',
  styleUrls: ['./update-time-table.component.scss']
})
export class UpdateTimeTableComponent implements OnInit {

  constructor(private studentService: StudentsService,
              private schedule: ScheduleService,
              private snackbar: MatSnackBar,
              private matDialog: MatDialog,
              private route: Router,
              private subjectService: SubjectService,
              private classService: ClassService,
              private timetableService: TabletimeService) {
  }

  listNamHocs: NamHoc[] = []
  listKhois: Khoi[] = []
  listLops: Lop[] = [];
  khoiValue: any;
  namhocValue: any;
  lesson1: ChiTietThoiKhoaBieu[] = [];
  lesson2: ChiTietThoiKhoaBieu[] = [];
  lesson3: ChiTietThoiKhoaBieu[] = [];
  lesson4: ChiTietThoiKhoaBieu[] = [];
  lesson5: ChiTietThoiKhoaBieu[] = [];

  ngOnInit(): void {


    this.studentService.getListNameHoc().subscribe(
      data => {
        this.listNamHocs = data;
      }
    )
    this.schedule.getAllBlock().subscribe(data => {
      this.listKhois = data;
    })
  }

  setValueNamHoc(e: any) {
    this.namhocValue = e.target.value;
  }

  setValueKhoi(e: any) {
    this.khoiValue = e.target.value;
    this.subjectService.getSubjectbyBlock(this.khoiValue).subscribe(data => {
      this.listMonHoc = data;
    })
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
  listMonHoc: MonHoc[] = [];

  handlerOnChangeLopNew(e: any) {
    this.schedule.getListScheduleByID(e.target.value).subscribe(
      value => {
        console.log(value)
        this.lesson1 = [];
        this.lesson2 = [];
        this.lesson3 = [];
        this.lesson4 = [];
        this.lesson5 = [];
        value.forEach(element => {
          switch (element.thuTu) {
            case "1":
              this.lesson1.push(element);
              break;
            case "2":
              this.lesson2.push(element);
              break;
            case "3":
              this.lesson3.push(element);
              break;
            case "4":
              this.lesson4.push(element);
              break;
            case "5":
              this.lesson5.push(element);
              break;
          }

        });
      }
      , error => {
        this.snackbar.open("Không có thời khoá biểu của lớp này","",{duration:3000});
        this.lesson1 = [];
        this.lesson2 = [];
        this.lesson3 = [];
        this.lesson4 = [];
        this.lesson5 = [];
        this.listMonHoc = [];
      })
  }

  updateTimeTable() {
    let lession1New: ThoiKhoaBieuDTO[] = [];
    let lession2New: ThoiKhoaBieuDTO[] = [];
    let lession3New: ThoiKhoaBieuDTO[] = [];
    let lession4New: ThoiKhoaBieuDTO[] = [];
    let lession5New: ThoiKhoaBieuDTO[] = [];


    for (let lession of this.lesson1) {
      let chitiet: ThoiKhoaBieuDTO = {
        id: lession.id,
        thu: lession.thu,
        thuTu: lession.thuTu,
        idMonHoc: lession.monHoc.id,
        idThoiKhoaBieu: lession.thoiKhoaBieu.id
      }
      lession1New.push(chitiet);
    }

    for (let lession of this.lesson2) {
      let chitiet: ThoiKhoaBieuDTO = {
        id: lession.id,
        thu: lession.thu,
        thuTu: lession.thuTu,
        idMonHoc: lession.monHoc.id,
        idThoiKhoaBieu: lession.thoiKhoaBieu.id
      }
      lession2New.push(chitiet);
    }
    for (let lession of this.lesson3) {
      let chitiet: ThoiKhoaBieuDTO = {
        id: lession.id,
        thu: lession.thu,
        thuTu: lession.thuTu,
        idMonHoc: lession.monHoc.id,
        idThoiKhoaBieu: lession.thoiKhoaBieu.id
      }
      lession3New.push(chitiet);
    }
    for (let lession of this.lesson4) {
      let chitiet: ThoiKhoaBieuDTO = {
        id: lession.id,
        thu: lession.thu,
        thuTu: lession.thuTu,
        idMonHoc: lession.monHoc.id,
        idThoiKhoaBieu: lession.thoiKhoaBieu.id
      }
      lession4New.push(chitiet);
    }
    for (let lession of this.lesson5) {
      let chitiet: ThoiKhoaBieuDTO = {
        id: lession.id,
        thu: lession.thu,
        thuTu: lession.thuTu,
        idMonHoc: lession.monHoc.id,
        idThoiKhoaBieu: lession.thoiKhoaBieu.id
      }
      lession5New.push(chitiet);
    }

    let dem = 0;
    this.timetableService.updateTimeTable(lession1New).subscribe(() => {
    }, () => {
      dem = 1;
    });
    this.timetableService.updateTimeTable(lession2New).subscribe(() => {
    }, () => {
      dem = 1;
    });
    this.timetableService.updateTimeTable(lession3New).subscribe(() => {
    }, () => {
      dem = 1;
    });
    this.timetableService.updateTimeTable(lession4New).subscribe(() => {
    }, () => {
      dem = 1;
    });
    this.timetableService.updateTimeTable(lession5New).subscribe(() => {

    }, () => {
      dem = 1;
    });
    if (dem == 1) {
      this.snackbar.open("Cập nhật không thành công", "", {duration: 3000});
    } else {
      this.snackbar.open("Cập nhật thành công", "", {duration: 3000});
    }
  }

  lop!: any;
  monhoc!: MonHoc;

  getTiet(index: ChiTietThoiKhoaBieu, lession: ChiTietThoiKhoaBieu[], i: number) {
    // @ts-ignore
    let change = document.getElementById("subjectchange" + index.id).value;
    this.classService.getClassById(change).subscribe(data => {
      this.lop = data
      this.monhoc = {
        id: this.lop.id,
        ten: this.lop.ten
      }
      index.monHoc = this.monhoc;
    })

    if (i == 1) {
      this.lesson1 = lession;
    }
    if (i == 2) {
      this.lesson2 = lession;
    }
    if (i == 3) {
      this.lesson3 = lession;
    }
    if (i == 4) {
      this.lesson4 = lession;
    }
    if (i == 5) {
      this.lesson5 = lession;
    }

  }


}
