import {CauHoi} from './../../core/model/CauHoi';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ChuDe} from 'src/app/core/model/ChuDe';
import {QuestionService} from 'src/app/services/question/question.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  listTheme: ChuDe[] = [];

  constructor(private _questionService: QuestionService,private snackbar:MatSnackBar) {
  }

  currentItem = {
    title: 'Thanh cong !!!',
    message: 'Ready to pour… the Font Awesome 6 Beta!',
    type: 'success',
    duration: 3000,
  };


  ngOnInit(): void {
    this._questionService.getAllTheme()
      .subscribe(response => {
        this.listTheme.push(...response);
      });
  }

  form = new FormGroup({
    theme: new FormControl(),
    name: new FormControl(),
    gmail: new FormControl(),
    title: new FormControl(),
    phone: new FormControl(),
    content: new FormControl()
  });

  handlerAddQuestion() {
    this._questionService.addQuestion({
      noiDung: this.form.value.content,
      hoTen: this.form.value.name,
      email: this.form.value.gmail,
      phone: this.form.value.phone,
      tieuDe: this.form.value.title,
      idChuDe: this.form.value.theme,
    }).subscribe(response => {
      this.snackbar.open("Gửi câu hỏi thành công","ok",{duration:3000})
      this.form.reset();
      console.log(response);
    });
  }

  btnAddQuestionClick() {
    document.querySelector(".question-button button")?.classList.add("btn-search-active");
  }

  btnRemoveQuestionClick() {
    document.querySelector(".question-button button")?.classList.remove("btn-search-active");
  }
}
