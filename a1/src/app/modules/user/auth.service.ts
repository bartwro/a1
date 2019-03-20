import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: string;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor() { }

  login(login: string, pass: string): void {
    this.currentUser = login;
  }

  logout(): void {
    this.currentUser = null;
  }
}
