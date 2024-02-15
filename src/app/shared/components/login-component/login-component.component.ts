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
  studentLoginS: boolean = false;
  adminLoginS: boolean = true;
  teacherLoginS = false;
  parentLogins: boolean = false;
  constructor(private router: Router, private loginSvc: loginService,
    private notificationSvc: NotificationsService) { }
  userDetails: any = [];
  ngOnInit(
  ): void { }

  adminLogin() {
    this.studentLoginS = false;
    this.adminLoginS = true;
    this.teacherLoginS = false;
    this.parentLogins = false;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', [Validators.required])
  })
  login() {
    if (this.loginForm.valid) {
      var email = String(this.loginForm.value.email);
      var password = String(this.loginForm.value.password);
      this.loginSvc.loginGetClick(email, password).subscribe(data => {
        this.userDetails = data;
        if (this.userDetails.token != null) {
          this.loginForm.reset();
          this.loginSvc.storeToken(this.userDetails.token)// temp array // token
          localStorage.setItem('rolename', this.userDetails.role_name);
          localStorage.setItem('userid', this.userDetails.userid);
          this.router.navigateByUrl('/app/dashboard/dashboard');
          this.notificationSvc.success("LOGIN SUCCESSFUL");
        }
        else {
          this.notificationSvc.error("Invalid Email or Password")
          this.router.navigateByUrl('/login');
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }

  studentRegisterFun() {
    window.open('/studentregister', '_blank');
  }


  //------Student LOGIN -------------

  studentLogin() {
    this.studentLoginS = true;
    this.adminLoginS = false;
    this.teacherLoginS = false;
    this.parentLogins = false;
  }

  StudentloginForm = new FormGroup({
    admission_no: new FormControl(''),
    dob: new FormControl('')
  })

  //-----------------Teacher Login ----------------------

  teacherLogin() {
    this.studentLoginS = false;
    this.adminLoginS = false;
    this.teacherLoginS = true;
    this.parentLogins = false;
  }

  teacherLoginForm = new FormGroup({
    staff_no: new FormControl(''),
    dob: new FormControl('')
  });

  teacherMenuLogin() {
    if (this.teacherLoginForm.valid) {
      var staff_no = String(this.teacherLoginForm.value.staff_no);
      var dob = String(this.teacherLoginForm.value.dob);
      this.loginSvc.loginstaffGetClick(staff_no, dob).subscribe(data => {
        debugger;
        this.userDetails = data;
        if (this.userDetails.token != null) {
          this.teacherLoginForm.reset();
          this.loginSvc.storeToken(this.userDetails.token)// temp array // token
          localStorage.setItem('rolename', 'NonAdmin');
          localStorage.setItem('userid', '');
          localStorage.setItem('staff_typeid', this.userDetails.staff_typeid);
          localStorage.setItem('staff_no', this.userDetails.staff_no);
          this.router.navigateByUrl('/app/schedule/schedule');
          this.notificationSvc.success("LOGIN SUCCESSFUL")
        }
        else {
          this.notificationSvc.error("Invalid Staff No or DOB")
          this.router.navigateByUrl('/login');
        }
      });
    }
    else {
      this.teacherLoginForm.markAllAsTouched();
    }
  }

  // ---------- Parent Login

  ParentLogin() {
    this.studentLoginS = false;
    this.adminLoginS = false;
    this.teacherLoginS = false;
    this.parentLogins = true;
  }

  ParentloginForm = new FormGroup({
    admission_no: new FormControl(''),
    f_ph: new FormControl('')
  })

  parentMenuLogin() {
    if (this.ParentloginForm.valid) {
      var admission_no = String(this.ParentloginForm.value.admission_no);
      var f_ph = String(this.ParentloginForm.value.f_ph);
      this.loginSvc.loginParentGetClick(admission_no, f_ph).subscribe(data => {
        debugger;
        this.userDetails = data;
        if (this.userDetails.token != null) {
          this.ParentloginForm.reset();
          this.loginSvc.storeToken(this.userDetails.token)// temp array // token
          localStorage.setItem('rolename', 'Parent');
          localStorage.setItem('userid', '');
          localStorage.setItem('type', 'Parent');
          localStorage.setItem('admission_no', this.userDetails.admission_no);
          this.router.navigateByUrl('/app/schedule/schedule');
          this.notificationSvc.success("LOGIN SUCCESSFUL")
        }
        else {
          this.notificationSvc.error("Invalid admission No or Phone Number")
          this.router.navigateByUrl('/login');
        }
      });
    }
    else {
      this.ParentloginForm.markAllAsTouched();
    }
  }
}