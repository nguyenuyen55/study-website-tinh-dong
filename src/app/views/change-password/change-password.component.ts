import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NguoidungService} from "../../services/user/nguoidung.service";
import {AuthService} from "../../core/services/pagelogin/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private nguoidungService:NguoidungService,
              private authService:AuthService,
              private snackbar:MatSnackBar,
              private router:Router) {
  }

  formpass!: FormGroup;

  ngOnInit(): void {
    this.formpass = this.fb.group({
      passwordold: ['', Validators.required],
      password: ['', Validators.required],
      comfirmPassword: ['', Validators.required]
    })

  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.confirmPassword) ?
      null : {
        passwordnotmatch: true
      };
  }

  isdisplay = false;
  isdisplayerror = false;

  checkpass() {
   this.isdisplay = false;
    if (this.formpass.value.password != this.formpass.value.comfirmPassword) {
      this.isdisplay = true;
    }
  }

  changePassword() {
    let objec={
      passwordold:this.formpass.value.passwordold,
      passwornew:this.formpass.value.password,
      username:this.authService.getUser(),
    }

   this.nguoidungService.changepasswordUser({
     passwordold:this.formpass.value.passwordold,
     passwornew:this.formpass.value.password,
     username:this.authService.getUser(),
   }).subscribe((data)=>{
     this.isdisplayerror=false;
     this.snackbar.open("Cập nhật mật khẩu thành công vui lòng đăng nhập lại","OK",{
       duration:3000
     });
     localStorage.clear()
     this.router.navigateByUrl("/login") .then(() => {
       window.location.reload();
     });

   },error => this.isdisplayerror=true)

  }
}
