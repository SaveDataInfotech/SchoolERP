import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { RoleService } from 'src/app/api-service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  RoleList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  constructor(
    private roleSvc: RoleService, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService) {
  }
  ngOnInit(): void {
    this.refreshRoleList(),
      this.getMaxId(),
      this.cancelClick()
  }

  roleForm = new FormGroup({
    roleid: new FormControl(0),
    role_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+)$/)]),
    cuid: new FormControl(1),
  })

  refreshRoleList() {
    this.roleSvc.getRoleList().subscribe(data => {
      this.RoleList = data;
    });
  }

  roleSubmit() {
    if (this.roleForm.valid) {
      if (this.roleForm.value.roleid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var roleinsert = (this.roleForm.value);
              this.roleSvc.addNewRole(roleinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshRoleList();
                  this.getMaxId();
                  this.cancelClick();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists")
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else if (this.roleForm.value.roleid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var roleinsert = (this.roleForm.value);
              this.roleSvc.addNewRole(roleinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshRoleList();
                  this.getMaxId();
                  this.cancelClick();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists")
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else {
        alert("something error;")
      }
    }
    else {
      this.roleForm.markAllAsTouched();
    }

  }

  getMaxId() {
    this.roleSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(roleid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.roleSvc.deleteRole(roleid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshRoleList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  updateGetClick(role: any) {
    this.roleForm.get('roleid')?.setValue(role.roleid);
    this.roleForm.get('role_name')?.setValue(role.role_name);
    this.roleForm.get('cuid')?.setValue(role.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.roleForm.reset();
    this.roleForm.get('roleid')?.setValue(0);
    this.roleForm.get('role_name')?.setValue('');
    this.roleForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }
}
