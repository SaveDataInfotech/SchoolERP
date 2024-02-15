import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { parentStudentMenuService } from 'src/app/api-service/parentStudentMenus.service';
import { LayoutComponent } from 'src/app/layout/layout.component';


@Component({
  selector: 'app-parent-menus',
  templateUrl: './parent-menus.component.html',
  styleUrls: ['./parent-menus.component.scss']
})
export class ParentMenusComponent implements OnInit {

  menu: any[] = [];
  StaffMenuList: any[] = [];
  userID: number = Number(localStorage.getItem("userid"));
  constructor(
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private pSMSvc: parentStudentMenuService,
    private lSvc: LayoutComponent,
  ) { }

  ngOnInit(): void {
    this.cancelClick();
    this.refreshMenusList();
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

  refreshMenusList() {
    this.pSMSvc.getmenuList().subscribe(data => {
      this.StaffMenuList = data;
    });
  }

  staffMenuForm = new FormGroup({
    menuid: new FormControl(0),
    l_type: new FormControl(''),
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
      if (this.staffMenuForm.value.menuid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var userInsert = (this.staffMenuForm.value);
              this.pSMSvc.newMenu(userInsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.cancelClick();
                }
                else if (res.status == 'Alredy exists') {
                  this.notificationSvc.error("Alredy exists")
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else if (this.staffMenuForm.value.menuid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to update this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var userInsert = (this.staffMenuForm.value);
              this.pSMSvc.newMenu(userInsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.cancelClick();
                }
                else if (res.status == 'Alredy exists') {
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
          this.pSMSvc.deleteuser(userid).subscribe(res => {
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
    this.staffMenuForm.get('menuid')?.setValue(user.menuid);
    this.staffMenuForm.get('l_type')?.setValue(user.l_type);
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
    this.staffMenuForm.get('menuid')?.setValue(0);
    this.staffMenuForm.get('l_type')?.setValue('');
    this.staffMenuForm.get('cuid')?.setValue(this.userID);
    this.refreshMenusList();
  }

}
