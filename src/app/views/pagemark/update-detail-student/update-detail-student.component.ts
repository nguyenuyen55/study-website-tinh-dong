import {Component, Inject, OnInit} from '@angular/core';
import {MarkService} from "../../../core/services/pagemark/mark.service";
import {Diem} from "../../../core/model/Diem";
import {ActivatedRoute} from "@angular/router";
import {DiemRequest} from "../../../core/dto/DiemRequest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {config} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-update-detail-student',
  templateUrl: './update-detail-student.component.html',
  styleUrls: ['./update-detail-student.component.scss']
})
export class UpdateDetailStudentComponent implements OnInit {

  constructor(private markservice: MarkService, private activeroute: ActivatedRoute
    , private snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  thisData!: Diem[];

  ngOnInit(): void {
    this.markservice.getMarkByIdStudent(this.data).subscribe(data => {
      this.thisData = data
    })
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


  getvalue1(index: any) {
    // @ts-ignore
    console.log(document.getElementById("value" + index).value)
    // @ts-ignore
    return document.getElementById("value" + index).value;
  }

  getvalue2(index: any) {
    // @ts-ignore
    return document.getElementById("valuec" + index).value;
  }

  save(index: number) {
    // @ts-ignore
    let diemgk = document.getElementById("valueg" + index).value;
    // @ts-ignore
    let diemck = document.getElementById("valuec" + index).value;
    let diemRequest: DiemRequest = {
      id: this.thisData[index].id,
      idHocKiHocSinh: this.thisData[index].hocKiHocSinh.id,
      idMonHoc: this.thisData[index].monHoc.id,
      diemGiuaKy: diemgk,
      diemCuoiKy: diemck,

    }
    this.markservice.updateMarkSudentByMark(diemRequest).subscribe(data => {
      this.snackbar.open("Lưu thành công", "", {
        duration: 3000, horizontalPosition: "center"
      });
    }, error => {
      console.log(error)
    })
  }

  check(index: number | null) {
    // @ts-ignore
    console.log(document.getElementById("valueg" + index).value)
    // @ts-ignore
    if (document.getElementById("valueg" + index).value < 0 || document.getElementById("valueg" + index).value > 10 || document.getElementById("valueg" + index).value == '') {
      // @ts-ignore
      document.getElementById("error" + index).innerHTML = "Vui lòng nhập từ 1 -10";

    }
    // @ts-ignore
    if (document.getElementById("valueg" + index).value >= 0 && document.getElementById("valueg" + index).value <= 10 && document.getElementById("valueg" + index).value != '') {
      // @ts-ignore
      document.getElementById("error" + index).innerHTML = "";
    }

  }

  checkc(index: number) {

    // @ts-ignore
    if (document.getElementById("valuec" + index).value < 0 || document.getElementById("valuec" + index).value > 10 || document.getElementById("valuec" + index).value == '') {
      // @ts-ignore
      document.getElementById("errorc" + index).innerHTML = "Vui lòng nhập từ 1 -10";

    }
    // @ts-ignore
    if (document.getElementById("valuec" + index).value >= 0 && document.getElementById("valuec" + index).value <= 10 && document.getElementById("valuec" + index).value != '') {
      // @ts-ignore
      document.getElementById("errorc" + index).innerHTML = "";
    }
  }

  // @ts-ignore
  checkSubjectVaild(tenmonhoc: string) {
    if (tenmonhoc.toLowerCase() == 'tiếng anh' || tenmonhoc.toLowerCase() == 'lịch sử và địa lí' || tenmonhoc.toLowerCase() == 'khoa học') {
      return true
    }

  }

  disbleButton(index: number) {
    // @ts-ignore
    if (document.getElementById("error" + index).innerHTML != '' || document.getElementById("error" + index).innerHTML != '') {
      // @ts-ignore
      return true;
    } else {
      // @ts-ignore
      return false;
    }

  }



}
