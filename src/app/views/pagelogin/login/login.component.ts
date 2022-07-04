import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../core/services/pagelogin/login.service";
import {AuthService} from "../../../core/services/pagelogin/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  error!:string;
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private auth: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.error="";
    this.loginService.login(this.myForm.value).subscribe(
      (data:any) =>
      {
        this.auth.setUser(data.username);
        this.auth.setToken(data.accessToken);
        this.auth.setRole(data.authorities);

          this.router.navigate(["/home"], {replaceUrl: true}) .then(() => {
            window.location.reload();
          });;

      }
    ,error => this.error="Mật khẩu hoặc tên đăng nhập bị sai" );
  }
}
