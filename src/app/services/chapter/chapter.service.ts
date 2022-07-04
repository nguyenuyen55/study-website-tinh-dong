import { ChuongHoc } from './../../core/model/ChuongHoc';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, pipe} from 'rxjs';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiChapterBySubject = 'http://localhost:8080/api/chuonghoc/';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private httpClient:HttpClient) { }

  getAllChapterBySubject(id: string):Observable<ChuongHoc[]>{
    return this.httpClient.get<ChuongHoc[]>(apiChapterBySubject + id).pipe();
  }
}
