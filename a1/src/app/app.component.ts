import { Component } from '@angular/core';
import { AuthService } from './modules/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'a1';

  constructor(private authService: AuthService, private router: Router) {

  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isLoggedOut(): boolean {
    return !this.authService.isLoggedIn;
  }

  get username(): string {
    return this.authService.currentUser;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

