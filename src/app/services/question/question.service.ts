import { CauHoi } from './../../core/model/CauHoi';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, pipe} from 'rxjs';
import { ChuDe } from 'src/app/core/model/ChuDe';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'http://localhost:8080/api/questions/chude';
const postUrl = "http://localhost:8080/api/questions/create";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient:HttpClient) { }

  getAllTheme():Observable<ChuDe[]>{
    return this.httpClient.get<ChuDe[]>(apiUrl).pipe();
  }
  /** POST: add a new hero to the database */
  addQuestion(question: CauHoi): Observable<CauHoi> {
  return this.httpClient.post<CauHoi>(postUrl, question, httpOptions)
    .pipe();
}
}
