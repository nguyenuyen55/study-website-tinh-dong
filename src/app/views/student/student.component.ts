import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HocSinh } from 'src/app/core/model/hocSinh';
import { StudentService } from 'src/app/services/student/student.service';
import {HocSinhSearchDTO} from "../../core/dto/HocSinhSearchDTO";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private _studentService: StudentService) { }
  x = "hee"
  checkStudent = false;
  student: HocSinhSearchDTO[] = [];
  form = new FormGroup({
    mshs: new FormControl(),
  });
  ngOnInit(): void {

  }
  handlerSearchStudent(){
    this.student=[];
    this._studentService.getStudentByName(this.form.value.mshs).subscribe(response => {
      this.student = response;
    },error => {this.checkStudent==true});
  }

}
