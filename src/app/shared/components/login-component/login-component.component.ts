import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigateByUrl('/app/dashboard');
  }
}
