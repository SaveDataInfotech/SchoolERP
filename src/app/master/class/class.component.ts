import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { StudentClassDto } from 'src/app/model';
import{studentGroupService} from 'src/app/api-service/studentGroup.service';
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
  ngxSpinner: any;
  classDetailList: any[] = [];
  groupDetailList: any[] = [];
  notificationSvc: any;
  constructor(private fb: FormBuilder,
    private studentSvc: studentClassService,
    private groupSvc:studentGroupService
    ) { }
  ngOnInit(): void {
    this.classForm = this.fb.group({
      class_name: ['', Validators.required],
    })
    this.getStudentClass()
    this.getStudentGroup()

  }

  classdata = { class_name: ""};
  onClassSubmit() {
    debugger;
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

    this.studentSvc.addNewStudentClass(this.classdata).subscribe(
      (res) => {
debugger;
        if (res.IsSuccess) {
          this.notificationSvc.success('Success!', res.IsSuccess);
          setTimeout(() => {
            //this.FormGroupDirective.resetForm();
            // this.isEdit = false;
            // this.files = [];
            // this.getCompanyDetail();
            // this.getCompanyId();
            window.location.reload();
            this.ngxSpinner.hide();
          
          }, 0);
        }})
    
  }

  sectiondata = {class_name:0,};
  class_namee=this.sectiondata.class_name;

  getStudentClass() {
    console.log("getStudentClassCalled");
    // this.ngxSpinner.show();
    this.studentSvc.getStudentClassDetails().subscribe(
      (res) => {
        // this.ngxSpinner.hide();
        // this.dataSource?.data = [];
        console.log(res.Result,'test');
        
        if (res.Result?.length) {
          this.classDetailList = res.Result;
        }

        if (res?.ErrorMessage) {
          this.notificationSvc.error(`Error!, ${res.ErrorMessage}`);
        }
        // this.ngxSpinner.hide();
      },
      (err) => {
        this.notificationSvc.error('Error!', err);
        // this.ngxSpinner.hide();
      }
    );
  }


  getStudentGroup() {
    console.log("getStudentGroupCalled");
    // this.ngxSpinner.show();
    this.groupSvc.getStudentGroupDetails().subscribe(
      (res) => {
        // this.ngxSpinner.hide();
        // this.dataSource?.data = [];
        if (res.Result?.length) {
          this.groupDetailList = res.Result;
        }

        if (res?.ErrorMessage) {
          this.notificationSvc.error(`Error!, ${res.ErrorMessage}`);
        }
        // this.ngxSpinner.hide();
      },
      (err) => {
        this.notificationSvc.error('Error!', err);
        // this.ngxSpinner.hide();
      }
    );
  }
}

