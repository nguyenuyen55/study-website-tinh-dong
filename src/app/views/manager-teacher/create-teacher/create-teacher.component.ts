import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {PhongBan} from "../../../core/model/PhongBan";
import {TeacherService} from "../../../core/services/pageManagerTeacher/teacher.service";
import {BangCap} from "../../../core/model/BangCap";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private teacherService: TeacherService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateTeacherComponent>,
              private snackbar: MatSnackBar) {
  }

  selectedImage: any = null;
  isdisplay: boolean = false
  link!: string;
  teacherForm!: FormGroup;
  listphongbans: PhongBan[] = [];
  listbangCaps: BangCap[] = [];

  ngOnInit(): void {
    this.teacherService.getAllPhongBan().subscribe((data) => {
      console.log(data)
      this.listphongbans = data;
    }, error => console.log(error))
    this.teacherService.getAllBangCap().subscribe((data) => {
      console.log(data)
      this.listbangCaps = data;
    }, error => console.log(error))
    this.teacherForm = this.fb.group(
      {
        ten: ['', Validators.required],
        diaChi: ['', Validators.required],
        tenDaiHoc: ['', Validators.required],
        ngaySinh: ['', Validators.required],
        email: ['', Validators.required],
        soDienThoai: ['', [Validators.required,Validators.pattern("[0-9]{10}")]],
        gioiTinh: ['', Validators.required],
        idBan: ['', Validators.required],
        idBangCap: ['', Validators.required],
        hinhAnh: ['', Validators.required],
      })
  }


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

  createTeacher() {

    this.teacherService.createTeacher({
      ten: this.teacherForm.value.ten,
      diaChi: this.teacherForm.value.diaChi,
      tenDaiHoc: this.teacherForm.value.tenDaiHoc,
      ngaySinh: this.teacherForm.value.ngaySinh,
      email: this.teacherForm.value.email,
      soDienThoai: this.teacherForm.value.soDienThoai,
      gioiTinh: this.teacherForm.value.gioiTinh,
      hinhAnh: this.link,
      idBan: this.teacherForm.value.idBan,
      idBangCap: this.teacherForm.value.idBangCap
    }).subscribe(() => {
      this.dialogRef.close();
      this.snackbar.open("Thêm giáo viên thành công", "ok", {duration: 3000})
    },() => {
      this.dialogRef.close();
      this.snackbar.open("Thêm giáo viên không thành công ", "ok", {duration: 3000})  })
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
