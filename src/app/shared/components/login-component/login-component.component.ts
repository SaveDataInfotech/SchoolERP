import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { loginService } from 'src/app/api-service/login.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private router: Router,private loginSvc:loginService,
    private notificationSvc: NotificationsService) { }
    userDetails:any=[];
  ngOnInit(
    
  ): void {}

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('',[Validators.required])
  })
  login() {
    if(this.loginForm.valid){    
    var email = String(this.loginForm.value.email);
    var password = String(this.loginForm.value.password);
    this.loginSvc.loginGetClick(email,password).subscribe(data => {
      
        this.userDetails = data;
        if(this.userDetails[0] != null && this.userDetails[0].user_name != null && this.userDetails[0].role_name != null && this.userDetails[0] != undefined){
          this.loginForm.reset();
          this.loginSvc.storeToken(this.userDetails[0].role_name)// temp array // token
          localStorage.setItem('rolename',this.userDetails[0].role_name);
          localStorage.setItem('staffid',this.userDetails[0].staff_no);
          this.router.navigateByUrl('/app/dashboard/dashboard');
          this.notificationSvc.success("LOGIN SUCCESSFUL")
        }
        else{          
          this.notificationSvc.error("Invalid Email or Password")         
         this.router.navigateByUrl('/login');
        }
      });
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
}


