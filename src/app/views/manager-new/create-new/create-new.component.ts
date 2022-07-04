import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NewsService} from "../../../services/news/news.service";
import {ImageDTO} from "../../../core/dto/imageDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {

  constructor(private fb: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private tintucService: NewsService,
              private snackbar:MatSnackBar) {
  }

  formnew!: FormGroup;

  ngOnInit(): void {
    this.formnew = this.fb.group({
      tieuDe: ['', Validators.required],
      noiDung: ['', Validators.required],
      images: ['', Validators.required]
    })
  }

  selectedImage!: any;
  files: ImageDTO[] = [];
  listimages!: any[];
  displayError!: boolean;

  showPreview(event: any) {
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

  createNew() {
    let a: any = {
      tieuDe: this.formnew.value.tieuDe,
      noiDung: this.formnew.value.noiDung,
      imageList: this.files
    }
    console.log(a)
    this.tintucService.create(a).subscribe(() => {
      this.snackbar.open("Bạn đã thêm mới thành công","Ok",{duration:3000})
    },error => {
      console.log(error)
      this.snackbar.open("Bạn đã thêm mới thành công","Ok",{duration:3000})
    })
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
