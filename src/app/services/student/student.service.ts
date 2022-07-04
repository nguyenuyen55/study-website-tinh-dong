import { HocSinh } from './../../core/model/hocSinh';
import { CauHoi } from '../../core/model/CauHoi';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, pipe} from 'rxjs';
import {HocSinhSearchDTO} from "../../core/dto/HocSinhSearchDTO";

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const urlSearchId = 'http://localhost:8080/api/student/search?name=';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient:HttpClient) { }
  getStudentByName(name: string): Observable<HocSinhSearchDTO[]>{
    return this.httpClient.get<HocSinhSearchDTO[]>(urlSearchId + name).pipe();
  }
}
