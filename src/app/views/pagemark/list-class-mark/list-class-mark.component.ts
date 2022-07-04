import {Component, OnInit} from '@angular/core';
import {NamHoc} from "../../../core/model/NamHoc";
import {Khoi} from "../../../core/model/Khoi";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {ScheduleService} from "../../../services/schedule/schedule.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LopGiaoVienReponse} from "../../../core/dto/LopGiaoVienReponse";
import {MarkService} from "../../../core/services/pagemark/mark.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-class-mark',
  templateUrl: './list-class-mark.component.html',
  styleUrls: ['./list-class-mark.component.scss']
})
export class ListClassMarkComponent implements OnInit {

  constructor(private studentService: StudentsService,
              private schedule: ScheduleService,
              private markService:MarkService,
              private snackbar: MatSnackBar,
              private route:Router) {
  }

  khoiValue: any;
  namhocValue: any;
  listNamHocs: NamHoc[] = []
  listKhois: Khoi[] = []
  listLops: LopGiaoVienReponse[] = [];

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
  }

  handlerOnChangeLop() {
    if (this.namhocValue == null && this.khoiValue == null) {
      this.snackbar.open("Vui lòng chọn đầy đủ khôi và năm học");
    }
    if (this.namhocValue != null && this.khoiValue != null) {
      this.markService.getListMarkByidKhoiAndYear(this.khoiValue, this.namhocValue).subscribe(data => {
        console.log(data)
          this.listLops = data;
        }
      ,e=>{
            this.snackbar.open("Khối này chưa có lớp","ok",{duration:3000})
          })
    }
  }
  move(a:any){
    if(a!=null){
      this.route.navigateByUrl("/updatemark",{ state:{ name:a }})
    }else {
      this.snackbar.open("giáo viên không có nhé vui lòng cập nhật giáo viên chủ nhiệm cho lớp này","ok",{duration:3000})
    }
  }
}
