import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentEnquiryService } from 'src/app/api-service/studentEnquiry.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
@Component({
  selector: 'app-student-enquiry',
  templateUrl: './student-enquiry.component.html',
  styleUrls: ['./student-enquiry.component.scss'],
})
export class StudentEnquiryComponent implements OnInit {
  ClassList:any=[];
  GroupList:any=[];
  Groupnewlist:any=[]

  buttonId:boolean=true;
  
  constructor(private ClassSvc: studentClassService,private GroupSvc: studentGroupService,
    private DialogSvc: DialogService,private enquirySvc:studentEnquiryService,
    private notificationSvc: NotificationsService,) { }

  date1=new Date();

  currentYear=this.date1.getUTCFullYear();

  currentMonth=this.date1.getUTCMonth()+1;

  currentDate=this.date1.getUTCDate();

  today="2023-12-12";

  finalMonth:any;
  finalDay:any;

  ngOnInit(): void {

    if(this.currentMonth < 10){
      this.finalMonth="0"+this.currentMonth;
    }
    else{
      this.finalMonth=this.currentMonth;
    }


    if(this.currentDate < 10){
      this.finalDay="0"+this.currentDate;
    }
    else{
      this.finalDay=this.currentDate;
    }

    this.today=this.currentYear+"-"+this.finalMonth+"-"+this.finalDay;



    ///////////////////////////////////////////////////////////////////////////////
    this.refreshClassList();
    this.refreshGroupList();

  }


  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  refreshGroupList() {
    this.GroupSvc.getGroupList().subscribe(data => {
      this.GroupList = data;
    });
  }

  changefun(classsid: any) {
    debugger;
    const classid = Number(classsid);
    this.StudentEnquiryForm.get('s_admission')?.setValue(classid);
    this.Groupnewlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    if(this.Groupnewlist.length ==0){
      this.StudentEnquiryForm.get('mark_10')?.setValue('');
      this.StudentEnquiryForm.get('s_group')?.setValue(0);
    }
  }

  selectedSub(event: any) {
    debugger;    
    if (event.target.checked) {
      this.StudentEnquiryForm.get('s_declare')?.setValue(true);
    } else {
      this.StudentEnquiryForm.get('s_declare')?.setValue(false);
    }
  };

  StudentEnquiryForm = new FormGroup({
    enquiryid: new FormControl(0),
    date: new FormControl(this.today),
    student_name: new FormControl(''),
    s_admission: new FormControl(0),
    mark_10: new FormControl(''),
    s_group: new FormControl(0),
    dob: new FormControl(),
    gender: new FormControl(''),
    nationality: new FormControl(''),
    religion: new FormControl(''),
    community: new FormControl(''),
    caste: new FormControl(''),
    bloodgroup: new FormControl(''),
    aadhar: new FormControl(),
    father_name: new FormControl(''),
    f_occupation: new FormControl(''),
    f_qualification: new FormControl(''),
    f_ph: new FormControl(''),
    f_email: new FormControl(''),
    mother_name: new FormControl(''),
    m_occupation: new FormControl(''),
    m_qualification: new FormControl(''),
    m_ph: new FormControl(''),
    place: new FormControl(''),
    address: new FormControl(''),
    i_m_1: new FormControl(''),
    i_m_2: new FormControl(''),
    l_class: new FormControl(''),
    l_school: new FormControl(''),
    l_stream: new FormControl(''),
    l_medium: new FormControl(''),
    s_declare: new FormControl(false),
    cuid: new FormControl(1),
  })
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  newEnquiry() {
    debugger;
    if (this.StudentEnquiryForm.valid) {
      if (this.StudentEnquiryForm.value.enquiryid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              debugger;
              var Classinsert = (this.StudentEnquiryForm.value);
              this.enquirySvc.addNewEnquiry(Classinsert).subscribe(res => {
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  // this.refreshClassList();
                  // this.getMaxId();
                  // this.cancelClick();
                  this.StudentEnquiryForm.reset()
                }
              });
            }
          });
      }
      else if (this.StudentEnquiryForm.value.enquiryid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              debugger;
              var Classinsert = (this.StudentEnquiryForm.value);
              this.ClassSvc.addNewClass(Classinsert).subscribe(res => {
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  // this.refreshClassList();
                  // this.getMaxId();
                  // this.cancelClick();
                  this.StudentEnquiryForm.reset()
                }
              });
            }
          });
      }

    }
    else if(this.StudentEnquiryForm.value.s_declare == false){
      this.notificationSvc.warn("Please declare")
    }
    else {
      this.StudentEnquiryForm.markAllAsTouched();
      alert();
    }

  }

  cancelClick() {
    this.StudentEnquiryForm.reset();
    this.StudentEnquiryForm.get('enquiryid')?.setValue(0);
    this.StudentEnquiryForm.get('date')?.setValue(this.today);
    //this.StudentEnquiryForm.get('no_of_rooms')?.setValue('');
    this.StudentEnquiryForm.get('s_declare')?.setValue(false);
    this.StudentEnquiryForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }

}
