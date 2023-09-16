import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { VehiclePlaceService } from 'src/app/api-service/VehiclePlace.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { studentProfileService } from 'src/app/api-service/studentProfile.service';
import { FeesTypeAssignService } from 'src/app/api-service/feesTypeAssign.service';
import { VehicleNoRootService } from 'src/app/api-service/VehicleNoRoot.service';
import { FeesAssignService } from 'src/app/api-service/FeesAssign.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  files: File[] = [];
  editableImage: any;
  file: any;
  base64textString: any[] = [];

  PlaceList: any = [];
  placefilterList: any[] = [];
  FeesAssignList: any[] = [];

  ClassList: any[] = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  FeesLessList: any = [];
  FeesTypeAssignList: any = [];
  groupDisplay: boolean = true;
  assignbuttonId: boolean = true;
  storedValue: any;
  resStatus1: boolean;
  resStatus2: boolean;
  resStatus3: boolean;
  resStatus4: boolean;
  FeesTypeAssignFillterList: any = [];
  vehicleNoRootList: any = [];
  searchStudentData: any = [];
  maxIDList: any[] = [];
  maxnumber: number;
  admissionno: string;
  activeBatchYear: any = [];
  newgetbatch: string;

  constructor(private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private FlSvc: FeesLessService,
    private studProSvc: studentProfileService,
    private PlaceSvc: VehiclePlaceService,
    private feeTyAsSvc: FeesTypeAssignService,
    private vhNoRtSvc: VehicleNoRootService,
    private feeAsSvc: FeesAssignService,
    private batchSvc: BatechYearService,) { }


  date1 = new Date();

  currentYear = this.date1.getUTCFullYear();

  currentMonth = this.date1.getUTCMonth() + 1;

  currentDate = this.date1.getUTCDate();

  todayDate: Date = new Date();
  today = String(this.todayDate);

  finalMonth: any;
  finalDay: any;

  ngOnInit(): void {
    if (this.currentMonth < 10) {
      this.finalMonth = "0" + this.currentMonth;
    }
    else {
      this.finalMonth = this.currentMonth;
    }
    if (this.currentDate < 10) {
      this.finalDay = "0" + this.currentDate;
    }
    else {
      this.finalDay = this.currentDate;
    }
    this.today = this.currentYear + "-" + this.finalMonth + "-" + this.finalDay;
    this.studentDetailsForm.get('date').setValue(this.today);
    ////////////
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.refreshFeesLessList();
    this.refreshvehiclePlaceList();
    this.refreshFeesTypeAssignList();
    this.refreshvehicleNoRootList();
    this.refreshFeesAssignList();
    this.GetActiveBatchYear();
    this.getMaxId();
    //this.setvalueform();
  }
  setvalueform() {
    debugger;
    this.refreshGroupList();
    this.refreshSectionList();

    var storedValues: any = sessionStorage.getItem("selectd");
    var myObj = JSON.parse(storedValues);
    this.studentDetailsForm.patchValue(myObj);
    this.studentPersonalDetailsForm.patchValue(myObj);
    this.studentDetailsForm.get('newstudent').setValue('YES');

    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == this.studentDetailsForm.value.classid });
    if (this.groupFilterlist.length == 0) {
      console.log(this.SectionList)
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == this.studentDetailsForm.value.classid });
    }
    //this.filterSectionfun(this.studentDetailsForm.value.groupid)
  }

  //// Number Only Event
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //get class details

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

  refreshSectionList() {
    debugger;
    this.ScSvc.getSectionList().subscribe(data => {
      this.SectionList = data;
    });
  }

  filterGroupfun(classsid: any) {
    debugger;
    const classid = Number(classsid);
    this.studentDetailsForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentDetailsForm.get('groupid')?.setValue(0);
    this.studentDetailsForm.get('sectionid')?.setValue(0);
    this.studentDetailsForm.get('mark_10')?.setValue('');
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentDetailsForm.get('sectionid')?.setValue(0);
      this.studentDetailsForm.get('mark_10')?.setValue('');
    }
    else {
      this.groupDisplay = true;
      this.studentDetailsForm.get('sectionid')?.setValue(0);
      this.studentDetailsForm.get('mark_10')?.setValue('');
    }
  }

  filterSectionfun(groupID: any) {
    debugger;
    const groupid = Number(groupID);
    this.studentDetailsForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentDetailsForm.get('sectionid')?.setValue(0);
  }
  //image
  deleteImage() {
    this.files = [];
    this.editableImage = null;
    this.base64textString = [];
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    // this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      // checking if files array has more than one content
      this.replaceFile(); // replace file
    }
    this.convertFileToBase64AndSet(event.addedFiles[0]);
    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[0]);
      this.file = this.files[0];
    }
  }

  replaceFile() {
    this.files.splice(0, 1); // index =0 , remove_count = 1
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  convertFileToBase64AndSet(fileList: any) {
    this.base64textString = [];
    if (fileList) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(fileList);

    }
  }

  handleReaderLoaded(e: any) {
    this.base64textString.push(
      'data:image/png;base64,' + btoa(e.target.result)
    );
    this.studentDetailsForm.get('simage')?.setValue(this.base64textString[0]);
  }

  //uplaod File
  getFile(event: any) {
    this.file = event.target.file[0];
  }

  ///////
  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.studentDetailsForm.get('batch_year')?.setValue(this.newgetbatch);
    });
  }

  studentDetailsForm = new FormGroup({
    profileid: new FormControl(0),
    simage: new FormControl(''),
    date: new FormControl(''),
    enquiry_no: new FormControl(''),
    admission_no: new FormControl(''),
    batch_year: new FormControl(''),
    classid: new FormControl(null, [Validators.required]),
    groupid: new FormControl(0),
    sectionid: new FormControl(0, [Validators.required]),
    mark_10: new FormControl(''),
    roll_no: new FormControl(''),
    emis_no: new FormControl(''),
    aadhar: new FormControl(''),
    student_name: new FormControl(''),
    student_name_t: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    nationality: new FormControl(''),
    religion: new FormControl(''),
    community: new FormControl(''),
    caste: new FormControl(''),
    newstudent: new FormControl(''),
    admissionFeesList: new FormArray([
    ]),
    feesless: new FormControl(''),
    stay_type: new FormControl('Day scholar'),
    vehicle_type: new FormControl(''),
    root_no: new FormControl(0),
    boading_place: new FormControl(''),
    busdistance: new FormControl(''),
    busFeesList: new FormArray([
    ]),
    commonFeesList: new FormArray([
    ]),
    cuid: new FormControl(1),
  });

  get class() {
    return this.studentDetailsForm.get('classid');
  }

  getAdFeesControls() {
    return (this.studentDetailsForm.get('admissionFeesList') as FormArray).controls;
  }
  getBusFeesControls() {
    return (this.studentDetailsForm.get('busFeesList') as FormArray).controls;
  }
  getcommonFeesControls() {
    return (this.studentDetailsForm.get('commonFeesList') as FormArray).controls;
  }

  refreshFeesAssignList() {
    this.feeAsSvc.getFeesAssignList().subscribe(data => {
      this.FeesAssignList = data;
    });
  }

  placeOfBo(vehicle_no_id: any) {
    debugger;
    let idn = Number(vehicle_no_id);
    this.studentDetailsForm.get('root_no')?.setValue(idn);
    this.placefilterList = this.PlaceList.filter((e: any) => { return e.root_no == idn });
  }

  getMaxId() {
    this.studProSvc.getMaxId().subscribe(data => {
      debugger;
      this.maxIDList = data;
      this.maxIDList.forEach(element => {
        this.maxnumber = element.profileid
      });

      var maxnum: string = String(this.maxnumber + 1)
      if (maxnum.length == 1) {
        this.admissionno = '000' + maxnum
        this.studentDetailsForm.get('admission_no')?.setValue('000' + maxnum);
      }
      else if (maxnum.length == 2) {
        this.admissionno = '00' + maxnum
        this.studentDetailsForm.get('admission_no')?.setValue('00' + maxnum);
      }
      else if (maxnum.length == 3) {
        this.admissionno = '0' + maxnum
        this.studentDetailsForm.get('admission_no')?.setValue('0' + maxnum);
      }
      else {
        this.admissionno = maxnum
        this.studentDetailsForm.get('admission_no')?.setValue(maxnum);
      }
    });
  }

  newStudentProfileDetails() {
    debugger;
    if (this.studentDetailsForm.valid) {
      debugger;
      if (this.studentDetailsForm.value.profileid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              debugger;
              if (this.studentDetailsForm.value.vehicle_type == 'Bus' && this.studentDetailsForm.value.stay_type == 'Day scholar') {
                const control = <FormArray>this.studentDetailsForm.controls['busFeesList'];
                while (control.length !== 0) {
                  control.removeAt(0)
                }
                const feesList = this.FeesAssignList.filter((e) => {
                  return e.classid == this.studentDetailsForm.value.classid
                    && e.groupid == this.studentDetailsForm.value.groupid
                    && e.gender == this.studentDetailsForm.value.gender
                    && e.batch_year == this.studentDetailsForm.value.batch_year
                    && e.type_name == 'Bus Fees'
                    && e.studentfeestype == 'Bus Fees'
                    && e.type_assign_name == this.studentDetailsForm.value.busdistance
                    && e.less_type == this.studentDetailsForm.value.feesless
                    && e.isactive == true
                });

                feesList.forEach(element => {
                  const control = <FormArray>this.studentDetailsForm.controls['busFeesList'];
                  control.push(
                    new FormGroup({
                      admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                      classid: new FormControl(this.studentDetailsForm.value.classid),
                      groupid: new FormControl(this.studentDetailsForm.value.groupid),
                      sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                      gender: new FormControl(this.studentDetailsForm.value.gender),
                      date: new FormControl(this.studentDetailsForm.value.date),
                      batch_year: new FormControl(this.studentDetailsForm.value.batch_year),
                      studentfeestype: new FormControl(element.studentfeestype),
                      type_name: new FormControl(element.type_name),
                      type_assign_name: new FormControl(element.type_assign_name),
                      less_type: new FormControl(element.less_type),
                      amount: new FormControl(element.amount),
                      balance_amount: new FormControl(element.amount)
                    })
                  )
                });
              }
              else {
                this.studentDetailsForm.get('vehicle_type')?.setValue('');
                this.studentDetailsForm.get('root_no')?.setValue(0);
                this.studentDetailsForm.get('boading_place')?.setValue('');
                this.studentDetailsForm.get('busdistance')?.setValue('');
                const control = <FormArray>this.studentDetailsForm.controls['busFeesList'];
                while (control.length !== 0) {
                  control.removeAt(0)
                }
              }

              if (this.studentDetailsForm.value.newstudent == 'YES') {
                const control = <FormArray>this.studentDetailsForm.controls['admissionFeesList'];
                while (control.length !== 0) {
                  control.removeAt(0)
                }
                const feesList = this.FeesAssignList.filter((e) => {
                  return e.classid == this.studentDetailsForm.value.classid
                    && e.groupid == this.studentDetailsForm.value.groupid
                    && e.gender == this.studentDetailsForm.value.gender
                    && e.batch_year == this.studentDetailsForm.value.batch_year
                    && e.type_name == 'Admission Fees'
                    && e.studentfeestype == 'Admission Fees'
                    && e.less_type == this.studentDetailsForm.value.feesless
                    && e.isactive == true
                });

                feesList.forEach(element => {
                  const control = <FormArray>this.studentDetailsForm.controls['admissionFeesList'];
                  control.push(
                    new FormGroup({
                      admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                      classid: new FormControl(this.studentDetailsForm.value.classid),
                      groupid: new FormControl(this.studentDetailsForm.value.groupid),
                      sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                      gender: new FormControl(this.studentDetailsForm.value.gender),
                      date: new FormControl(this.studentDetailsForm.value.date),
                      batch_year: new FormControl(this.studentDetailsForm.value.batch_year),
                      studentfeestype: new FormControl(element.studentfeestype),
                      type_name: new FormControl(element.type_name),
                      type_assign_name: new FormControl(element.type_assign_name),
                      less_type: new FormControl(element.less_type),
                      amount: new FormControl(element.amount),
                      balance_amount: new FormControl(element.amount)
                    })
                  )
                });
              }
              else {
                const control = <FormArray>this.studentDetailsForm.controls['admissionFeesList'];
                while (control.length !== 0) {
                  control.removeAt(0)
                }
              }

              {
                const control = <FormArray>this.studentDetailsForm.controls['commonFeesList'];
                while (control.length !== 0) {
                  control.removeAt(0)
                }
                const feesList = this.FeesAssignList.filter((e) => {
                  return e.classid == this.studentDetailsForm.value.classid
                    && e.groupid == this.studentDetailsForm.value.groupid
                    && e.gender == this.studentDetailsForm.value.gender
                    && e.batch_year == this.studentDetailsForm.value.batch_year
                    && e.studentfeestype == 'Common Fees'
                    && e.less_type == this.studentDetailsForm.value.feesless
                    && e.isactive == true
                });
                feesList.forEach(element => {
                  const control = <FormArray>this.studentDetailsForm.controls['commonFeesList'];
                  control.push(
                    new FormGroup({
                      admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                      classid: new FormControl(this.studentDetailsForm.value.classid),
                      groupid: new FormControl(this.studentDetailsForm.value.groupid),
                      sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                      gender: new FormControl(this.studentDetailsForm.value.gender),
                      date: new FormControl(this.studentDetailsForm.value.date),
                      batch_year: new FormControl(this.studentDetailsForm.value.batch_year),
                      studentfeestype: new FormControl(element.studentfeestype),
                      type_name: new FormControl(element.type_name),
                      type_assign_name: new FormControl(element.type_assign_name),
                      less_type: new FormControl(element.less_type),
                      amount: new FormControl(element.amount),
                      balance_amount: new FormControl(element.amount)
                    })
                  )
                });
              }

              var studentinsert = (this.studentDetailsForm.value);
              console.log(this.studentDetailsForm)
              this.studProSvc.studentDetails(studentinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.resStatus1 = true;
                  //this.getMaxId();
                  //this.cancelclick();

                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists Student Aadhar");
                }
                else {
                  this.notificationSvc.error("Something error");
                }
              });
            }
          });
      }
      else if (this.studentDetailsForm.value.profileid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              debugger;
              var studentinsert = (this.studentDetailsForm.value);
              this.studProSvc.studentDetails(studentinsert).subscribe(res => {
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  //this.getMaxId();
                  //this.cancelclick();
                }
              });
            }
          });
      }
    }
    else {
      this.studentDetailsForm.markAllAsTouched();
    }
  }

  studentPersonalDetailsForm = new FormGroup({
    bloodgroup: new FormControl(''),
    phy_challanged: new FormControl(''),
    i_m_1: new FormControl(''),
    i_m_2: new FormControl(''),
    father_name: new FormControl(''),
    f_occupation: new FormControl(''),
    f_qualification: new FormControl(''),
    f_ph: new FormControl(''),
    f_email: new FormControl(''),
    mother_name: new FormControl(''),
    m_occupation: new FormControl(''),
    m_qualification: new FormControl(''),
    m_ph: new FormControl(''),
    p_address: new FormControl(''),
    c_address: new FormControl(''),
    cuid: new FormControl(1)
  })


  newstudentPersonalDetails() {
    debugger;
    let searchAdmissionNo = (this.studentDetailsForm.value.admission_no);
    if (this.studentPersonalDetailsForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            debugger;
            var studentinsert = (this.studentPersonalDetailsForm.value);
            this.studProSvc.PersonalDetails(studentinsert, searchAdmissionNo).subscribe(res => {
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved Success")
                this.resStatus2 = true;
              }
              else {
                this.notificationSvc.error("Error")
              }
            });
          }
        });
    }
    else {
      this.studentPersonalDetailsForm.markAllAsTouched();
    }
  }

  /// Fees details List
  refreshvehiclePlaceList() {
    this.PlaceSvc.getPlaceList().subscribe(data => {
      this.PlaceList = data;
    });
  }

  refreshFeesTypeAssignList() {
    this.feeTyAsSvc.getfeesTypeAssignList().subscribe(data => {
      this.FeesTypeAssignList = data;
      this.FeesTypeAssignFillterList = this.FeesTypeAssignList.filter((e: any) => { return e.type_name == 'Bus Fees' });
    });
  }

  refreshFeesLessList() {
    this.FlSvc.getfeesLessList().subscribe(data => {
      this.FeesLessList = data;
    });
  }

  refreshvehicleNoRootList() {
    this.vhNoRtSvc.getVeNoRtList().subscribe(data => {
      this.vehicleNoRootList = data;
    });
  }

  //siblings details 

  getControls() {
    return (this.studentOtherDetailsForm.get('sibling') as FormArray).controls;
  }

  addsibling() {
    debugger;
    const control = <FormArray>this.studentOtherDetailsForm.controls['sibling'];
    control.push(
      new FormGroup({
        Sibling_name: new FormControl(''),
        Sibling_class: new FormControl('')
      })
    )
  }

  removesibling(index: any) {
    const control = <FormArray>this.studentOtherDetailsForm.controls['sibling'];
    control.removeAt(index);
  }

  studentOtherDetailsForm = new FormGroup({
    l_class: new FormControl(''),
    l_school: new FormControl(''),
    l_stream: new FormControl(''),
    l_medium: new FormControl(''),
    cuid: new FormControl(1),
    sibling_status: new FormControl(''),
    sibling: new FormArray([
      new FormGroup({
        Sibling_name: new FormControl(''),
        Sibling_class: new FormControl('')
      })
    ]),

  })

  newstudentOtherDetailss() {
    debugger;
    let searchAdmissionNo = (this.studentDetailsForm.value.admission_no);
    if (this.studentOtherDetailsForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            debugger;
            var studentinsert = (this.studentOtherDetailsForm.value);
            this.studProSvc.studentOtherDetails(studentinsert, searchAdmissionNo).subscribe(res => {
              if (res.status == 'Saved successfully') {
                debugger;
                this.notificationSvc.success("Saved Success");
                this.resStatus3 = true;
              }
              else {
                this.notificationSvc.error("Error");
              }
            });
          }
        });
    }
    else {
      this.studentOtherDetailsForm.markAllAsTouched();

    }
  }

  ////////////
  studentCertificateForm = new FormGroup({
    birth_xerox: new FormControl(false),
    birth_original: new FormControl(false),
    birth_date_submission: new FormControl(''),
    community_xerox: new FormControl(false),
    community_original: new FormControl(false),
    community_date_submission: new FormControl(''),
    tc_xerox: new FormControl(false),
    tc_original: new FormControl(false),
    tc_date_submission: new FormControl(''),
    cuid: new FormControl(1),
  })

  newstudentCertificateDetailss() {
    debugger;
    let searchAdmissionNo = (this.studentDetailsForm.value.admission_no);
    if (this.studentCertificateForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            debugger;
            var studentinsert = (this.studentCertificateForm.value);
            this.studProSvc.studentCertificateDetails(studentinsert, searchAdmissionNo).subscribe(res => {
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved Success");
                this.resStatus4 = true;
                this.cancelClick();
              }
              else {
                this.notificationSvc.error("Error");
              }
            });
          }
        });
    }
    else {
      this.studentOtherDetailsForm.markAllAsTouched();

    }
  }

  cancelClick() {

    this.studentDetailsForm.reset();
    this.studentPersonalDetailsForm.reset();
    this.studentOtherDetailsForm.reset();
    this.studentCertificateForm.reset();

    this.studentDetailsForm.get('profileid')?.setValue(0);
    this.studentDetailsForm.get('simage')?.setValue('');
    this.editableImage = '';
    this.files = [];
    this.studentDetailsForm.get('date')?.setValue(this.today);
    this.studentDetailsForm.get('enquiry_no')?.setValue('');
    this.studentDetailsForm.get('admission_no')?.setValue('');
    this.studentDetailsForm.get('batch_year')?.setValue('');
    this.studentDetailsForm.get('classid')?.setValue(null);
    this.studentDetailsForm.get('groupid')?.setValue(0);
    this.studentDetailsForm.get('sectionid')?.setValue(0);
    this.studentDetailsForm.get('mark_10')?.setValue('');
    this.studentDetailsForm.get('roll_no')?.setValue('');
    this.studentDetailsForm.get('emis_no')?.setValue('');
    this.studentDetailsForm.get('aadhar')?.setValue('');
    this.studentDetailsForm.get('student_name')?.setValue('');
    this.studentDetailsForm.get('student_name_t')?.setValue('');
    this.studentDetailsForm.get('dob')?.setValue('');
    this.studentDetailsForm.get('gender')?.setValue('');
    this.studentDetailsForm.get('nationality')?.setValue('');
    this.studentDetailsForm.get('religion')?.setValue('');
    this.studentDetailsForm.get('community')?.setValue('');
    this.studentDetailsForm.get('caste')?.setValue('');
    this.studentDetailsForm.get('newstudent')?.setValue('');
    this.studentDetailsForm.get('feesless')?.setValue('');
    this.studentDetailsForm.get('stay_type')?.setValue('Day scholar');
    this.studentDetailsForm.get('vehicle_type')?.setValue('');
    this.studentDetailsForm.get('root_no')?.setValue(0);
    this.studentDetailsForm.get('boading_place')?.setValue('');
    this.studentDetailsForm.get('busdistance')?.setValue('');
    this.studentDetailsForm.get('cuid')?.setValue(0);
    const control1 = <FormArray>this.studentDetailsForm.controls['busFeesList'];
    while (control1.length !== 0) {
      control1.removeAt(0)
    }
    const control2 = <FormArray>this.studentDetailsForm.controls['admissionFeesList'];
    while (control2.length !== 0) {
      control2.removeAt(0)
    }
    const control3 = <FormArray>this.studentDetailsForm.controls['commonFeesList'];
    while (control3.length !== 0) {
      control3.removeAt(0)
    }


    this.studentPersonalDetailsForm.get('bloodgroup')?.setValue('');
    this.studentPersonalDetailsForm.get('phy_challanged')?.setValue('');
    this.studentPersonalDetailsForm.get('i_m_1')?.setValue('');
    this.studentPersonalDetailsForm.get('i_m_2')?.setValue('');
    this.studentPersonalDetailsForm.get('father_name')?.setValue('');
    this.studentPersonalDetailsForm.get('f_occupation')?.setValue('');
    this.studentPersonalDetailsForm.get('f_qualification')?.setValue('');
    this.studentPersonalDetailsForm.get('f_ph')?.setValue('');
    this.studentPersonalDetailsForm.get('f_email')?.setValue('');
    this.studentPersonalDetailsForm.get('mother_name')?.setValue('');
    this.studentPersonalDetailsForm.get('m_occupation')?.setValue('');
    this.studentPersonalDetailsForm.get('m_qualification')?.setValue('');
    this.studentPersonalDetailsForm.get('m_ph')?.setValue('');
    this.studentPersonalDetailsForm.get('p_address')?.setValue('');
    this.studentPersonalDetailsForm.get('c_address')?.setValue('');
    this.studentPersonalDetailsForm.get('cuid')?.setValue(0);


    this.studentOtherDetailsForm.get('l_class')?.setValue('');
    this.studentOtherDetailsForm.get('l_school')?.setValue('');
    this.studentOtherDetailsForm.get('l_stream')?.setValue('');
    this.studentOtherDetailsForm.get('l_medium')?.setValue('');
    this.studentOtherDetailsForm.get('cuid')?.setValue(0);
    this.studentOtherDetailsForm.get('sibling_status')?.setValue('');
    const control4 = <FormArray>this.studentOtherDetailsForm.controls['sibling'];
    while (control4.length !== 0) {
      control4.removeAt(0)
    }


    this.studentCertificateForm.get('birth_xerox')?.setValue(false);
    this.studentCertificateForm.get('birth_original')?.setValue(false);
    this.studentCertificateForm.get('birth_date_submission')?.setValue('');
    this.studentCertificateForm.get('community_xerox')?.setValue(false);
    this.studentCertificateForm.get('community_original')?.setValue(false);
    this.studentCertificateForm.get('community_date_submission')?.setValue('');
    this.studentCertificateForm.get('tc_xerox')?.setValue(false);
    this.studentCertificateForm.get('tc_original')?.setValue(false);
    this.studentCertificateForm.get('tc_date_submission')?.setValue('');
    this.studentCertificateForm.get('cuid')?.setValue(0);

    this.resStatus1 = false;
    this.resStatus2 = false;
    this.resStatus3 = false;
    this.resStatus4 = false;

    this.GetActiveBatchYear();
    this.getMaxId();
  }
}
