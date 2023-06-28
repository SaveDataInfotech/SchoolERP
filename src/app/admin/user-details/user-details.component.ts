import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userForm:FormGroup;
  constructor(private fb : FormBuilder) {

    this.userForm=this.fb.group({

      email: [''],
      password: [''],
      confirmPassword: [''],
      mobileNumber: [''],
      userType:[''],
    })
   }

  ngOnInit(): void {

    //test changes
  }

  Save(){
    
  }
  edit(){

  }
  delete(){
    
  }
  dataSource = [
    {no: 1,mobile:9876543210, email:'abc@gmail.com',password: 'password',cpassword: 'password'},
    {no: 2,mobile:9876543210, email:'abc@gmail.com',password: 'password',cpassword: 'password'},
    {no: 3,mobile:9876543210, email:'abc@gmail.com',password: 'password',cpassword: 'password'},
    {no: 4,mobile:9876543210, email:'abc@gmail.com',password: 'password',cpassword: 'password'},
    {no: 5,mobile:9876543210, email:'abc@gmail.com',password: 'password',cpassword: 'password'},
   
 ];
 displayedColumns: string[] = ['no','mobile','email','password','cpassword', 'status','action'];
 numberOnly(event: { which: any; keyCode: any; }): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
checked = false;
}
