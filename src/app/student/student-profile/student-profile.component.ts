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
import { VehicleNoRootService } from 'src/app/api-service/VehicleNoRoot.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GeneralFeesService } from 'src/app/api-service/generalFees.service';
import { SpecialFeesService } from 'src/app/api-service/specialFees.service';
import { VehicleTypeService } from 'src/app/api-service/VehicleType.service';
import { BusFeesAssignService } from 'src/app/api-service/busFeesAssign.service';
import { SpecialBusFeesAssignService } from 'src/app/api-service/specialBusFee.service';
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
  kmFillterList: any = [];
  groupDisplay: boolean = true;
  //assignbuttonId: boolean = true;
  storedValue: any;
  FeesTypeAssignFillterList: any = [];
  vehicleNoRootList: any = [];
  //searchStudentData: any = [];
  maxIDList: any[] = [];
  maxnumber: number;
  admissionno: string;
  activeBatchYear: any = [];
  newgetbatch: string;
  generalFeesList: any[] = [];
  specialFeesList: any[] = [];
  groupBusFeeList: any[] = [];
  busFeeList: any[] = [];
  vehicleTypeList: any[] = [];
  specialBusFeesList: any[] = [];
  constructor(private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private FlSvc: FeesLessService,
    private studProSvc: studentProfileService,
    private PlaceSvc: VehiclePlaceService,
    private vhNoRtSvc: VehicleNoRootService,
    private batchSvc: BatechYearService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private genFeesSvc: GeneralFeesService,
    private spFSvc: SpecialFeesService,
    private VhtySvc: VehicleTypeService,
    private busFeSvc: BusFeesAssignService,
    private spBusSvc: SpecialBusFeesAssignService,) { }


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
    this.refreshvehicleNoRootList();
    this.refreshBusFeeList();
    this.refreshSpecialBusFeeList();
    this.refresgroupBusFeeList();
    this.refreshGeneralFeesList();
    this.refreshSpecialFeesList();
    this.refreshvehicleTypeList();
    this.GetActiveBatchYear();
    this.getMaxId();
    setTimeout(() => {
      this.setvalueform();
    }, 1000);
  }
  setvalueform() {

    var storedValues: any = sessionStorage.getItem("selectd");
    var myObj = JSON.parse(storedValues);
    this.studentDetailsForm.patchValue(myObj);
    this.studentDetailsForm.patchValue(myObj);
    this.studentDetailsForm.get('newstudent').setValue('Yes');

    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == this.studentDetailsForm.value.classid });
    this.filterSectionfun(this.studentDetailsForm.value.groupid);
    if (this.groupFilterlist.length == 0) {
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == this.studentDetailsForm.value.classid });
    }
    this.spinner.hide();
  }

  //// Number Only Event
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

  refreshvehicleTypeList() {
    this.VhtySvc.getvehicleTypeList().subscribe(data => {
      this.vehicleTypeList = data;
    });
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

    this.spinner.show();
    this.ScSvc.getSectionList().subscribe(data => {

      this.SectionList = data;
    });
  }

  filterGroupfun(classsid: any) {

    const classid = Number(classsid);
    this.studentDetailsForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentDetailsForm.get('groupid')?.setValue(0);
    this.studentDetailsForm.get('sectionid')?.setValue(null);
    // this.studentDetailsForm.get('mark_10')?.setValue('');
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentDetailsForm.get('sectionid')?.setValue(null);
      //this.studentDetailsForm.get('mark_10')?.setValue('');
    }
    else {
      this.groupDisplay = true;
      this.studentDetailsForm.get('sectionid')?.setValue(null);
      //this.studentDetailsForm.get('mark_10')?.setValue('');
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.studentDetailsForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentDetailsForm.get('sectionid')?.setValue(null);
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

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  feeAssignFun() {
    this.router.navigateByUrl('/app/master/fees_master');
  }

  studentDetailsForm = new FormGroup({
    profileid: new FormControl(0),
    simage: new FormControl(''),
    date: new FormControl(''),
    enquiry_no: new FormControl(''),
    admission_no: new FormControl(''),
    batch_year: new FormControl(''),
    classid: new FormControl(null),
    groupid: new FormControl(0),
    sectionid: new FormControl(null),
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
    newstudent: new FormControl('Yes'),
    feesless: new FormControl(''),
    stay_type: new FormControl(''),
    vehicle_type: new FormControl(0),
    root_no: new FormControl(0),
    boading_place: new FormControl(''),
    busdistance: new FormControl(''),
    busFeesList: new FormArray([
    ]),
    generalFees: new FormArray([
    ]),
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
    l_classid: new FormControl(0),
    l_school: new FormControl(''),
    l_stream: new FormControl(''),
    l_medium: new FormControl(''),
    sibling_status: new FormControl(''),
    sibling: new FormArray([
    ]),
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
  });

  get class() {
    return this.studentDetailsForm.get('classid');
  }

  getBusFeesControls() {
    return (this.studentDetailsForm.get('busFeesList') as FormArray).controls;
  }
  getgeneralFeesControls() {
    return (this.studentDetailsForm.get('generalFees') as FormArray).controls;
  }

  refreshGeneralFeesList() {
    this.genFeesSvc.getGeneralFeesList().subscribe(data => {
      debugger;
      this.generalFeesList = data;
    });
  }

  refreshSpecialFeesList() {
    this.spFSvc.getSpecialFeesList().subscribe(data => {
      debugger;
      this.specialFeesList = data;
    });
  }

  refresgroupBusFeeList() {
    this.busFeSvc.getGroupBusFeesList().subscribe(data => {
      debugger;
      this.groupBusFeeList = data;
    });
  }

  refreshBusFeeList() {
    this.busFeSvc.getBusFeesList().subscribe(data => {
      debugger;
      this.busFeeList = data;
    });
  }

  refreshSpecialBusFeeList() {
    this.spBusSvc.getSpecialBusFeesList().subscribe(data => {
      this.specialBusFeesList = data;
    });
  }

  searchKM() {
    debugger;
    const vhType = this.studentDetailsForm.value.vehicle_type
    this.kmFillterList = this.groupBusFeeList.filter((e) => {
      return e.typeid == vhType && e.batch_year == this.newgetbatch
    })
  }

  placeOfBo(vehicle_no_id: any) {

    let idn = Number(vehicle_no_id);
    this.studentDetailsForm.get('root_no')?.setValue(idn);
    this.placefilterList = this.PlaceList.filter((e: any) => { return e.root_no == idn });
  }

  getMaxId() {
    this.studProSvc.getMaxId().subscribe(data => {

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
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            {
              debugger;
              if (this.studentDetailsForm.value.vehicle_type != 0 && this.studentDetailsForm.value.stay_type == 'Day scholar') {
                debugger;
                const control = <FormArray>this.studentDetailsForm.controls['busFeesList'];
                while (control.length !== 0) {
                  control.removeAt(0)
                }

                if (this.studentDetailsForm.value.feesless == 'Not Specified' || this.studentDetailsForm.value.feesless == '' || this.studentDetailsForm.value.feesless == null) {
                  debugger;
                  const feesList = this.busFeeList.filter((e) => {
                    return e.classid == this.studentDetailsForm.value.classid
                      && e.batch_year == this.studentDetailsForm.value.batch_year
                      && e.typeid == this.studentDetailsForm.value.vehicle_type
                      && e.kmrange == this.studentDetailsForm.value.busdistance
                      && e.isactive == true
                  });

                  if (feesList.length != 0) {
                    feesList.forEach(element => {
                      const control = <FormArray>this.studentDetailsForm.controls['busFeesList'];
                      control.push(
                        new FormGroup({
                          busfeeid: new FormControl(element.busfeeid),
                          admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                          classid: new FormControl(this.studentDetailsForm.value.classid),
                          groupid: new FormControl(this.studentDetailsForm.value.groupid),
                          sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                          gender: new FormControl(this.studentDetailsForm.value.gender),
                          date: new FormControl(this.studentDetailsForm.value.date),
                          batch_year: new FormControl(this.studentDetailsForm.value.batch_year),
                          typeid: new FormControl(element.typeid),
                          kmrange: new FormControl(element.kmrange)
                        })
                      )
                    });
                  }
                  else {
                    this.notificationSvc.error('No Bus fee details have been declare for this student! Please visit Bus fee Master');
                    return;
                  }
                }
                else {
                  debugger;
                  const feesList = this.specialBusFeesList.filter((e) => {
                    return e.classid == this.studentDetailsForm.value.classid
                      && e.batch_year == this.studentDetailsForm.value.batch_year
                      && e.typeid == this.studentDetailsForm.value.vehicle_type
                      && e.kmrange == this.studentDetailsForm.value.busdistance
                      && e.less_type == this.studentDetailsForm.value.feesless
                      && e.isactive == true
                  });

                  if (feesList.length != 0) {
                    feesList.forEach(element => {
                      const control = <FormArray>this.studentDetailsForm.controls['busFeesList'];
                      control.push(
                        new FormGroup({
                          busfeeid: new FormControl(element.s_busfeeid),
                          admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                          classid: new FormControl(this.studentDetailsForm.value.classid),
                          groupid: new FormControl(this.studentDetailsForm.value.groupid),
                          sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                          gender: new FormControl(this.studentDetailsForm.value.gender),
                          date: new FormControl(this.studentDetailsForm.value.date),
                          batch_year: new FormControl(this.studentDetailsForm.value.batch_year),
                          typeid: new FormControl(element.typeid),
                          fess_lessid: new FormControl(element.fess_lessid),
                          kmrange: new FormControl(element.kmrange)
                        })
                      )
                    });
                  }
                  else {
                    this.notificationSvc.error('No special Bus fee details have been declare for this student! Please visit special Bus fee Master');
                    return;
                  }
                }
              }
              else {
                debugger;
                this.studentDetailsForm.get('vehicle_type')?.setValue(0);
                this.studentDetailsForm.get('root_no')?.setValue(0);
                this.studentDetailsForm.get('boading_place')?.setValue('');
                this.studentDetailsForm.get('busdistance')?.setValue('');
                const control = <FormArray>this.studentDetailsForm.controls['busFeesList'];
                while (control.length !== 0) {
                  control.removeAt(0)
                }
              }
            }

            {
              debugger;
              const control = <FormArray>this.studentDetailsForm.controls['generalFees'];
              while (control.length !== 0) {
                control.removeAt(0)
              }
              if (control.length == 0) {
                debugger;
                if (this.studentDetailsForm.value.feesless == 'Not Specified' || this.studentDetailsForm.value.feesless == '' || this.studentDetailsForm.value.feesless == null) {
                  if (this.studentDetailsForm.value.newstudent == 'No') {
                    let generalfeeList = this.generalFeesList.filter((e) => {
                      return e.classid == this.studentDetailsForm.value.classid
                        && e.groupid == this.studentDetailsForm.value.groupid
                        && e.batch_year == this.studentDetailsForm.value.batch_year
                        && e.isactive == true
                        && e.student_type != 'Admission Fees'
                    });

                    if (generalfeeList.length != 0) {
                      generalfeeList.forEach(element => {
                        debugger;
                        const control = <FormArray>this.studentDetailsForm.controls['generalFees'];
                        control.push(
                          new FormGroup({
                            admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                            assignid: new FormControl(element.assignid),
                            classid: new FormControl(this.studentDetailsForm.value.classid),
                            groupid: new FormControl(this.studentDetailsForm.value.groupid),
                            sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                            gender: new FormControl(this.studentDetailsForm.value.gender),
                            date: new FormControl(this.studentDetailsForm.value.date),
                            batch_year: new FormControl(element.batch_year),
                            typeid: new FormControl(element.typeid)
                          })
                        )
                      });
                    }
                    else {
                      this.notificationSvc.error('No general fee details have been declare for this student! Please visit general fee Master');
                      return;
                    }
                  }
                  else {
                    let generalfeeList = this.generalFeesList.filter((e) => {
                      return e.classid == this.studentDetailsForm.value.classid
                        && e.groupid == this.studentDetailsForm.value.groupid
                        && e.batch_year == this.studentDetailsForm.value.batch_year
                        && e.isactive == true
                    });

                    if (generalfeeList.length != 0) {
                      generalfeeList.forEach(element => {
                        debugger;
                        const control = <FormArray>this.studentDetailsForm.controls['generalFees'];
                        control.push(
                          new FormGroup({
                            admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                            assignid: new FormControl(element.assignid),
                            classid: new FormControl(this.studentDetailsForm.value.classid),
                            groupid: new FormControl(this.studentDetailsForm.value.groupid),
                            sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                            gender: new FormControl(this.studentDetailsForm.value.gender),
                            date: new FormControl(this.studentDetailsForm.value.date),
                            batch_year: new FormControl(element.batch_year),
                            typeid: new FormControl(element.typeid)
                          })
                        )
                      })
                    }
                    else {
                      this.notificationSvc.error('No general fee details have been declare for this student! Please visit general fee Master');
                      return;
                    }
                  }
                }
                else {
                  if (this.studentDetailsForm.value.newstudent == 'No') {
                    let specialfeeList = this.specialFeesList.filter((e) => {
                      return e.classid == this.studentDetailsForm.value.classid
                        && e.groupid == this.studentDetailsForm.value.groupid
                        && e.batch_year == this.studentDetailsForm.value.batch_year
                        && e.isactive == true
                        && e.student_type != 'Admission Fees'
                    });

                    if (specialfeeList.length != 0) {
                      specialfeeList.forEach(element => {
                        debugger;
                        const control = <FormArray>this.studentDetailsForm.controls['generalFees'];
                        control.push(
                          new FormGroup({
                            admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                            assignid: new FormControl(element.assignid),
                            classid: new FormControl(this.studentDetailsForm.value.classid),
                            groupid: new FormControl(this.studentDetailsForm.value.groupid),
                            sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                            gender: new FormControl(this.studentDetailsForm.value.gender),
                            date: new FormControl(this.studentDetailsForm.value.date),
                            batch_year: new FormControl(element.batch_year),
                            typeid: new FormControl(element.typeid),
                            fess_lessid: new FormControl(element.fess_lessid)
                          })
                        )
                      });
                    }
                    else {
                      this.notificationSvc.error('No special general fee details have been declare for this student! Please visit special general fee Master');
                      return;
                    }
                  }
                  else {
                    debugger;
                    let specialfeeList = this.specialFeesList.filter((e) => {
                      return e.classid == this.studentDetailsForm.value.classid
                        && e.groupid == this.studentDetailsForm.value.groupid
                        && e.batch_year == this.studentDetailsForm.value.batch_year
                        && e.isactive == true
                    });

                    if (specialfeeList.length != 0) {
                      specialfeeList.forEach(element => {
                        debugger;
                        const control = <FormArray>this.studentDetailsForm.controls['generalFees'];
                        control.push(
                          new FormGroup({
                            admission_no: new FormControl(this.studentDetailsForm.value.admission_no),
                            assignid: new FormControl(element.assignid),
                            classid: new FormControl(this.studentDetailsForm.value.classid),
                            groupid: new FormControl(this.studentDetailsForm.value.groupid),
                            sectionid: new FormControl(this.studentDetailsForm.value.sectionid),
                            gender: new FormControl(this.studentDetailsForm.value.gender),
                            date: new FormControl(this.studentDetailsForm.value.date),
                            batch_year: new FormControl(element.batch_year),
                            typeid: new FormControl(element.typeid),
                            fess_lessid: new FormControl(element.fess_lessid)
                          })
                        )
                      })
                    }
                    else {
                      this.notificationSvc.error('No special general fee details have been declare for this student! Please visit special general fee Master');
                      return;
                    }
                  }
                }
              }
              else {
                this.notificationSvc.error('Something Error')
              }
            }

            var studentinsert = (this.studentDetailsForm.value);
            console.log(this.studentDetailsForm)
            this.studProSvc.studentDetails(studentinsert).subscribe(res => {
              debugger;
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved Success");
                this.getMaxId();
                this.cancelClick();
                sessionStorage.removeItem('selectd');
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
    else {
      this.studentDetailsForm.markAllAsTouched();
      this.notificationSvc.error("Fill in the mandatory fields");
    }
  }

  /// Fees details List
  refreshvehiclePlaceList() {
    this.PlaceSvc.getPlaceList().subscribe(data => {
      this.PlaceList = data;
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
    return (this.studentDetailsForm.get('sibling') as FormArray).controls;
  }

  addsibling() {
    const control = <FormArray>this.studentDetailsForm.controls['sibling'];
    control.push(
      new FormGroup({
        Sibling_name: new FormControl(''),
        Sibling_class: new FormControl('')
      })
    )
  }

  removesibling(index: any) {
    const control = <FormArray>this.studentDetailsForm.controls['sibling'];
    control.removeAt(index);
  }

  cancelClick() {
    this.studentDetailsForm.reset();
    sessionStorage.removeItem('selectd');
    this.studentDetailsForm.get('profileid')?.setValue(0);
    this.studentDetailsForm.get('simage')?.setValue('');
    this.editableImage = '';
    this.files = [];
    this.studentDetailsForm.get('date')?.setValue(this.today);
    this.studentDetailsForm.get('enquiry_no')?.setValue('');
    this.studentDetailsForm.get('admission_no')?.setValue('');
    this.studentDetailsForm.get('batch_year')?.setValue(this.newgetbatch);
    this.studentDetailsForm.get('classid')?.setValue(null);
    this.studentDetailsForm.get('groupid')?.setValue(0);
    this.studentDetailsForm.get('sectionid')?.setValue(null);
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
    this.studentDetailsForm.get('newstudent')?.setValue('Yes');
    this.studentDetailsForm.get('feesless')?.setValue('');
    this.studentDetailsForm.get('stay_type')?.setValue('');
    this.studentDetailsForm.get('vehicle_type')?.setValue(0);
    this.studentDetailsForm.get('root_no')?.setValue(0);
    this.studentDetailsForm.get('boading_place')?.setValue('');
    this.studentDetailsForm.get('busdistance')?.setValue('');
    this.studentDetailsForm.get('cuid')?.setValue(0);
    const control1 = <FormArray>this.studentDetailsForm.controls['busFeesList'];
    while (control1.length !== 0) {
      control1.removeAt(0)
    }

    const control3 = <FormArray>this.studentDetailsForm.controls['generalFees'];
    while (control3.length !== 0) {
      control3.removeAt(0)
    }

    this.studentDetailsForm.get('bloodgroup')?.setValue('');
    this.studentDetailsForm.get('phy_challanged')?.setValue('');
    this.studentDetailsForm.get('i_m_1')?.setValue('');
    this.studentDetailsForm.get('i_m_2')?.setValue('');
    this.studentDetailsForm.get('father_name')?.setValue('');
    this.studentDetailsForm.get('f_occupation')?.setValue('');
    this.studentDetailsForm.get('f_qualification')?.setValue('');
    this.studentDetailsForm.get('f_ph')?.setValue('');
    this.studentDetailsForm.get('f_email')?.setValue('');
    this.studentDetailsForm.get('mother_name')?.setValue('');
    this.studentDetailsForm.get('m_occupation')?.setValue('');
    this.studentDetailsForm.get('m_qualification')?.setValue('');
    this.studentDetailsForm.get('m_ph')?.setValue('');
    this.studentDetailsForm.get('p_address')?.setValue('');
    this.studentDetailsForm.get('c_address')?.setValue('');
    this.studentDetailsForm.get('cuid')?.setValue(0);
    this.studentDetailsForm.get('l_classid')?.setValue(0);
    this.studentDetailsForm.get('l_school')?.setValue('');
    this.studentDetailsForm.get('l_stream')?.setValue('');
    this.studentDetailsForm.get('l_medium')?.setValue('');
    this.studentDetailsForm.get('cuid')?.setValue(0);
    this.studentDetailsForm.get('sibling_status')?.setValue('');
    const control4 = <FormArray>this.studentDetailsForm.controls['sibling'];
    while (control4.length !== 0) {
      control4.removeAt(0)
    }

    this.studentDetailsForm.get('birth_xerox')?.setValue(false);
    this.studentDetailsForm.get('birth_original')?.setValue(false);
    this.studentDetailsForm.get('birth_date_submission')?.setValue('');
    this.studentDetailsForm.get('community_xerox')?.setValue(false);
    this.studentDetailsForm.get('community_original')?.setValue(false);
    this.studentDetailsForm.get('community_date_submission')?.setValue('');
    this.studentDetailsForm.get('tc_xerox')?.setValue(false);
    this.studentDetailsForm.get('tc_original')?.setValue(false);
    this.studentDetailsForm.get('tc_date_submission')?.setValue('');
    this.studentDetailsForm.get('cuid')?.setValue(0);
    this.GetActiveBatchYear();
    this.getMaxId();
  }
}
