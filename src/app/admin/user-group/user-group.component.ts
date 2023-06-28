import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  userGroupForm: FormGroup;
  constructor(private fb : FormBuilder) {

    this.userGroupForm = fb.group({
      model: ['', Validators.required]
    })
   }
  ngOnInit() {
    
  }
   Save(){
    
   }
   edit(){

   }
   delete(){
    
   }
  dataSource = [
    {no: 1, model: 'model1'},
    {no:2, model: 'model2'},
    {no:3, model: 'model3'},
    {no:4, model: 'model4'},
    {no:5, model: 'model5'}
  ]
  displayedColumns: string[] = ['no','model', 'status','action'];
  model =[
   {value: 'type-1', viewValue: 'type1'},
   {value: 'type-1', viewValue: 'type1'},
   {value: 'type-1', viewValue: 'type1'},
 
 ]
  
  }
  

 


