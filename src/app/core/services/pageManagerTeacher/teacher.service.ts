import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../pagelogin/auth.service";
import {Observable, Observer} from "rxjs";
import {PhongBan} from "../../model/PhongBan";
import {GiaoVien} from "../../model/GiaoVien";
import {BangCap} from "../../model/BangCap";
import {GiaoVienDTO} from "../../dto/GiaoVienDTO";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  private readonly api = 'http://localhost:8080/api';

  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.JWT
  })

  //get all phong ban
  getAllPhongBan(): Observable<PhongBan[]> {
    return this.httpClient.get<PhongBan[]>(this.api + '/phongbans');
  }

  //get all bang cap
  getAllBangCap(): Observable<BangCap[]> {
    return this.httpClient.get<BangCap[]>(this.api + '/bangcaps');
  }

  //search teacher
  searchByName(name: string): Observable<GiaoVien[]> {
    return this.httpClient.get<GiaoVien[]>(this.api + '/teacher/search?name=' + name);
  }

  searchByPhongBan(idphong: number): Observable<GiaoVien[]> {
    return this.httpClient.get<GiaoVien[]>(this.api + '/teacher/search?idBan=' + idphong);
  }

  searchByNameAndPhongBan(idphong: number, name: string): Observable<GiaoVien[]> {
    return this.httpClient.get<GiaoVien[]>(this.api + '/teacher/search?name=' + name + '&idBan=' + idphong);
  }

  //create teacher
  createTeacher(giaoVien: GiaoVienDTO) {
    return this.httpClient.post(this.api + '/teacher/create', giaoVien, {headers: this.headers})
  }

  getTeacherById(id: string): Observable<GiaoVien> {
    return this.httpClient.get<GiaoVien>(this.api + '/teacher/detail/' + id, {headers: this.headers})
  }

  //delete
  deleteById(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.api + '/teacher/delete/' + id, {headers: this.headers})
  }

//update teacher
  updateTeacher(data: any) {
    return this.httpClient.put(this.api + '/teacher/update', data, {headers: this.headers})
  }

}
