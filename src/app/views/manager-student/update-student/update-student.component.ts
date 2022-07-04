import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {

  constructor(private fb: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private studentService: StudentsService,
              private sanitizer: DomSanitizer,
              private snackbar: MatSnackBar,
              private dialogRef: MatDialogRef<UpdateStudentComponent>,) {
  }
  studentForm = new FormGroup({
    ngaySinh: new FormControl(),
    tonGiao:  new FormControl(),
    diaChi:  new FormControl(),
    tenBo:  new FormControl(),
    tenMe: new FormControl(),
    gioiTinh: new FormControl(),
    danToc: new FormControl(),
    sdtBoMe: new FormControl() ,
    hinhAnh: new FormControl() ,
  });
  selectedImage: any = null;
  link!: string;
  ngay!: string;

  ngOnInit(): void {
    this.studentForm = this.fb.group(
      {
        id: [this.data.idhocsinh],
        ten: ['', Validators.required],
        diaChi: ['', Validators.required],
        gioiTinh: ['', Validators.required],
        danToc: ['', Validators.required],
        tenBo: ['', Validators.required],
        tenMe: ['', Validators.required],
        tonGiao: ['', Validators.required],
        sdtBoMe: ['', [Validators.required,Validators.pattern("[0-9 ]{10}")]],
        hinhAnh: [''],
        ngaySinh: ['', Validators.required],
        idLop: [this.data.idlop, Validators.required]
      })

    this.studentService.getStudentByid(this.data.idhocsinh).subscribe(data => {
      this.ngay = data.ngaySinh;
      this.link = data.hinhAnh;
      this.studentForm.patchValue({ten: data.ten});
      this.studentForm.patchValue({diaChi: data.diaChi});
      this.studentForm.patchValue({gioiTinh: data.gioiTinh});
      this.studentForm.patchValue({danToc: data.danToc});
      this.studentForm.patchValue({tenBo: data.tenBo});
      this.studentForm.patchValue({tenMe: data.tenMe});
      this.studentForm.patchValue({tonGiao: data.tonGiao});
      this.studentForm.patchValue({sdtBoMe: data.sdtBoMe});
      this.studentForm.value.hinhAnh = 'a';
      this.studentForm.value.ngaySinh = this.ngay;
      this.studentForm.value.ngaySinh = data.ngaySinh;
      this.link = data.hinhAnh
    })
  }
  titleCase(input:string) {
    var CapitalizeWords = input[0].toUpperCase();
    for (var i = 1; i <= input.length - 1; i++) {
      let currentCharacter,
          previousCharacter = input[i - 1];
      if (previousCharacter && previousCharacter == ' ') {
        currentCharacter = input[i].toUpperCase();
      } else {
        currentCharacter = input[i];
      }
      CapitalizeWords = CapitalizeWords + currentCharacter;
    }
    return CapitalizeWords;
  }
  transform() {
// @ts-ignore
    let url = this.link;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  onchangeday(e:any){
    this.ngay=e.target.value;
  }

  updateStudent() {
    this.studentService.updateStudent({
      id: this.studentForm.value.id,
      ten: this.titleCase(this.studentForm.value.ten),
      diaChi: this.titleCase(this.studentForm.value.diaChi),
      gioiTinh: this.studentForm.value.gioiTinh,
      danToc: this.titleCase(this.studentForm.value.danToc),
      tenBo: this.titleCase(this.studentForm.value.tenBo),
      tenMe: this.titleCase(this.studentForm.value.tenMe),
      tonGiao: this.titleCase(this.studentForm.value.tonGiao),
      sdtBoMe: this.studentForm.value.sdtBoMe,
      hinhAnh: this.link,
      ngaySinh: this.ngay,
      idLop: this.studentForm.value.idLop
    }).subscribe(value => {
      this.dialogRef.close();
      this.snackbar.open("Bạn đã cập nhật thành công", "ok", {duration: 3000})
    }, e => {
      this.snackbar.open("Bạn cập nhật không thành công", "ok", {duration: 3000})
      console.log(e);
    })
  }

  isdisplay: boolean = false

  showPreview(event: any) {
    this.isdisplay = true
    // this.isDisplay = true;
    this.selectedImage = event.target.files[0];
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          // this.lessionForm.patchValue({"fileVideo":url})
          this.isdisplay = false
          this.link = url;
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}


