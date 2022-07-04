
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GiaoVien } from 'src/app/core/model/GiaoVien';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  constructor(private _teacherService: TeacherService) { }
  checkTeacher = false;
  message = "Loading...";
  form = new FormGroup({
    name: new FormControl(),
  });
  ngOnInit(): void {
  }
  teacher: GiaoVien[] = [];
  handlerSearchTeacher() {
    this.checkTeacher = true;
    setTimeout(()=>{ 
      this.message = "Không tìm thấy giáo viên. Vui lòng kiểm tra lại.";
    },1000)
    this._teacherService.getTeacherByName(this.form.value.name).subscribe(response => {
      this.checkTeacher = false;
      return this.teacher = response;  
    });
    return this.teacher = [];
  }
  setCheck() {
    if (this.checkTeacher = true) this.checkTeacher = false;

  }
}
