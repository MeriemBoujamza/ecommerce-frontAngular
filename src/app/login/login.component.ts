import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(dataForm) {
    console.log(dataForm.username, dataForm.password);
    this.authService.login(dataForm.username, dataForm.password);

    if (this.authService.authenticated) {
      //  this.caddyService.loadCaddyFromLocalStorage();
      this.authService.saveAuthenticatedUser();
      this.router.navigateByUrl('');
    }
  }
}
