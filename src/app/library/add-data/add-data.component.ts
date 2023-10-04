import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { addBookService } from 'src/app/api-service/addBook.service';
import { bookMasterService } from 'src/app/api-service/bookMaster.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  bookList: any = [];
  addBookList: any[] = [];

  constructor(private router: Router,
    private booMSvc: bookMasterService,
    private adBoSvc: addBookService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,) { }

  ngOnInit(): void {
    this.refreshBookList();
    this.refreshAddBookList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshBookList() {
    this.booMSvc.getBookList().subscribe(data => {
      this.bookList = data;
    });
  }

  //// Number Only Event
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  addBookForm = new FormGroup({
    id: new FormControl(0),
    purchase_date: new FormControl(''),
    book_id: new FormControl(''),
    category_name: new FormControl(''),
    department_name: new FormControl(''),
    book_name: new FormControl(''),
    book_author: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    cuid: new FormControl(1)
  });

  mapBookDetails() {
    debugger;
    const newBookList = this.bookList.filter((e) => { return e.book_id == this.addBookForm.value.book_id });
    this.addBookForm.get('category_name')?.setValue(newBookList[0].category_name);
    this.addBookForm.get('department_name')?.setValue(newBookList[0].department_name);
    this.addBookForm.get('book_name')?.setValue(newBookList[0].book_name);
  }

  refreshAddBookList() {
    this.adBoSvc.getBookList().subscribe(data => {
      debugger;
      this.addBookList = data;
    });
  }

  save() {
    console.log(this.addBookForm.value)
  }

  newDepartment() {
    if (this.addBookForm.valid) {
      if (this.addBookForm.value.id == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var departmentinsert = (this.addBookForm.value);
              this.adBoSvc.addNewBook(departmentinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshAddBookList();
                  //this.cancelDepartmentClick();
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
      else if (this.addBookForm.value.id != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var departmentinsert = (this.addBookForm.value);
              this.adBoSvc.addNewBook(departmentinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshAddBookList();
                  //this.cancelDepartmentClick();
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
      this.addBookForm.markAllAsTouched();
    }
  }

}
