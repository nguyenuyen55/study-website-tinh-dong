import { Component, OnInit } from '@angular/core';
import {BaiGiang} from "../../../core/model/BaiGiang";
import {LessionService} from "../../../services/lession/lession.service";
import {MatDialog} from "@angular/material/dialog";
import {DetailLessionAdminComponent} from "../detail-lession-admin/detail-lession-admin.component";
import {DeleteTeacherComponent} from "../../manager-teacher/delete-teacher/delete-teacher.component";
import {DeleteLessionComponent} from "../delete-lession/delete-lession.component";
import {CreateTeacherComponent} from "../../manager-teacher/create-teacher/create-teacher.component";
import {CreateLessiomComponent} from "../create-lessiom/create-lessiom.component";

@Component({
  selector: 'app-list-lession',
  templateUrl: './list-lession.component.html',
  styleUrls: ['./list-lession.component.scss']
})
export class ListLessionComponent implements OnInit {

  constructor(private lessionService:LessionService,
              private matDialog: MatDialog) { }
lessions!:BaiGiang[];
  p: number | any;
  checkPagination = true;
  ngOnInit(): void {
    this.lessionService.getAllLession().subscribe(data=>{
      if (data.length < 5) {
        this.checkPagination = false;
      }
      this.p = 1;
     this.lessions=data;
      console.log(this.lessions)
    })

  }
  openDialogDetail(id: number) {
    const dialogRef = this.matDialog.open(DetailLessionAdminComponent, {
      width: '1000px',
      height: '550px',
      data: id
    });

  }
  openDialogCreate() {
    const dialogRef = this.matDialog.open(CreateLessiomComponent, {
      width: '1200px',
      height: '800px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    })
  }
  openDialogDelete(id: number) {
    const dialogRef = this.matDialog.open(DeleteLessionComponent, {
      width: '500px',
      height: '200px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    })
  }

}
