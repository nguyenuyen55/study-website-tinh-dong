import {MonHoc} from './../../core/model/MonHoc';
import {SubjectService} from './../../services/subject/subject.service';
import {Khoi} from 'src/app/core/model/Khoi';
import {BaiGiang} from './../../core/model/BaiGiang';
import {LessionService} from '../../services/lession/lession.service';
import {Component, OnInit} from '@angular/core';
import {ChapterService} from 'src/app/services/chapter/chapter.service';
import {ChuongHoc} from 'src/app/core/model/ChuongHoc';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-lession-page',
  templateUrl: './lession.component.html',
  styleUrls: ['./lession.component.scss']
})
export class LessionComponent implements OnInit {
  listBlock: Khoi[] = [];
  lessionImage: string = "assets/images/lession.png";
  allListLession: BaiGiang[] = []
  listLession: BaiGiang[] = [];
  p: number | any;
  checkPagination = true;
  listSubject: MonHoc[] = [];
  listChapter: ChuongHoc[] = [];
  idSubject: number = 0;
  idChapter: number = 0;
  message = "Loading...";

  constructor(private _lessionService: LessionService,
              private _subjectService: SubjectService,
              private _chapterService: ChapterService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    const blockinStorage = JSON.parse(localStorage.getItem('dataBlock') || "");
    this.listBlock.push(...blockinStorage);
    this._lessionService.getAll().subscribe(response => {
      this.allListLession.push(...response);
      this.listLession = this.allListLession;
    });
    setTimeout(() => {
      this.message = "Bài giảng đang được cập nhật."
    }, 3000)
  }

  handlerOnChangeLession(e: any) {
    this._subjectService.getSubjectbyBlock(e.target.value).subscribe(response => {
      this.listSubject = [...response];
      this.listChapter = [];
    });
  }

  handlerOnChangeSubject(e: any) {
    this.idSubject = e.target.value;
    this._chapterService.getAllChapterBySubject(e.target.value).subscribe(response => {
      this.listChapter = [...response];
    });
  }

  handlerOnChangeChapter(e: any) {
    this.message = "Loading...";
    setTimeout(() => {
      this.message = "Bài giảng đang được cập nhật."
    }, 3000)
    this.idChapter = e.target.value;

    if (this.idSubject && this.idChapter) {
      this._lessionService.getLessionByChapterAndSubject(this.idChapter, this.idSubject).subscribe(response => {
        this.allListLession = response
        return this.listLession = this.allListLession;
      });
    }
    this.allListLession = [];
    this.listLession = [];
  }

  changeValueLession(e: any) {
    if (this.idSubject && this.idChapter) {
      this._lessionService.getLessionByChapterAndSubjectAndNames(this.idChapter, this.idSubject, e).subscribe(response => {
        this.allListLession = response
        return this.listLession = this.allListLession;
      }, () => {
        this.snackbar.open("Không tìm thấy bài giảng với tên bạn cần tìm", "OK", {duration: 3000})
      });
    } else {
      this._lessionService.getLessionByName(e).subscribe(response => {
        this.allListLession = response
        return this.listLession = this.allListLession;
      }, () => {
        this.snackbar.open("Không tìm thấy bài giảng với tên bạn cần tìm", "OK", {duration: 3000})
      });
    }
  }
}

