import {Component, OnInit} from '@angular/core';
import {MarkService} from "../../../core/services/pagemark/mark.service";
import {HocSinh} from "../../../core/model/hocSinh";
import {AuthService} from "../../../core/services/pagelogin/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateStudentComponent} from "../../manager-student/create-student/create-student.component";
import {MatDialog} from "@angular/material/dialog";
import {DetailmarkComponent} from "../detailmark/detailmark.component";
import {UpdateDetailStudentComponent} from "../update-detail-student/update-detail-student.component";

@Component({
  selector: 'app-update-mark-student',
  templateUrl: './update-mark-student.component.html',
  styleUrls: ['./update-mark-student.component.scss']
})
export class UpdateMarkStudentComponent implements OnInit {
  listHocSinh!: HocSinh[];
idgv:any;
  constructor(private markService: MarkService, private auth: AuthService,
              private activeRoute: ActivatedRoute,private route:Router,
              private matDialog: MatDialog) {
    // @ts-ignore
    this.idgv= this.route.getCurrentNavigation()?.extras.state?.name;
  }

  ngOnInit(): void {
    if (this.auth.isTeacher()) {
      this.markService.getListStudentByidTeacher(this.auth.getUser()!.toUpperCase()).subscribe(
        data => {
          this.listHocSinh = data;
        }
      )
    }

    if (this.auth.isAdmin()){
      this.markService.getListStudentByidTeacher(this.idgv).subscribe(
        data => {
          this.listHocSinh = data;
        }
      )
    }
      }
  openDialogMark(id:string) {
    const dialogRef = this.matDialog.open(UpdateDetailStudentComponent, {
      width: '800px',
      height: '550px',
      data:id
    });
    dialogRef.afterClosed().subscribe(() => {
    })
  }
}
