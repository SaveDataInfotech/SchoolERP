import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../api-service/Dialog.service';
import { NotificationsService } from 'angular2-notifications';
import { userProfileService } from '../api-service/userProfile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  UsersList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  public showPassword: boolean;
  public showPasswordOnPress: boolean;

  constructor(
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private userSvc: userProfileService
  ) { }

  ngOnInit(): void {
    this.cancelClick();
    this.getMaxId();
    this.refreshsUsersList();
  }


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  userProfileForm = new FormGroup({
    userid: new FormControl(0),
    user_name: new FormControl(''),
    role_name: new FormControl(''),
    staff_no: new FormControl(),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl(''),
    c_password: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshsUsersList() {
    this.userSvc.getUsersList().subscribe(data => {
      this.UsersList = data;
      console.log(this.UsersList)
    });
  }

  getMaxId() {
    this.userSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }


  newUserProfile() {
    if (this.userProfileForm.value.password == this.userProfileForm.value.c_password) {
      if (this.userProfileForm.valid) {
        if (this.userProfileForm.value.userid == 0) {
          this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
            .afterClosed().subscribe(res => {
              if (res == true) {
                var userInsert = (this.userProfileForm.value);
                this.userSvc.newUserProfile(userInsert).subscribe(res => {
                  debugger;
                  if (res.status == 'Saved successfully') {
                    this.notificationSvc.success("Saved Success")
                    this.refreshsUsersList();
                    this.getMaxId();
                    this.cancelClick();
                  }
                  else if (res.status == 'User exists') {
                    this.notificationSvc.error("User alredy exists")
                  }
                  else if (res.status == 'Email exists') {
                    this.notificationSvc.error("Email alredy exists")
                  }
                  else {
                    this.notificationSvc.error("Something error")
                  }
                });
              }
            });
        }
        else if (this.userProfileForm.value.userid != 0) {
          this.DialogSvc.openConfirmDialog('Are you sure want to update this record ?')
            .afterClosed().subscribe(res => {
              if (res == true) {
                var userInsert = (this.userProfileForm.value);
                this.userSvc.newUserProfile(userInsert).subscribe(res => {
                  if (res.status == 'Saved successfully') {
                    this.notificationSvc.success("Updated Success")
                    this.refreshsUsersList();
                    this.getMaxId();
                    this.cancelClick();
                  }
                  else if (res.status == 'User exists') {
                    this.notificationSvc.error("User alredy exists")
                  }
                  else if (res.status == 'Email exists') {
                    this.notificationSvc.error("Email alredy exists")
                  }
                  else {
                    this.notificationSvc.error("Something error")
                  }
                });
              }
            });
        }
      }
      else {
        this.userProfileForm.markAllAsTouched();
      }
    }
    else {
      this.notificationSvc.error("Password and Confirm password must be same")
    }
  }


  deleteClick(userid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.userSvc.deleteuser(userid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.cancelClick();
              this.getMaxId();
              this.refreshsUsersList();
            }
          });
        }
      });
  }

  updateGetClick(user: any) {
    this.userProfileForm.get('userid')?.setValue(user.userid);
    this.userProfileForm.get('user_name')?.setValue(user.user_name);
    this.userProfileForm.get('role_name')?.setValue(user.role_name);
    this.userProfileForm.get('staff_no')?.setValue(user.staff_no);
    this.userProfileForm.get('phone')?.setValue(user.phone);
    this.userProfileForm.get('email')?.setValue(user.email);
    this.userProfileForm.get('password')?.setValue(user.password);
    this.userProfileForm.get('c_password')?.setValue(user.password);
    this.userProfileForm.get('cuid')?.setValue(user.cuid);
    this.buttonId = false;
  }


  cancelClick() {
    this.userProfileForm.reset();
    this.userProfileForm.get('role_name')?.setValue('');
    this.buttonId = true;
  }

}
