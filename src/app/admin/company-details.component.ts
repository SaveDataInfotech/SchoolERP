import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'company-details',
  templateUrl: 'company-details.component.html',
  styleUrls: ['company-details.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class CompanyDetailsComponent implements OnInit {
  @ViewChild(FormGroupDirective) FormGroupDirective: FormGroupDirective;

  companyDetailsForm: FormGroup;
  files:File[] = [];
  datePipe: any;
  ngxSpinner: any;

  constructor(fb: FormBuilder) {

    this.companyDetailsForm = fb.group({
      companyId : [{value : '', disabled : true}],
      companyStartDate : [{ value: '', disabled: true}],
      companyName:[''],
      companyShortName:[''],
      doorNo:[''],
      buildingName:[''],
      streetName:[''],
      streetName1:[''],
      emailAddress:[''],
      location:[''],
      pinCode:[''],
      post:[''],
      taluk:[''],
      district:[''],
      licenseNumber:[''],
      date:[''],
      tashildar:[''],
      webSite:[''],
      ownerName:[''],
      mobileNumber:[''],
      officePhoneNumber:[''],
      officeMobileNumber: [''],
      isActive: [false],
      registeredDate: ['']

    });
    
  }

  ngOnInit() {}


    //upload or drag and drop image

    onSelect(event: any) {
    
      this.files.push(...event.addedFiles);
      if(this.files.length > 1){ // checking if files array has more than one content
        this.replaceFile(); // replace file
        }
      const formData = new FormData();
  
      for (var i = 0; i < this.files.length; i++) { 
        formData.append("file[]", this.files[0]);
      }
      
  }
  
  replaceFile(){
    this.files.splice(0,1); // index =0 , remove_count = 1
    }
  
  onRemove(event : any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  
  }

  Save(){

  }

  
  Clear(){
    this.companyDetailsForm.reset();
    window.location.reload();
    this.ngxSpinner.hide();
  }
  edit(){

  }
  delete(){

  }
  
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  
  }
  serializedDate = new FormControl(new Date().toISOString() );
  dataSource=[
    {no:1, id:'001', date:'01-02-2023', name:'abcd', location:'cbe', licenseNo:'001', mobileNo:'9876543210', email:'abc@gmail.com'}]

  displayedColumns: string[] =['no','id','date','name','location','licenseNo','mobileNo','email','status','action']


}


