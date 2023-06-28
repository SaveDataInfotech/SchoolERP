import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  @ViewChild(FormGroupDirective) FormGroupDirective: FormGroupDirective;
  customerForm : FormGroup;
  router: any;
  ngxSpinner: any;
  constructor(private fb : FormBuilder) { 
    this.customerForm = fb.group({
      customerId: [{value : '', disabled : true}],
      date : ['',Validators.required],
      mobileNumber: ['',  Validators.required],
      alternativeMobileNumber: ['',],
      customerName: ['', Validators.required],
      guardianType: ['', Validators.required],
      guardianName: ['', Validators.required],
      doorNo: [''],
      houseName: [''],
      streetName: ['', Validators.required],
      streetName1: [''],
      location: ['', Validators.required],
      pinCode: ['', Validators.required],
      post: ['', Validators.required],
      taluk: ['', Validators.required],
      district: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  Save(){

  }
  Clear(){
    this.customerForm.reset();
    window.location.reload();
    this.ngxSpinner.hide();
  }
  Close(){
    this.router.navigateByUrl('dashboard');
  }
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  
  }
}
