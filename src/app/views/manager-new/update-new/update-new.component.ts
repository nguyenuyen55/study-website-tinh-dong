import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NewsService} from "../../../services/news/news.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageDTO} from "../../../core/dto/imageDTO";
import {finalize} from "rxjs";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-new',
  templateUrl: './update-new.component.html',
  styleUrls: ['./update-new.component.scss']
})
export class UpdateNewComponent implements OnInit {
  constructor(private fb: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private tintucService: NewsService,
              private snackbar: MatSnackBar,
              private router: Router) {

    // @ts-ignore
    this.idnew = this.router.getCurrentNavigation().extras.state.idnew;
  }

  idnew: number = 0;
  formnew!: FormGroup;

  ngOnInit(): void {
    this.formnew = this.fb.group({
      id: this.idnew,
      tieuDe: ['', Validators.required],
      noiDung: ['', Validators.required],
      images: ['', Validators.required]
    })
    this.tintucService.getTinTucById(this.idnew).subscribe((data => {
      this.formnew.patchValue({tieuDe: data.tieuDe});
      this.formnew.patchValue({noiDung: data.noiDung});
      for (let imag of data.images) {
        this.files.push({link: imag.linkimage})
      }
    }))

  }

  selectedImage!: any;
  files: ImageDTO[] = [];
  listimages!: any[];
  displayError!: boolean;

  showPreview(event: any) {
   this.files = []
    // this.isDisplay = true;
    this.listimages = event.target.files;
    for (let img of this.listimages) {
      const nameImg = this.getCurrentDateTime() + img.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, img).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formnew.patchValue({images: "hihi"})
            console.log(url)
            // this.lessionForm.patchValue({"fileVideo":url})
            this.files.push({link: url});
          });
        })
      ).subscribe();
    }
    console.log(this.files)
    if (this.files.length == 0) {
      console.log(this.files.length)
      this.displayError = true;
    } else {
      console.log(this.files.length)
      this.displayError = false;
    }
  }

  updateNew() {

    let a: any = {
      id: this.idnew,
      tieuDe: this.formnew.value.tieuDe,
      noiDung: this.formnew.value.noiDung,
      imageList: this.files
    }
    console.log(a)
    this.tintucService.updatetin(a).subscribe((data) => {
      console.log(data)
      this.snackbar.open("Bạn đã cập nhật thành công", "Ok", {duration: 3000})
    }, error => {
      console.log(error);
      this.snackbar.open("Bạn cập nhật không thành công", "Ok", {duration: 3000})
    })
  }


  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
