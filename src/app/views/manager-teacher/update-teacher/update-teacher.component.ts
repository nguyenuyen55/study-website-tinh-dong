import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PhongBan} from "../../../core/model/PhongBan";
import {BangCap} from "../../../core/model/BangCap";
import {finalize} from "rxjs";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentsService} from "../../../core/services/pageManagerStudent/students.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TeacherService} from "../../../core/services/pageManagerTeacher/teacher.service";

@Component({
    selector: 'app-update-teacher',
    templateUrl: './update-teacher.component.html',
    styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {

    constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private teacherService: TeacherService,
                private sanitizer: DomSanitizer,
                private fb: FormBuilder,
                private snackbar: MatSnackBar,
                private dialogRef: MatDialogRef<UpdateTeacherComponent>,) {
    }

    selectedImage: any = null;
    isdisplay: boolean = false;
    link!: string;
    teacherForm!: FormGroup;
    listphongbans: PhongBan[] = [];
    listbangCaps: BangCap[] = [];
    ngay!: string;

    ngOnInit(): void {
        this.teacherService.getAllPhongBan().subscribe((data) => {
            this.listphongbans = data;
        }, error => console.log(error))
        this.teacherService.getAllBangCap().subscribe(data => {

            this.listbangCaps = data;
        }, error => console.log(error))
        this.teacherForm = this.fb.group(
            {
                id: this.data,
                ten: ['', Validators.required],
                diaChi: ['', Validators.required],
                tenDaiHoc: ['', Validators.required],
                ngaySinh: ['', Validators.required],
                email: ['', Validators.required],
                soDienThoai: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
                gioiTinh: ['', Validators.required],
                idBan: ['', Validators.required],
                idBangCap: ['', Validators.required],
                hinhAnh: ['', Validators.required],
            })

        this.teacherService.getTeacherById(this.data).subscribe((data) => {
            console.log(data)
            console.log(data.ngaySinh)
            this.ngay = data.ngaySinh;
            this.link = data.hinhAnh;
            this.teacherForm.patchValue({ten: data.ten});
            this.teacherForm.patchValue({diaChi: data.diaChi});
            this.teacherForm.patchValue({tenDaiHoc: data.tenDaiHoc});
            this.teacherForm.patchValue({email: data.email});
            this.teacherForm.patchValue({soDienThoai: data.soDienThoai});
            this.teacherForm.patchValue({gioiTinh: data.gioiTinh});
            this.teacherForm.patchValue({idBan: data.bangCap.id});
            this.teacherForm.patchValue({idBangCap: data.bangCap.id});
        })
    }

    onchangeday(e: any) {
        this.ngay = e.target.value;
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

    updateTeacher() {
        console.log(this.teacherForm.value);
        this.teacherService.updateTeacher(
            {
                id: this.teacherForm.value.id,
                ten: this.teacherForm.value.ten,
                diaChi: this.teacherForm.value.diaChi,
                tenDaiHoc: this.teacherForm.value.tenDaiHoc,
                ngaySinh: this.ngay,
                email: this.teacherForm.value.email,
                soDienThoai: this.teacherForm.value.soDienThoai,
                gioiTinh: this.teacherForm.value.gioiTinh,
                hinhAnh: this.link,
                idBan: this.teacherForm.value.idBan,
                idBangCap: this.teacherForm.value.idBangCap
            }).subscribe(() => {
            this.dialogRef.close();
            this.snackbar.open("Cập nhật thông tin giáo viên thành công", "ok", {duration: 3000})
        }, error => console.log(error))
    }

    transform() {
// @ts-ignore
        let url = this.link;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    getCurrentDateTime(): string {
        return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
    }

}
