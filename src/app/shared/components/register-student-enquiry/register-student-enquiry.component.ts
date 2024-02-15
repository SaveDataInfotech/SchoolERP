import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { enrollmentNoDialogService } from 'src/app/api-service/enrollment_no_dialog.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentEnquiryService } from 'src/app/api-service/studentEnquiry.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-register-student-enquiry',
  templateUrl: './register-student-enquiry.component.html',
  styleUrls: ['./register-student-enquiry.component.scss']
})
export class RegisterStudentEnquiryComponent implements OnInit {

  ClassList: any = [];
  GroupList: any = [];
  Groupnewlist: any = [];
  buttonId: boolean = true;
  MaxId: any = [];
  maxnumber: number;
  enquiryno: string;
  userID: number = Number(localStorage.getItem("userid"));
  today: string;
  constructor(private ClassSvc: studentClassService, private GroupSvc: studentGroupService,
    private DialogSvc: DialogService, private enquirySvc: studentEnquiryService,
    private notificationSvc: NotificationsService,
    private router: Router, private enrolSvc: enrollmentNoDialogService,) { }


  ngOnInit(): void {
    this.today = new Date().toISOString().slice(0, 10);
    this.StudentEnquiryForm.get('enquiry_date')?.setValue(this.today);
    ///////////////////////////////////////////////////////////////////////////////
    this.refreshClassList();
    this.refreshGroupList();
    this.cancelClick();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
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
    const classid = Number(classsid);
    this.StudentEnquiryForm.get('classid')?.setValue(classid);
    this.Groupnewlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    if (this.Groupnewlist.length == 0) {
      this.StudentEnquiryForm.get('mark_10')?.setValue('');
      this.StudentEnquiryForm.get('groupid')?.setValue(0);
    }
  }

  selectedSub(event: any) {
    if (event.target.checked) {
      this.StudentEnquiryForm.get('s_declare')?.setValue(true);
    } else {
      this.StudentEnquiryForm.get('s_declare')?.setValue(false);
    }
  };

  StudentEnquiryForm = new FormGroup({
    enquiry_date: new FormControl(''),
    student_name: new FormControl('', [Validators.required]),
    classid: new FormControl(0, [Validators.required]),
    mark_10: new FormControl(''),
    groupid: new FormControl(0),
    dob: new FormControl(),
    gender: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required]),
    religion: new FormControl('', [Validators.required]),
    community: new FormControl('', [Validators.required]),
    bloodgroup: new FormControl(''),
    aadhar: new FormControl(''),
    father_name: new FormControl('', [Validators.required]),
    f_occupation: new FormControl(''),
    f_qualification: new FormControl(''),
    f_ph: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    f_email: new FormControl(''),
    mother_name: new FormControl('', [Validators.required]),
    m_occupation: new FormControl(''),
    m_qualification: new FormControl(''),
    m_ph: new FormControl(''),
    place: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    i_m_1: new FormControl(''),
    i_m_2: new FormControl(''),
    l_classid: new FormControl(0),
    l_school: new FormControl(''),
    l_stream: new FormControl(''),
    l_medium: new FormControl(''),
    s_declare: new FormControl(false),
    stay_type: new FormControl('Yes'),
    boading_place: new FormControl(''),
    cuid: new FormControl(this.userID),
  })
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  numberNotApplicable(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;
  }


  async newEnquiry() {
    if (this.StudentEnquiryForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(async res => {
          if (res == true) {
            var Classinsert = (this.StudentEnquiryForm.value);
            this.enquirySvc.addNewEnquiry(Classinsert).subscribe(async res => {
              if (res.status == 'Saved successfully') {
                this.enrolSvc.openConfirmDialog(String(res.recordid))
                  .afterClosed().subscribe(res => {
                  });
                this.refreshClassList();
                this.cancelClick();
              }
              else {
                this.notificationSvc.error("Something error");
              }
            });
          }
        });
    }
    else if (this.StudentEnquiryForm.value.s_declare == false) {
      this.notificationSvc.warn("Please declare");
    }
    else {
      this.StudentEnquiryForm.markAllAsTouched();
      this.notificationSvc.error("Fill the mandatory fileds");
    }
  }

  cancelClick() {
    this.StudentEnquiryForm.reset();
    this.StudentEnquiryForm.get('enquiry_date')?.setValue(this.today);
    this.StudentEnquiryForm.get('student_name')?.setValue('');
    this.StudentEnquiryForm.get('classid')?.setValue(0);
    this.StudentEnquiryForm.get('mark_10')?.setValue('');
    this.StudentEnquiryForm.get('groupid')?.setValue(0);
    this.StudentEnquiryForm.get('dob')?.setValue('');
    this.StudentEnquiryForm.get('gender')?.setValue('');
    this.StudentEnquiryForm.get('nationality')?.setValue('');
    this.StudentEnquiryForm.get('religion')?.setValue('');
    this.StudentEnquiryForm.get('community')?.setValue('');
    this.StudentEnquiryForm.get('bloodgroup')?.setValue('');
    this.StudentEnquiryForm.get('aadhar')?.setValue('');
    this.StudentEnquiryForm.get('father_name')?.setValue('');
    this.StudentEnquiryForm.get('f_occupation')?.setValue('');
    this.StudentEnquiryForm.get('f_qualification')?.setValue('');
    this.StudentEnquiryForm.get('f_ph')?.setValue('');
    this.StudentEnquiryForm.get('f_email')?.setValue('');
    this.StudentEnquiryForm.get('mother_name')?.setValue('');
    this.StudentEnquiryForm.get('m_occupation')?.setValue('');
    this.StudentEnquiryForm.get('m_qualification')?.setValue('');
    this.StudentEnquiryForm.get('m_ph')?.setValue('');
    this.StudentEnquiryForm.get('place')?.setValue('');
    this.StudentEnquiryForm.get('address')?.setValue('');
    this.StudentEnquiryForm.get('i_m_1')?.setValue('');
    this.StudentEnquiryForm.get('i_m_2')?.setValue('');
    this.StudentEnquiryForm.get('l_classid')?.setValue(0);
    this.StudentEnquiryForm.get('l_school')?.setValue('');
    this.StudentEnquiryForm.get('l_stream')?.setValue('');
    this.StudentEnquiryForm.get('l_medium')?.setValue('');
    this.StudentEnquiryForm.get('stay_type')?.setValue('Yes');
    this.StudentEnquiryForm.get('boading_place')?.setValue('');
    this.StudentEnquiryForm.get('s_declare')?.setValue(false);
    this.StudentEnquiryForm.get('cuid')?.setValue(this.userID);
    this.buttonId = true;
  }

}
