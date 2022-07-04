import {CauHoi} from '../../core/model/CauHoi';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, pipe} from 'rxjs';
import {MonHoc} from 'src/app/core/model/MonHoc';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
}
const urlGetSubjectFromblock = 'http://localhost:8080/api/monhoc/';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient) {
  }

  getSubjectbyBlock(id: number): Observable<MonHoc[]> {
    return this.httpClient.get<MonHoc[]>(urlGetSubjectFromblock + id).pipe();
  }

}
