import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { StudentClassDto } from 'src/app/model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classidauto = 1;
  classForm!: FormGroup;
  sectionForm!:FormGroup;
  submitted = false;
  //companySvc: studentClassService;
  ngxSpinner: any;
  dataSource: any;
  DataSource = [
    {class_name: 1},
    {class_name: 2}
  ]
  displayedColumns: string[] =[
    'class_name'
  ]
  notificationSvc: any;
  constructor(private fb: FormBuilder,
    private studentSvc: studentClassService
    ) { }
  ngOnInit(): void {
    this.classForm = this.fb.group({
      class_name: ['', Validators.required],
    })
    this.getStudentClass()
    this.sectionForm=this.fb.group({
      class_name: ['', Validators.required],
    })
  }

  classdata = { class_name: "", classid:1,isactive:true,UpdatedOn:""};
  onClassSubmit() {
    // this.companySvc.addNewStudentClass(this.classdata);
    // if (this.classForm.invalid) {
    //   this.submitted = true;
    // }
    // else if (this.classForm.valid) {
      
    //   this.submitted = false;
    //   this.classidauto += 1;
    //   //this.classForm.reset();
    // console.log(this.classdata.class_name);
   
    // }
         
    //window.location.reload();
    //this.classForm.hide();
  }

  sectiondata = { class_name:0,};
  class_namee=this.sectiondata.class_name;
  
  onSectionSubmit(){
    alert(this.sectiondata.class_name)
  }




  getStudentClass() {    
    this.ngxSpinner.show();
    this.studentSvc.getStudentClassDetails().subscribe(
      (res: { Result: string | any[]; ErrorMessage: any; }) => {
        this.ngxSpinner.hide();
        this.dataSource.data = [];

        if (res.Result?.length) {
          console.log(res.Result);
          this.dataSource.data = res.Result;
        }

        if (res?.ErrorMessage) {
          this.notificationSvc.error(`Error!, ${res.ErrorMessage}`);
        }
        this.ngxSpinner.hide();
      },
      (err: { error: { message: any; }; }) => {
        this.notificationSvc.error('Error!', err?.error.message);
        this.ngxSpinner.hide();
      }
    );
  }
}

