import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { staffCategoryService } from 'src/app/api-service/staffCategory.service';

@Component({
  selector: 'app-staff-category',
  templateUrl: './staff-category.component.html',
  styleUrls: ['./staff-category.component.scss']
})
export class StaffCategoryComponent implements OnInit {
  categoryList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  constructor(private scSvc: staffCategoryService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService, private router: Router) {
  }
  ngOnInit(): void {
    this.refreshstaffCategoryList(),
      this.getMaxId(),
      this.cancelClick()
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  letterOnly(event) {
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
      return true;
    else
      return false;
  }

  charSymbol(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;
  }

  staffCategoryForm = new FormGroup({
    category_id: new FormControl(0),
    category: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshstaffCategoryList() {
    this.scSvc.getCategoryList().subscribe(data => {
      this.categoryList = data;
    });
  }

  newCategory() {
    if (this.staffCategoryForm.valid) {
      if (this.staffCategoryForm.value.category_id == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var value = (this.staffCategoryForm.value);
              this.scSvc.addNewCategory(value).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshstaffCategoryList();
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
      else if (this.staffCategoryForm.value.category_id != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var value = (this.staffCategoryForm.value);
              this.scSvc.addNewCategory(value).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshstaffCategoryList();
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
      this.staffCategoryForm.markAllAsTouched();
    }
  }

  getMaxId() {
    this.scSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(id: number) {
    
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.scSvc.deletestaffCategory(id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshstaffCategoryList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(value: any) {
    this.staffCategoryForm.get('category_id')?.setValue(value.category_id);
    this.staffCategoryForm.get('category')?.setValue(value.category);
    this.staffCategoryForm.get('cuid')?.setValue(1);
    this.buttonId = false;
  }

  cancelClick() {
    this.staffCategoryForm.reset();
    this.staffCategoryForm.get('category_id')?.setValue(0);
    this.staffCategoryForm.get('category')?.setValue('');
    this.staffCategoryForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }

}
