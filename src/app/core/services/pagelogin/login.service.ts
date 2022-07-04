import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "../../dto/loginRequest";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly api = 'http://localhost:8080/api';
  private readonly JWT = this.authService.getToken() || "";
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' +this.JWT
  })
  constructor(
    private httpClient: HttpClient,private authService:AuthService
  ) {
  }

  login(loginRequest: LoginRequest) {
    return this.httpClient.post(this.api + '/login', loginRequest)
  }
  listStudent(){
    return this.httpClient.get(this.api + '/cauhoi/list',{headers: this.headers})
  }
}
