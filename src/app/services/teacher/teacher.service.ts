import { CauHoi } from '../../core/model/CauHoi';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, pipe} from 'rxjs';
import { GiaoVien } from 'src/app/core/model/GiaoVien';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const urlSearchName = 'http://localhost:8080/api/teacher/search?name=';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient:HttpClient) { }
  getTeacherByName(name: string): Observable<GiaoVien[]>{
    return this.httpClient.get<GiaoVien[]>(urlSearchName + name).pipe();
  }
}
