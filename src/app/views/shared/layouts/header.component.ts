import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../core/services/pagelogin/auth.service";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  favourite = true;
  img: string = 'assets/images/public/logo.png';
  public href: string = "";
  public active = "";
  username: string | null ='a';
  isAdmin: boolean = false;
  isTeacher: boolean = false;
  isUser: boolean = false;
  isAuth: boolean = false;

  constructor(private Location: Location, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.href = this.Location.path();
    this.active = this.href.slice(1);
    this.username = this.auth.getUser();
    this.isAdmin=this.auth.isAdmin();
    this.isTeacher=this.auth.isTeacher();
    this.isUser=this.auth.isUser();
    this.isAuth=this.auth.isAuthenticated();

  }
  handlerClickNavbar = (e: any) => {
    this.active = e.target.id;
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl("/login") .then(() => {
      window.location.reload();
    });
    this.username = '';
  }
}
