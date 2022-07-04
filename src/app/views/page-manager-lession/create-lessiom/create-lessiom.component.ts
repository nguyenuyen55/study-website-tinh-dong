import {Component, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LessionService} from "../../../services/lession/lession.service";
import {SubjectService} from "../../../services/subject/subject.service";
import {ChapterService} from "../../../services/chapter/chapter.service";
import {MonHoc} from "../../../core/model/MonHoc";
import {ChuongHoc} from "../../../core/model/ChuongHoc";
import {ScheduleService} from "../../../services/schedule/schedule.service";
import {Khoi} from "../../../core/model/Khoi";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {formatDate} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";

// import {DomSanitizationService} from '@angular/platform-browser';
@Component({
  selector: 'app-create-lessiom',
  templateUrl: './create-lessiom.component.html',
  styleUrls: ['./create-lessiom.component.scss']
})


export class CreateLessiomComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private _lessionService: LessionService,
              private _subjectService: SubjectService,
              private _chapterService: ChapterService,
              private sanitizer: DomSanitizer,
              private snackbar: MatSnackBar,
              @Inject(AngularFireStorage) private storage: AngularFireStorage
    , private schedule: ScheduleService) {
  }

  lessionForm!: FormGroup;
  listSubject: MonHoc[] = [];
  listChapter: ChuongHoc[] = [];
  listBlock: Khoi[] = [];
  selectedImage: any = null;

  ngOnInit(): void {
    this.lessionForm = this.fb.group(
      {
        block: ['', Validators.required],
        ten: ['', Validators.required],
        subject: ['', Validators.required],
        idChuong: ['', Validators.required],
        mota: ['', Validators.required],
        fileVideo: ['', Validators.required]
      })
    this.schedule.getAllBlock().subscribe(data => {
      this.listBlock = data;
    })
  }

  createLession() {
    this._lessionService.createLession({
      ten: this.lessionForm.value.ten,
      mota: this.lessionForm.value.mota,
      fileVideo: this.link,
      idChuong: this.lessionForm.value.idChuong,
      fileTaiLieu: ''
    }).subscribe(data => {
      this.snackbar.open("Đăng bài giảng thành công", "OK", {
        duration: 3000
      })
      this.isDisplayVideo = false;
      this.lessionForm.reset();
    })
  }

  handlerOnChangeLession(e: any) {
    this._subjectService.getSubjectbyBlock(e.target.value).subscribe(response => {
      this.listSubject = [...response];
      this.listChapter = [];
    });
  }

  transform() {
// @ts-ignore
    let url = this.link;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  handlerOnChangeSubject(e: any) {
    this._chapterService.getAllChapterBySubject(e.target.value).subscribe(response => {
      this.listChapter = [...response];
    });
  }

  link: string = '';
  isDisplay = false;
  isDisplayVideo = false;

  showPreview(event: any) {
    this.isDisplay = true;
    this.selectedImage = event.target.files[0];
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.isDisplay = false;
          this.isDisplayVideo = true;
          // this.lessionForm.patchValue({"fileVideo":url})
          this.link = url;

        });
      })
    ).subscribe();

  }


  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}

