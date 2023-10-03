import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { bookMasterService } from 'src/app/api-service/bookMaster.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  bookList: any = [];

  constructor(private router: Router,
    private booMSvc: bookMasterService) { }

  ngOnInit(): void {
    this.refreshBookList();
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

  save() {
    console.log(this.addBookForm.value)
  }

}
