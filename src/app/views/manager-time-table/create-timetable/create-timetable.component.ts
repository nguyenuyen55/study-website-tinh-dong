import {Component, OnInit} from '@angular/core';
import {NamHoc} from "../../../core/model/NamHoc";
import {Khoi} from "../../../core/model/Khoi";
import {Lop} from "../../../core/model/Lop";
import {SubjectService} from "../../../services/subject/subject.service";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {ScheduleService} from "../../../services/schedule/schedule.service";
import {MonHoc} from "../../../core/model/MonHoc";
import {ChiTietThoiKhoaBieu} from "../../../core/model/ChiTietThoiKhoaBieu";
import {ThoiKhoaBieuCreateDTO} from "../../../core/dto/ThoiKhoaBieuCreateDTO";
import {create} from "domain";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TabletimeService} from "../../../core/services/tableTime/tabletime.service";

@Component({
  selector: 'app-create-timetable',
  templateUrl: './create-timetable.component.html',
  styleUrls: ['./create-timetable.component.scss']
})
export class CreateTimetableComponent implements OnInit {

  constructor(private subjectService: SubjectService,
              private studentService: StudentsService,
              private timetableService: TabletimeService,
              private schedule: ScheduleService,
              private snackbar: MatSnackBar) {
  }

  listNamHocs: NamHoc[] = [];
  listKhois: Khoi[] = [];
  listLops: Lop[] = [];
  khoiValue: any;
  namhocValue: any;
  lopValue: any;
  listMonHoc: MonHoc[] = [];
  lesson1: ThoiKhoaBieuCreateDTO[] = [];
  lesson2: ThoiKhoaBieuCreateDTO[] = [];
  lesson3: ThoiKhoaBieuCreateDTO[] = [];
  lesson4: ThoiKhoaBieuCreateDTO[] = [];
  lesson5: ThoiKhoaBieuCreateDTO[] = [];

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

  nameThu(index: number) {
    let name: string = '';
    switch (index) {
      case 1:
        name = "Thứ 2"
        break;
      case 2:
        name = "Thứ 3"
        break;
      case 3:
        name = "Thứ 4"
        break;
      case 4:
        name = "Thứ 5"
        break;
      case 5:
        name = "Thứ 6"
        break;
    }
    return name;
  }

  createLession(lession: ThoiKhoaBieuCreateDTO[], idkhoi: string) {
    switch (idkhoi) {
      case "1":
        for (let i = 1; i <= 5; i++) {
          let name = this.nameThu(i);
          lession.push({
            thu: name,
            thuTu: '' + i,
            idMonHoc: 1
          })
        }
        break;
      case "2":
        for (let i = 1; i <= 5; i++) {
          let name = this.nameThu(i);
          lession.push({
            thu: name,
            thuTu: '' + i,
            idMonHoc: 10
          })
        }
        break;
      case "3":
        for (let i = 1; i <= 5; i++) {
          let name = this.nameThu(i);
          lession.push({
            thu: name,
            thuTu: '' + i,
            idMonHoc: 18
          })
        }
        break;
      case "4":
        for (let i = 1; i <= 5; i++) {
          let name = this.nameThu(i);
          lession.push({
            thu: name,
            thuTu: '' + i,
            idMonHoc: 27
          })
        }
        break;
      case "5":
        for (let i = 1; i <= 5; i++) {
          let name = this.nameThu(i);
          lession.push({
            thu: name,
            thuTu: '' + i,
            idMonHoc: 36
          })
        }
        break;
    }
    return lession;

  }

  handlerOnChangeLop() {

    if (this.namhocValue != null && this.khoiValue != null) {
      this.studentService.getListLopNameHocAndKhoiThoiKhoaBieu(this.khoiValue, this.namhocValue).subscribe(data => {
          this.listLops = data;
        }, error => {
          this.snackbar.open("Các lớp của khối này đã có thời khoá biểu rồi !", "", {duration: 1000})
        }
      )
      this.subjectService.getSubjectbyBlock(this.khoiValue).subscribe(data => {
        this.listMonHoc = data;
      })

    }
  }

  handlerOnChangeLopNew(e: any) {
    this.lopValue = e.target.value;
  }

  setValueNamHoc(e: any) {
    this.namhocValue = e.target.value;
  }

  setValueKhoi(e: any) {
    this.lesson1 = [];
    this.lesson2 = [];
    this.lesson3 = [];
    this.lesson4 = [];
    this.lesson5 = [];
    this.khoiValue = e.target.value;
    this.lesson1 = this.createLession(this.lesson1, this.khoiValue);
    this.lesson2 = this.createLession(this.lesson2, this.khoiValue);
    this.lesson3 = this.createLession(this.lesson3, this.khoiValue);
    this.lesson4 = this.createLession(this.lesson4, this.khoiValue);
    this.lesson5 = this.createLession(this.lesson5, this.khoiValue);
    console.log(this.lesson1)
    console.log(this.lesson2)
  }

  getTiet(lessions: ThoiKhoaBieuCreateDTO[], lession: ThoiKhoaBieuCreateDTO, index: number, idvalue: number) {
    let idmonn: number = 0;
    switch (index) {
      case 1:
        // @ts-ignore
        idmonn = document.getElementById("subject1" + idvalue).value;
        break;
      case 2:
        // @ts-ignore
        idmonn = document.getElementById("subject2" + idvalue).value;
        break;
      case 3:
        // @ts-ignore
        idmonn = document.getElementById("subject3" + idvalue).value;
        break;
      case 4:
        // @ts-ignore
        idmonn = document.getElementById("subject4" + idvalue).value;
        break;
      case 5:
        // @ts-ignore
        idmonn = document.getElementById("subject5" + idvalue).value;
        break;
    }

    lession.idMonHoc = idmonn;
    // lessions.push(lession);
    switch (index) {
      case 1:
        this.lesson1 = lessions;
        break;
      case 2:
        this.lesson2 = lessions;
        break;
      case 3:
        this.lesson3 = lessions;
        break;
      case 4:
        this.lesson4 = lessions;
        break;
      case 5:
        this.lesson5 = lessions;
        break;
    }
  }

  createTimeTable() {
    let dem = 0;
    // @ts-ignore
    let lession1TG = this.lesson1;
    for (let sub of this.lesson2) {
      this.lesson1.push(sub);
    }

    for (let sub of this.lesson3) {
      this.lesson1.push(sub);
    }

    for (let sub of this.lesson4) {
      this.lesson1.push(sub);
    }

    for (let sub of this.lesson5) {
      this.lesson1.push(sub);
    }
    console.log(this.lesson1)

    this.timetableService.createTimeTable(this.lesson1, this.lopValue).subscribe(() => {
    }, () => {
      dem = 1;
      this.lesson1 = lession1TG;
    });
    if (dem == 1) {
      this.snackbar.open("Tạo mới không thành công", "", {duration: 3000});
    } else {
      this.snackbar.open("Tạo mới thành công", "", {duration: 3000});
    }
  }
}
