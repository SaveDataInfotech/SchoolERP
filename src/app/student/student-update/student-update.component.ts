import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { VehicleNoRootService } from 'src/app/api-service/VehicleNoRoot.service';
import { VehiclePlaceService } from 'src/app/api-service/VehiclePlace.service';
import { VehicleTypeService } from 'src/app/api-service/VehicleType.service';
import { BusFeesAssignService } from 'src/app/api-service/busFeesAssign.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { studentProfileService } from 'src/app/api-service/studentProfile.service';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss']
})
export class StudentUpdateComponent implements OnInit {
  files: File[] = [];
  editableImage: any;
  file: any;
  base64textString: any[] = [];
  userID: number = Number(localStorage.getItem("userid"));
  ClassList: any[];
  GroupList: any[];
  SectionList: any[];
  updatesectionFilterlist: any[];
  updategroupFilterlist: any[] = [];
  StudentDataList: any[] = [];
  allSibilingsList: any[] = [];

  vehicleTypeList: any[] = [];
  groupBusFeeList: any[] = [];
  kmFillterList: any[] = [];
  vehicleNoRootList: any = [];
  PlaceList: any = [];
  placefilterList: any[] = [];
  FeesLessList: any = [];
  constructor(
    private router: Router,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private studProSvc: studentProfileService,
    private VhtySvc: VehicleTypeService,
    private busFeSvc: BusFeesAssignService,
    private vhNoRtSvc: VehicleNoRootService,
    private PlaceSvc: VehiclePlaceService,
    private FlSvc: FeesLessService,
  ) { }

  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    //this.getAllSibilings();

    this.refreshvehicleTypeList();
    this.refresgroupBusFeeList();
    this.refreshvehicleNoRootList();
    this.refreshvehiclePlaceList();
    this.refreshFeesLessList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

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


  refresgroupBusFeeList() {
    this.busFeSvc.getGroupBusFeesList().subscribe(data => {
      this.groupBusFeeList = data;
    });
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

  refreshSectionList() {
    this.ScSvc.getSectionList().subscribe(data => {
      this.SectionList = data;
    });
  }

  // getAllSibilings() {
  //   this.studProSvc.getallSibilings().subscribe(data => {
  //     this.allSibilingsList = data;
  //   });
  // }

  //image
  deleteImage() {
    this.files = [];
    this.editableImage = null;
    this.base64textString = [];
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
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
    this.files.splice(0, 1);
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


  refreshvehicleTypeList() {
    this.VhtySvc.getvehicleTypeList().subscribe(data => {
      this.vehicleTypeList = data;
    });
  }
  refreshvehicleNoRootList() {
    this.vhNoRtSvc.getVeNoRtList().subscribe(data => {
      this.vehicleNoRootList = data;
    });
  }

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


  //get class details
  updatefilterGroupfun(classsid: any) {
    const classid = Number(classsid);
    this.studentDetailsForm.get('classid')?.setValue(classid);
    this.updategroupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentDetailsForm.get('groupid')?.setValue(0);
    this.studentDetailsForm.get('sectionid')?.setValue(0);
    this.studentDetailsForm.get('mark_10')?.setValue('');
    if (this.updategroupFilterlist.length == 0) {
      this.updatesectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentDetailsForm.get('sectionid')?.setValue(0);
      this.studentDetailsForm.get('mark_10')?.setValue('');
    }
    else {
      this.studentDetailsForm.get('sectionid')?.setValue(0);
      this.studentDetailsForm.get('mark_10')?.setValue('');
    }
  }

  updatefilterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.studentDetailsForm.get('groupid')?.setValue(groupid);
    this.updatesectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentDetailsForm.get('sectionid')?.setValue(0);
  }


  async findStudentByAdNO(value) {

    await this.cancelClick();

    this.studProSvc.searchstudentDetails(value).subscribe(data => {
      this.StudentDataList = data;
      const datas: any = this.StudentDataList[0]
      if (this.StudentDataList.length != 0) {
        this.editableImage = datas.simage;
        const classid = Number(datas.classid);
        this.studentDetailsForm.get('classid')?.setValue(classid);
        this.updategroupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
        this.studentDetailsForm.get('groupid')?.setValue(datas.groupid);
        this.updatesectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == datas.groupid && e.classid == classid });
        this.studentDetailsForm.get('sectionid')?.setValue(datas.sectionid);
        if (this.updategroupFilterlist.length == 0) {
          this.updatesectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
          this.studentDetailsForm.get('sectionid')?.setValue(datas.sectionid);
        }
        else {
          this.studentDetailsForm.get('sectionid')?.setValue(0);
        }
        this.studentDetailsForm.patchValue(this.StudentDataList[0]);

        const vhType = this.studentDetailsForm.value.vehicle_type
        this.kmFillterList = this.groupBusFeeList.filter((e) => {
          return e.typeid == vhType
        });

        const idn = this.studentDetailsForm.value.root_no

        this.placefilterList = this.PlaceList.filter((e: any) => { return e.root_no == idn });

        const control = <FormArray>this.studentDetailsForm.controls['sibling'];

        while (control.length !== 0) {
          control.removeAt(0)
        }
        if (control.length == 0) {
          const sibiling = this.allSibilingsList.filter((e) => {
            return e.admission_no == value && e.isactive == 1
          });
          sibiling.forEach((e) => {
            control.push(
              new FormGroup({
                siblingid: new FormControl(e.siblingid),
                Sibling_name: new FormControl(e.sibling_name),
                Sibling_class: new FormControl(e.sibling_class)
              })
            )
          }
          )
        }
      }
      else {
        this.notificationSvc.error("Invalid Admission No")
      }
    });
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
    sectionid: new FormControl(0),
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
    fees_lessid: new FormControl(null),
    stay_type: new FormControl(''),
    vehicle_type: new FormControl(0),
    root_no: new FormControl(0),
    boading_place: new FormControl(''),
    busdistance: new FormControl(''),
    bloodgroup: new FormControl(''),
    phy_challanged: new FormControl(''),
    i_m_1: new FormControl(''),
    i_m_2: new FormControl(''),
    father_name: new FormControl(''),
    f_occupation: new FormControl(''),
    f_qualification: new FormControl(''),
    f_ph: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
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
    cuid: new FormControl(this.userID),
  });

  updateStudent() {
    if (this.studentDetailsForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            var studentinsert = (this.studentDetailsForm.value);
            this.studProSvc.studentDetails(studentinsert).subscribe(res => {
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved Success");
                // this.getAllSibilings();
                this.cancelClick();
              }
              else {
                this.notificationSvc.error("Error")
              }
            });
          }
        });
    }
    else {
      this.studentDetailsForm.markAllAsTouched();
      this.notificationSvc.error("Fill in the manatory fileds")
    }
  }

  //siblings details 
  getControls() {
    return (this.studentDetailsForm.get('sibling') as FormArray).controls;
  }
  addsibling() {
    const control = <FormArray>this.studentDetailsForm.controls['sibling'];
    control.push(
      new FormGroup({
        siblingid: new FormControl(0),
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
    this.studentDetailsForm.get('profileid')?.setValue(0);
    this.studentDetailsForm.get('simage')?.setValue('');
    this.studentDetailsForm.get('date')?.setValue('');
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
    this.studentDetailsForm.get('l_classid')?.setValue(0);
    this.studentDetailsForm.get('l_school')?.setValue('');
    this.studentDetailsForm.get('l_stream')?.setValue('');
    this.studentDetailsForm.get('l_medium')?.setValue('');
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
    this.studentDetailsForm.get('cuid')?.setValue(this.userID);

    this.editableImage = '';
    this.files = [];
  }
}