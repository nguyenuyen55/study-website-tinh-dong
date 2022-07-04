import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChiTietThoiKhoaBieu} from "../../model/ChiTietThoiKhoaBieu";
import {AuthService} from "../pagelogin/auth.service";
import {ThoiKhoaBieuDTO} from "../../dto/ThoiKhoaBieuDTO";
import {ThoiKhoaBieuCreateDTO} from "../../dto/ThoiKhoaBieuCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class TabletimeService {
  private readonly api = 'http://localhost:8080/api';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.JWT
  })

  getidlopByIdTeacher(id: string): Observable<number> {
    return this.http.get<number>(this.api + "/lop/" + id);
  }

  // update thoi khoa bieu
  updateTimeTable(thoikhoabieu: ThoiKhoaBieuDTO[]) {
    return this.http.post(this.api + '/tb/update', thoikhoabieu, {headers: this.headers})
  }

// create thoi khoa bieu
  createTimeTable(thoikhoabieu: ThoiKhoaBieuCreateDTO[],idlop:number) {
    return this.http.put(this.api + '/tb/create/'+idlop, thoikhoabieu, {headers: this.headers})
  }
}
