import { OnInit } from '@angular/core';
import { Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {

  classForm!:FormGroup
  submitted=false;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.classForm=this.formBuilder.group({
      classname:['',Validators.required]
    })
  }


  onClassSubmit(){
    this.submitted=true;
    if(this.classForm.invalid){
      return
    }
    alert(this.classForm);
  }
}