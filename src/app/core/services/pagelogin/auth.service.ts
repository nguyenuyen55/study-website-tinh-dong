import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string = '';

  constructor() {
  }

  public setUser(username: string) {
    localStorage.setItem('username', username);
  }

  public getUser() {
    return localStorage.getItem('username');
  }

  public saveUserId(userId: string) {
    localStorage.setItem('userID', userId);
  }

  public getUserId() {
    return localStorage.getItem('userID');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }

  public setRole(role: string) {
    localStorage.setItem("role", role)
  }

  public getRole() {
    return localStorage.getItem('role')
  }

  public isAdmin() {
    return this.getRole() == 'ROLE_ADMIN'
  }
  public isTeacher() {
    return this.getRole() == 'ROLE_TEACHER'
  }
  public isUser() {
    return this.getRole() == 'ROLE_STUDENT'
  }
  public isAuthenticated() {
    return (this.getUser() != null);
  }
}
