import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../pagelogin/auth.service";
import {LopGiaoVienReponse} from "../../dto/LopGiaoVienReponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly api = 'http://localhost:8080/api';
  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +this.JWT
  })
  constructor(private httpClient:HttpClient,
              private authService:AuthService) { }

  upClassByidlop(object:any){
    return this.httpClient.post(this.api+'/lop/updateLopHocSinh',object,{headers:this.headers});
  }

  createClass(object :any){
    return this.httpClient.post(this.api+'/lop/create',object,{headers:this.headers})
  }

  getClassById(id:number):Observable<any>{
    return this.httpClient.get<any>(this.api+'/monhoc/detail/'+id,{headers:this.headers})
  }
}
