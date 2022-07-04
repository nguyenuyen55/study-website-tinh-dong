import {Component, OnInit} from '@angular/core';
import {NamHoc} from "../../../core/model/NamHoc";
import {Khoi} from "../../../core/model/Khoi";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {ScheduleService} from "../../../services/schedule/schedule.service";
import {MarkService} from "../../../core/services/pagemark/mark.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ClassService} from "../../../core/services/class/class.service";
import {Lop} from "../../../core/model/Lop";
import {LopGiaoVienReponse} from "../../../core/dto/LopGiaoVienReponse";

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {

  constructor(private studentService: StudentsService,
              private schedule: ScheduleService,
              private markService: MarkService,
              private snackbar: MatSnackBar,
              private route: Router,
              private classService: ClassService) {
  }

  listNamHocs: NamHoc[] = [];
  listKhois: Khoi[] = [];
  listLopNew: LopGiaoVienReponse[] = [];
  currentYear: any;


  ngOnInit(): void {
    this.studentService.getListNameHoc().subscribe(
      data => {
        this.listNamHocs = data;
      }
    )
    this.schedule.getAllBlock().subscribe(data => {
      this.listKhois = data;
    })
    this.currentYear = new Date().getFullYear() + 1;
    // this.markService.getListMarkByidKhoiAndYear(1, this.currentYear).subscribe(data => {
    //     this.listLopNew = data;
    //   console.log(this.listLopNew)
    //   }
    // )
  }

  createClass(ten: string) {
    this.classService.createClass({
      name: ten,
      idKhoi: 1,
      yearCurrent: this.currentYear
    }).subscribe(() => {
      this.snackbar.open("Tạo mới lớp thành công", "ok", {duration: 3000})
    }, () => {
      this.snackbar.open("Tạo lớp không thành công", "ok", {duration: 3000})
    })
  }

}
