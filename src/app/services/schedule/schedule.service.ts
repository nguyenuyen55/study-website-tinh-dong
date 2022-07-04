import { CauHoi } from '../../core/model/CauHoi';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, pipe} from 'rxjs';
import { Lop } from 'src/app/core/model/Lop';
import { Khoi } from 'src/app/core/model/Khoi';
import { ChiTietThoiKhoaBieu } from 'src/app/core/model/ChiTietThoiKhoaBieu';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const urlLop = 'http://localhost:8080/api/lop/khoi/';
const urlKhoi = "http://localhost:8080/api/khoi";
const urlTkb = "http://localhost:8080/api/tb?lop="

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient:HttpClient) { }
  getAllBlock():Observable<Khoi[]>{
    return this.httpClient.get<Khoi[]>(urlKhoi).pipe();
  }
  getListClassByID(id: number):Observable<Lop[]>{
    return this.httpClient.get<Lop[]>(urlLop + id).pipe();
  }

  getListScheduleByID(id: number):Observable<ChiTietThoiKhoaBieu[]>{
    return this.httpClient.get<ChiTietThoiKhoaBieu[]>(urlTkb + id).pipe();
  }

}
