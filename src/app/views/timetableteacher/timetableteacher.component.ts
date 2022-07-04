import { Component, OnInit } from '@angular/core';
import {TabletimeService} from "../../core/services/tableTime/tabletime.service";
import {ScheduleService} from "../../services/schedule/schedule.service";
import {AuthService} from "../../core/services/pagelogin/auth.service";
import {ChiTietThoiKhoaBieu} from "../../core/model/ChiTietThoiKhoaBieu";

@Component({
  selector: 'app-timetableteacher',
  templateUrl: './timetableteacher.component.html',
  styleUrls: ['./timetableteacher.component.scss']
})
export class TimetableteacherComponent implements OnInit {

  constructor(private tableTime:TabletimeService,
              private schedule:ScheduleService,
              private auth:AuthService) { }
  lesson1: ChiTietThoiKhoaBieu[] = [];
  lesson2: ChiTietThoiKhoaBieu[] = [];
  lesson3: ChiTietThoiKhoaBieu[] = [];
  lesson4: ChiTietThoiKhoaBieu[] = [];
  lesson5: ChiTietThoiKhoaBieu[] = [];
  isdisplay:boolean=false;
  ngOnInit(): void {
    this.tableTime.getidlopByIdTeacher(this.auth.getUser()!.toUpperCase()).subscribe(data=>{
      this.schedule.getListScheduleByID(data).subscribe(
        value => {
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
      ,error => this.isdisplay=true )
    })
  }

}
