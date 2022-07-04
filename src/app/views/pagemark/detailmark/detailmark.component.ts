import {Component, OnInit} from '@angular/core';
import {MarkService} from "../../../core/services/pagemark/mark.service";
import {AuthService} from "../../../core/services/pagelogin/auth.service";
import {Diem} from "../../../core/model/Diem";
import {NamHoc} from "../../../core/model/NamHoc";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detailmark',
  templateUrl: './detailmark.component.html',
  styleUrls: ['./detailmark.component.scss']
})
export class DetailmarkComponent implements OnInit {
  iduser!: string | null;

  constructor(private markservice: MarkService,
              private auth: AuthService,
              private studentService: StudentsService,
              private snacbar:MatSnackBar) {
  }
  namhocValue:any;
  thisData!: Diem[];
  listNamHocs: NamHoc[] = []

  ngOnInit(): void {
    this.studentService.getListNameHoc().subscribe(
      data => {
        this.listNamHocs = data;
      }
    )
    // // @ts-ignore
    // this.iduser = this.auth.getUser().toLocaleUpperCase();
    // this.markservice.getMarkByIdStudent(this.iduser).subscribe(data => {
    //   this.thisData = data
    // })
  }
  setValueNamHoc(e: any) {
    this.namhocValue = e.target.value;
  }

  calculatorMark(diemgiuaki: number, diemcuoiki: number, tenmonhoc: string): number {
    let diemtb: number = 0;
    if (tenmonhoc.toLowerCase() == 'toán' || tenmonhoc.toLowerCase() == 'tiếng việt') {
      diemtb = (diemgiuaki + diemcuoiki) / 2;
    }
    if (tenmonhoc.toLowerCase() == 'tiếng anh' || tenmonhoc.toLowerCase() == 'lịch sử và địa lí' || tenmonhoc.toLowerCase() == 'khoa học') {
      diemtb = diemcuoiki;
    }
    return diemtb;
  }
  changeMark(mark:any){
    // @ts-ignore
    this.iduser = this.auth.getUser().toLocaleUpperCase();
    this.markservice.getMarkByYearAndIdStudent(mark,this.iduser).subscribe(data => {
      this.thisData = data
    },()=>{
      this.snacbar.open("Không tìm thấy điểm của năm học này","ok",{duration:3000})
    })
  }
}
