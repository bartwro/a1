import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  get formControls() {
    return this.loginForm.controls;
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {

    console.log('this.formBuilder: ' + this.formBuilder);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const user = this.formControls.username.value;
    const pass = this.formControls.password.value;
    this.authService.login(user, pass);
    const targetUrl = this.authService.redirectUrl;
    this.authService.redirectUrl = null;
    if (targetUrl) {
      this.router.navigateByUrl(targetUrl);
    } else {
      this.router.navigate(['/']);
    }
  }

}
