import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MonHoc} from "../../../core/model/MonHoc";
import {ChuongHoc} from "../../../core/model/ChuongHoc";
import {Khoi} from "../../../core/model/Khoi";
import {ScheduleService} from "../../../services/schedule/schedule.service";
import {finalize, Subscription} from "rxjs";
import {formatDate} from "@angular/common";
import {LessionService} from "../../../services/lession/lession.service";
import {SubjectService} from "../../../services/subject/subject.service";
import {ChapterService} from "../../../services/chapter/chapter.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-lession',
  templateUrl: './update-lession.component.html',
  styleUrls: ['./update-lession.component.scss']
})
export class UpdateLessionComponent implements OnInit {

  lessionForm!: FormGroup;
  listSubject: MonHoc[] = [];
  listChapter: ChuongHoc[] = [];
  listBlock: Khoi[] = [];
  selectedImage: any = null;

  constructor(private fb: FormBuilder,
              private _lessionService: LessionService,
              private _subjectService: SubjectService,
              private _chapterService: ChapterService,
              private sanitizer: DomSanitizer,
              private snackbar: MatSnackBar,
              private route: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage
    , private schedule: ScheduleService) {
  }

  private routeSub: Subscription | undefined;
  id = 0;
  idkhoi!: number | null;
linkImga:string='';
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
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this._lessionService.getLessionById(this.id).subscribe(data => {
      this._lessionService.getKhoiByMonHoc(data.chuongHoc.monHoc.id).subscribe(value => {
        this.lessionForm.patchValue({"block": value});
        this.lessionForm.patchValue({"subject": data.chuongHoc.monHoc.id});
        this.lessionForm.patchValue({"idChuong": data.chuongHoc.id});
        this.lessionForm.patchValue({"ten": data.ten});
        this.lessionForm.patchValue({"mota": data.mota});

        this._subjectService.getSubjectbyBlock(value).subscribe(response => {
          this.listSubject = [...response];
          this.idkhoi = null;
        });
        this._chapterService.getAllChapterBySubject(data.chuongHoc.monHoc.id).subscribe(response => {
          this.listChapter = [...response];
        });
      })
this.link=data.fileVideo;
      console.log(this.link)

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
  isDisplayVideo = true;

  showPreview(event: any) {
    this.isDisplay = true;
    this.selectedImage = event.target.files[0];
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.isDisplay = false;
          this.link = url;

        });
      })
    ).subscribe();
  }

  updateLession() {
    this._lessionService.updateLession({
      id:this.id,
      ten: this.lessionForm.value.ten,
      mota: this.lessionForm.value.mota,
      fileVideo: this.link,
      idChuong: this.lessionForm.value.idChuong,
      fileTaiLieu: ''
    }).subscribe(data => {
      this.snackbar.open("Cập nhật bài giảng thành công", "OK", {
        duration: 3000
      })
      this.isDisplayVideo = false;
    })

    console.log(this.lessionForm.value);
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
