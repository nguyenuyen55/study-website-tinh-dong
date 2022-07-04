import {ChiTietThoiKhoaBieu} from 'src/app/core/model/ChiTietThoiKhoaBieu';
import {Lop} from './../../core/model/Lop';
import {Khoi} from './../../core/model/Khoi';
import {Component, OnInit} from '@angular/core';
import {ScheduleService} from 'src/app/services/schedule/schedule.service';
import {NamHoc} from "../../core/model/NamHoc";
import {StudentsService} from "../../core/services/pageManagerStudent/students.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  khoi = 0;
  lop = 0;
  listBlock: Khoi[] = [];
  listClass: Lop[] = [];
  listKhois: Khoi[] = []
  khoiValue: any;
  lesson1: ChiTietThoiKhoaBieu[] = [];
  lesson2: ChiTietThoiKhoaBieu[] = [];
  lesson3: ChiTietThoiKhoaBieu[] = [];
  lesson4: ChiTietThoiKhoaBieu[] = [];
  lesson5: ChiTietThoiKhoaBieu[] = [];
  listNamHocs: NamHoc[] = []
  namhocValue: any;

  constructor(private _scheduleService: ScheduleService,
              public studentService: StudentsService,
              private snackbar:MatSnackBar) {
  }

  ngOnInit(): void {
    const blockinStorage = JSON.parse(localStorage.getItem('dataBlock') || "");
    this.listBlock.push(...blockinStorage)

    this.studentService.getListNameHoc().subscribe(
      data => {
        this.listNamHocs = data;
      }
    )
  }

  setValueKhoi(e: any) {
    this.khoiValue = e.target.value;
  }

  setValueNamHoc(e: any) {
    this.namhocValue = e.target.value;
  }

  handlerOnChangeLop() {
    if (this.namhocValue != null && this.khoiValue != null) {
      this.studentService.getListLopNameHocAndKhoi(this.khoiValue, this.namhocValue).subscribe(data => {
          this.listClass = data;
          console.log(data)
      }
      )
    }
  }

  onChangeScheduleBlock(e: any) {
    this.khoi = e.target.value;
    this._scheduleService.getListClassByID(this.khoi).subscribe(
      response => {
        this.listClass = response;
      }
    )

  }

  onChangeScheduleClass(e: any) {
    this.lop = e.target.value;
  }

  handlerOnChangeLopNew(e: any) {
    this._scheduleService.getListScheduleByID(e.target.value).subscribe(
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
      })
  }

}
