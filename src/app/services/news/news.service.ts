import {TinTuc} from './../../core/model/TinTuc';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, pipe} from 'rxjs';
import {AuthService} from "../../core/services/pagelogin/auth.service";
import {TinTucCreate} from "../../core/dto/TinTucCreate";
import {ImageDTO} from "../../core/dto/imageDTO";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
}
const apiUrl = 'http://localhost:8080/api/listNew';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  private readonly api = 'http://localhost:8080/api';

  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.JWT
  })

  getAllNews(): Observable<TinTuc[]> {
    return this.httpClient.get<TinTuc[]>(apiUrl).pipe();
  }

  getTinTucById(id: number): Observable<TinTuc> {
    return this.httpClient.get<TinTuc>(apiUrl + '/' + id);
  }

  deleteById(id: number) {
    return this.httpClient.delete(apiUrl + '/delete/' + id, {headers: this.headers});
  }

  create(data: { noiDung: any; imageList: ImageDTO[][]; tieuDe: any }){
    return this.httpClient.post(apiUrl + '/create' , data, {headers: this.headers});
  }

  updatetin(data:{ id: any,noiDung: any; imageList: ImageDTO[][]; tieuDe: any }){
    console.log(data)
    return this.httpClient.put('http://localhost:8080/api/listNew/update' , data, {headers: this.headers});
  }
}
