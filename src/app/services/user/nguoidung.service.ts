import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PasswordDTO} from "../../core/dto/PasswordDTO";

@Injectable({
  providedIn: 'root'
})
export class NguoidungService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly api = "https://website-truong-tieu-hoc.herokuapp.com/api/change-password";
  // private readonly api = "http://localhost:8080/api/change-password";

  changepasswordUser(passwordDTO: PasswordDTO) {
    return this.httpClient.put(this.api, passwordDTO)
  }
}
