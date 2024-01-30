import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';
import { staffMenusService } from 'src/app/api-service/staffmenus.service';
import { LayoutComponent } from 'src/app/layout/layout.component';


@Component({
  selector: 'app-staff-login-menus',
  templateUrl: './staff-login-menus.component.html',
  styleUrls: ['./staff-login-menus.component.scss']
})
export class StaffLoginMenusComponent implements OnInit {
  menu: any[] = [];
  StaffTypeList: any[] = [];
  StaffMenuList: any[] = [];
  userID: number = Number(localStorage.getItem("userid"));
  constructor(
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private staffMSvc: staffMenusService,
    private lSvc: LayoutComponent,
    private SttySvc: staffTypeService,
  ) { }

  ngOnInit(): void {
    this.cancelClick();
    this.refreshstaffTypeList();
    this.refreshstaffMenusList();
    this.menu = this.lSvc.AdminmenuSidebar;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  toggleSubMenu(mainMenu) {
    for (const subMenu of mainMenu.sub_menu) {
      subMenu.isselect = mainMenu.isselect;
    }
  }

  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }

  refreshstaffMenusList() {
    this.staffMSvc.getstaffmenuList().subscribe(data => {
      this.StaffMenuList = data;
    });
  }

  staffMenuForm = new FormGroup({
    stafftypemenuid: new FormControl(0),
    staff_typeid: new FormControl(0),
    main_menu: new FormControl([]),
    sub_menu: new FormControl([]),
    cuid: new FormControl(this.userID),
  });

  newStaffMenus() {
    debugger;
    const mainMenuWithSelect = [];
    const subMenuWithSelect = [];

    this.menu.forEach(menu => {
      if (menu.isselect) {
        mainMenuWithSelect.push(String(menu.value));
      }

      menu.sub_menu.forEach(submenu => {
        if (submenu.isselect) {
          subMenuWithSelect.push(String(submenu.value));
        }
      });
    });

    this.staffMenuForm.get('main_menu')?.setValue(mainMenuWithSelect);
    this.staffMenuForm.get('sub_menu')?.setValue(subMenuWithSelect);

    if (this.staffMenuForm.valid) {
      if (this.staffMenuForm.value.stafftypemenuid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var userInsert = (this.staffMenuForm.value);
              this.staffMSvc.newStaffMenu(userInsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.cancelClick();
                }
                else if (res.status == 'staff exists') {
                  this.notificationSvc.error("Alredy exists")
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else if (this.staffMenuForm.value.stafftypemenuid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to update this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var userInsert = (this.staffMenuForm.value);
              this.staffMSvc.newStaffMenu(userInsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.cancelClick();
                }
                else if (res.status == 'staff exists') {
                  this.notificationSvc.error("Alredy exists")
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
      this.staffMenuForm.markAllAsTouched();
    }
  }


  deleteClick(userid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.staffMSvc.deleteuser(userid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.cancelClick();
            }
          });
        }
      });
  }

  updateGetClick(user: any) {
    this.menu = this.lSvc.AdminmenuSidebar;
    this.staffMenuForm.get('stafftypemenuid')?.setValue(user.stafftypemenuid);
    this.staffMenuForm.get('staff_typeid')?.setValue(user.staff_typeid);
    this.staffMenuForm.get('cuid')?.setValue(this.userID);

    const updatedMenu = this.lSvc.AdminmenuSidebar.map(menu => {
      const isSelected = user.main_menus.includes(menu.value);
      const updatedSubMenu = menu.sub_menu.map(submenu => {
        return { ...submenu, isselect: user.sub_menus.includes(submenu.value) };
      });

      return { ...menu, isselect: isSelected, sub_menu: updatedSubMenu };
    });
    this.menu = updatedMenu
  }

  cancelClick() {
    this.menu = this.lSvc.AdminmenuSidebar;
    this.staffMenuForm.reset();
    this.staffMenuForm.get('stafftypemenuid')?.setValue(0);
    this.staffMenuForm.get('staff_typeid')?.setValue(0);
    this.staffMenuForm.get('cuid')?.setValue(this.userID);
    this.refreshstaffMenusList();
  }

}
