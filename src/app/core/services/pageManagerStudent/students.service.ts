import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../pagelogin/auth.service";
import {Observable} from "rxjs";
import {CauHoi} from "../../model/CauHoi";
import {NamHoc} from "../../model/NamHoc";
import {Lop} from "../../model/Lop";
import {LopHocSinhReponse} from "../../dto/LopHocSinhReponse";
import {StudentDTO} from "../../dto/StudentDTO";
import {HocSinh} from "../../model/hocSinh";
import {GiaoVien} from "../../model/GiaoVien";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private readonly api = 'http://localhost:8080/api';

  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +this.JWT
  })
  constructor(private httpClient:HttpClient,
              private authService:AuthService) { }

  //get list nam hoc
  getListNameHoc(): Observable<NamHoc[]> {
    return this.httpClient.get<NamHoc[]>(this.api+'/namhocs');
  }
//get lop by nam hoc and khoi
  getListLopNameHocAndKhoi(idkhoi:number,idnamhoc:number): Observable<Lop[]> {
    return this.httpClient.get<Lop[]>(this.api+'/lop/listlop?idkhoi='+idkhoi+'&idnamhoc='+idnamhoc);
  }
  getListLopNameHocAndKhoiThoiKhoaBieu(idkhoi:number,idnamhoc:number): Observable<Lop[]> {
    return this.httpClient.get<Lop[]>(this.api+'/lop/listlop/thoikhoabieu?idkhoi='+idkhoi+'&idnamhoc='+idnamhoc);
  }

  //get list hoc sinh
  getListHocSinhbyidlop(idlop:number,): Observable<LopHocSinhReponse> {
    return this.httpClient.get<LopHocSinhReponse>(this.api+'/student/listbyidlop/'+idlop,{headers:this.headers});
  }
  //create
  createStudent(student:StudentDTO){
    return this.httpClient.post(this.api+'/student/create',student,{headers:this.headers});
  }
  getStudentByid(idhs:string):Observable<HocSinh>{
    return this.httpClient.get<HocSinh>(this.api+'/student/detail/'+idhs,{headers:this.headers});
  }
  //delete
  deleteById(id:string):Observable<boolean>{
    return this.httpClient.delete<boolean>(this.api+'/student/delete/'+id,{headers:this.headers})
  }
//update student
  updateStudent(student:any){
    return this.httpClient.put<any>(this.api+'/student/update/',student,{headers:this.headers})
  }

  //get list gv
  getListGV():Observable<GiaoVien[]>{
  return this.httpClient.get<GiaoVien[]>(this.api+'/teacher/list')
  }

  updateTeacher(data:any){
    return this.httpClient.post<any>(this.api+'/lop/updatelop',data,{headers:this.headers})
  }


  exportHs(idgv:string){
    return this.httpClient.get(this.api+'/exportPdf/'+idgv);
  }
}
