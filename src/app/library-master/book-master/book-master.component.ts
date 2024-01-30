import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { bookCategoryService } from 'src/app/api-service/bookCategory.service';
import { bookDepartmentService } from 'src/app/api-service/bookDepartment.service';
import { bookMasterService } from 'src/app/api-service/bookMaster.service';

@Component({
  selector: 'app-book-master',
  templateUrl: './book-master.component.html',
  styleUrls: ['./book-master.component.scss']
})
export class BookMasterComponent implements OnInit {

  bookList: any = [];
  MaxId: any = [];
  maxnumber: number;
  bookID: string;
  buttonId: boolean = true;

  categoryList: any = [];
  categoryMaxId: any = [];
  categorybuttonId: boolean = true;

  DepartmentList: any = [];
  DepartmentMaxId: any = [];
  DepartmentbuttonId: boolean = true;


  constructor(
    private booMSvc: bookMasterService, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService, private router: Router,
    private catSvc: bookCategoryService,
    private depSvc: bookDepartmentService) {
  }
  ngOnInit(): void {
    this.refreshBookList(),
      this.getMaxId(),
      this.cancelClick(),

      this.refreshCategoryList(),
      this.getCategoryMaxId(),
      this.categorycancelClick(),

      this.refreshDepartmentList(),
      this.getDepartmentMaxId(),
      this.cancelDepartmentClick()
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  bookMasterForm = new FormGroup({
    id: new FormControl(0),
    book_id: new FormControl(''),
    book_name: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshBookList() {
    this.booMSvc.getBookList().subscribe(data => {
      this.bookList = data;
    });
  }

  newBook() {
    if (this.bookMasterForm.valid) {
      if (this.bookMasterForm.value.id == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var newBookinsert = (this.bookMasterForm.value);
              this.booMSvc.addNewBook(newBookinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshBookList();
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
      else if (this.bookMasterForm.value.id != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var newBookinsert = (this.bookMasterForm.value);
              this.booMSvc.addNewBook(newBookinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshBookList();
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
      this.bookMasterForm.markAllAsTouched();
    }

  }

  getMaxId() {
    this.booMSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
      this.MaxId.forEach(element => {
        this.maxnumber = element.id
      });

      var maxnum: string = String(this.maxnumber + 1)
      if (maxnum.length == 1) {
        this.bookID = '000' + maxnum
        this.bookMasterForm.get('book_id')?.setValue('000' + maxnum);
      }
      else if (maxnum.length == 2) {
        this.bookID = '00' + maxnum
        this.bookMasterForm.get('book_id')?.setValue('00' + maxnum);
      }
      else if (maxnum.length == 3) {
        this.bookID = '0' + maxnum
        this.bookMasterForm.get('book_id')?.setValue('0' + maxnum);
      }
      else {
        this.bookID = maxnum
        this.bookMasterForm.get('book_id')?.setValue(maxnum);
      }
    });
  }


  //sample  for Dialog working
  deleteClick(id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.booMSvc.deleteBook(id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshBookList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(book: any) {
    this.bookMasterForm.patchValue(book)
    this.buttonId = false;
  }

  cancelClick() {
    this.getMaxId();
    this.bookMasterForm.reset();
    this.bookMasterForm.get('id')?.setValue(0);
    this.bookMasterForm.get('book_name')?.setValue('');
    this.bookMasterForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }



  //////////////////////////////////////////------Category

  bookCategoryForm = new FormGroup({
    category_id: new FormControl(0),
    category_name: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshCategoryList() {
    this.catSvc.getcategoryList().subscribe(data => {
      this.categoryList = data;
    });
  }

  newCategory() {
    if (this.bookCategoryForm.valid) {
      if (this.bookCategoryForm.value.category_id == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var categoryinsert = (this.bookCategoryForm.value);
              this.catSvc.addNewcategory(categoryinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshCategoryList();
                  this.getCategoryMaxId();
                  this.categorycancelClick();
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
      else if (this.bookCategoryForm.value.category_id != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var categoryinsert = (this.bookCategoryForm.value);
              this.catSvc.addNewcategory(categoryinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshCategoryList();
                  this.getCategoryMaxId();
                  this.categorycancelClick();
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
      this.bookCategoryForm.markAllAsTouched();
    }

  }

  getCategoryMaxId() {
    this.catSvc.getCategoryMaxId().subscribe(data => {
      this.categoryMaxId = data;
    });
  }


  //sample  for Dialog working
  deleteCategoryClick(category_id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.catSvc.deletecategory(category_id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshCategoryList();
              this.getCategoryMaxId();
              this.categorycancelClick();
            }
          });
        }
      });
  }

  udateCategoryClick(category: any) {
    this.bookCategoryForm.patchValue(category);
    this.categorybuttonId = false;
  }

  categorycancelClick() {
    this.bookCategoryForm.reset();
    this.bookCategoryForm.get('category_id')?.setValue(0);
    this.bookCategoryForm.get('category_name')?.setValue('');
    this.bookCategoryForm.get('cuid')?.setValue(1);
    this.categorybuttonId = true;
  }

  /////////////////////////////////////////////////////////////////////


  DepartmentForm = new FormGroup({
    department_id: new FormControl(0),
    department_name: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshDepartmentList() {
    this.depSvc.getDepartmentList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  newDepartment() {
    if (this.DepartmentForm.valid) {
      if (this.DepartmentForm.value.department_id == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var departmentinsert = (this.DepartmentForm.value);
              this.depSvc.addNewDepartment(departmentinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshDepartmentList();
                  this.getDepartmentMaxId();
                  this.cancelDepartmentClick();
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
      else if (this.DepartmentForm.value.department_id != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var departmentinsert = (this.DepartmentForm.value);
              this.depSvc.addNewDepartment(departmentinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshDepartmentList();
                  this.getDepartmentMaxId();
                  this.cancelDepartmentClick();
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
      this.DepartmentForm.markAllAsTouched();
    }
  }

  getDepartmentMaxId() {
    this.depSvc.getDepartmentMaxId().subscribe(data => {
      this.DepartmentMaxId = data;
    });
  }
  //sample  for Dialog working
  deleteDepartmentClick(department_id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.depSvc.deleteDepartment(department_id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshDepartmentList();
              this.getDepartmentMaxId();
              this.cancelDepartmentClick();
            }
          });
        }
      });
  }

  udateDepartmentClick(department: any) {
    this.DepartmentForm.patchValue(department);
    this.DepartmentbuttonId = false;
  }

  cancelDepartmentClick() {
    this.DepartmentForm.reset();
    this.DepartmentForm.get('department_id')?.setValue(0);
    this.DepartmentForm.get('department_name')?.setValue('');
    this.DepartmentForm.get('cuid')?.setValue(1);
    this.DepartmentbuttonId = true;
  }

  //////////////////////////////////////



}
