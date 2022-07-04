import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../../services/news/news.service";
import {TinTuc} from "../../../core/model/TinTuc";
import {DetailTeacherComponent} from "../../manager-teacher/detail-teacher/detail-teacher.component";
import {MatDialog} from "@angular/material/dialog";
import {DetailNewComponent} from "../detail-new/detail-new.component";
import {DeleteTeacherComponent} from "../../manager-teacher/delete-teacher/delete-teacher.component";
import {DeleteNewComponent} from "../delete-new/delete-new.component";
import {CreateTeacherComponent} from "../../manager-teacher/create-teacher/create-teacher.component";
import {CreateNewComponent} from "../create-new/create-new.component";

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.scss']
})
export class ListNewComponent implements OnInit {
  p: number | any;
  checkPagination = true;
  constructor(private newService:NewsService,
              private matDialog: MatDialog) { }
  listNews: TinTuc[] = [];
  ngOnInit(): void {
    this.newService.getAllNews().subscribe(data=>{
      this.listNews=data;
      if (data.length < 5) {
        this.checkPagination = false;
      }
      this.p = 1;
    })
  }
  openDialogDetail(id: number) {
    const dialogRef = this.matDialog.open(DetailNewComponent, {
      width: '1200px',
      height: '600px',
      data: id
    });

  }
  openDialogDelete(id: number) {
    const dialogRef = this.matDialog.open(DeleteNewComponent, {
      width: '500px',
      height: '200px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    })
  }
  openDialogCreate() {
    const dialogRef = this.matDialog.open(CreateNewComponent, {
      width: '1000px',
      height: '700px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    })
  }
}
