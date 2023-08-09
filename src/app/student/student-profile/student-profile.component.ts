import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { VehiclePlaceService } from 'src/app/api-service/VehiclePlace.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { studentProfileService } from 'src/app/api-service/studentProfile.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  files: File[] = []; //used to bring the photo as a o/p in front design

  PlaceList:any=[];
  placefilterList : any[]=[];


  ClassList: any[] = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  FeesLessList: any = [];
  groupDisplay: boolean = true;
  assignbuttonId: boolean = true;
  storedValue: any;

  //admissionNo:any = "000"+1;
  


  constructor(private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private FlSvc: FeesLessService,
    private studProSvc: studentProfileService,
    private PlaceSvc: VehiclePlaceService,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef) { }


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


    ////////////
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.refreshFeesLessList();
    this.refreshvehiclePlaceList();
       
    //this.cancelclick();
    this.setvalueform();

    //this.admissionNo();
  }

  // admissionNo() {
  //   this.refreshvehiclePlaceList();
  //   debugger;
  //   let admisionNo;
  //   //let adNo=this.ClassList[0].classid as any;

  //   console.log("clas"+this.PlaceList)
  //   // if(this.ClassList[0].classid.length < 10){
  //   //   admisionNo ="0000"+this.ClassList[0].classid

  //   //   this.studentProfileForm.get('admission_no')?.setValue(admisionNo)
  //   // }
  //   // else if(this.ClassList[0].classid.length < 100){
  //   //   admisionNo ="000"+this.ClassList[0].classid
  //   // }
  // }

  ngxSpinner: any;

  onSelect(event: any) {

    this.files.push(...event.addedFiles);
    if (this.files.length > 1) { // checking if files array has more than one content
      this.replaceFile(); // replace file
    }
    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[0]);
    }

  }
  replaceFile() {
    this.files.splice(0, 1); // index =0 , remove_count = 1
  }
/////////
  setvalueform(){
    var storedValues: any = sessionStorage.getItem("selectd");
    var myObj = JSON.parse(storedValues);
    this.studentProfileForm.patchValue(myObj)
    var split = myObj.dob.split('T');
    this.studentProfileForm.get('dob')?.setValue(split[0]);
    this.studentProfileForm.get('classid')?.setValue(myObj.s_admission);
    //this.studentProfileForm.get('groupid')?.setValue(myObj.s_group);
    
    this.refershcancelclick();
  }

  refreshvehiclePlaceList() {
    this.PlaceSvc.getPlaceList().subscribe(data => {
      this.PlaceList = data;
    });
  }

  filterPlaceNo(no:any){
      this.placefilterList = this.PlaceList.filter((e: any) =>  e.place == no);
      let root=this.placefilterList[0].root_no as any;
    this.studentProfileForm.get('root_no')?.setValue(root)
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
    this.ScSvc.getSectionList().subscribe(data => {
      this.SectionList = data;
    });
  }

  filterGroupfun(classsid: any) {
    debugger;
    const classid = Number(classsid);
    this.studentProfileForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentProfileForm.get('groupid')?.setValue(0);
    this.studentProfileForm.get('sectionid')?.setValue(0);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentProfileForm.get('sectionid')?.setValue(0);
    }
    else {
      this.groupDisplay = true;
      this.studentProfileForm.get('sectionid')?.setValue(0);
    }
  }

  filterSectionfun(groupID: any) {
    debugger;
    const groupid = Number(groupID);
    this.studentProfileForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentProfileForm.get('sectionid')?.setValue(0);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  refreshFeesLessList() {
    this.FlSvc.getfeesLessList().subscribe(data => {
      this.FeesLessList = data;
    });
  }




  onFileChange(event:any, field:any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // just checking if it is an image, ignore if you want
      if (!file.type.startsWith('img')) {
        this.studentProfileForm.get(field)?.setErrors({
          required: true
        });
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.studentProfileForm.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }};


   

  studentProfileForm = new FormGroup({
    profileid: new FormControl(0),
    enquiryid: new FormControl(null,[Validators.required]),
    admission_no: new FormControl('',[Validators.required]),
    roll_no: new FormControl('',[Validators.required]),
    classid: new FormControl(0),
    groupid: new FormControl(0),
    sectionid: new FormControl(0),
    mark_10: new FormControl(''),
    emis_no: new FormControl('',[Validators.required]),
    aadhar: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    student_name: new FormControl('',[Validators.required]),
    student_name_t: new FormControl('',[Validators.required]),
    dob: new FormControl(''),
    phy_challanged: new FormControl(''),
    nationality: new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z]+)$/)]),
    religion: new FormControl('',[Validators.required]),
    community: new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+)$/)]),
    caste: new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+)$/)]),
    bloodgroup: new FormControl('',[Validators.required]),
    place: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    feesless: new FormControl(''),
    rt_student: new FormControl(''),
    i_m_1: new FormControl('',[Validators.required]),
    i_m_2: new FormControl('',[Validators.required]),
    l_class: new FormControl(''),
    l_school: new FormControl(''),
    l_stream: new FormControl(''),
    l_medium: new FormControl(''),
    sibling_status: new FormControl(''),
    sibling_name: new FormControl(''),
    sibling_classid: new FormControl(0),
    bus_status: new FormControl(''),
    boading_place: new FormControl(''),
    root_no: new FormControl(''),
    dayscholar: new FormControl(''),
    hostel: new FormControl(''),
    father_name: new FormControl('',[Validators.required]),
    f_occupation: new FormControl(''),
    f_qualification: new FormControl(''),
    f_ph: new FormControl('',[Validators.required]),
    f_email: new FormControl(''),
    mother_name: new FormControl('',[Validators.required]),
    m_occupation: new FormControl(''),
    m_qualification: new FormControl(''),
    m_ph: new FormControl(''),
    birth_xerox: new FormControl(false),
    birth_original: new FormControl(false),
    birth_date_submission: new FormControl(this.today),
    community_xerox: new FormControl(false),
    community_original: new FormControl(false),
    community_date_submission: new FormControl(this.today),
    tc_xerox: new FormControl(false),
    tc_original: new FormControl(false),
    tc_date_submission: new FormControl(this.today),
    img: new FormControl(''),
    cuid: new FormControl(1)
  })


  newEnquiry() {
    debugger;
    if (this.studentProfileForm.valid) {
      if (this.studentProfileForm.value.profileid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              debugger;
              var studentinsert = (this.studentProfileForm.value);
              this.studProSvc.addNewStudent(studentinsert).subscribe(res => {
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  //this.getMaxId();
                  this.cancelclick();
                }
              });
            }
          });
      }
      else if (this.studentProfileForm.value.profileid != 0) {
      }
    }
    else {
      this.studentProfileForm.markAllAsTouched();
      alert();
    }

  }

  refershcancelclick() {
    sessionStorage.removeItem("selectd");
    this.studentProfileForm.get('birth_date_submission')?.setValue(this.today);
    this.studentProfileForm.get('community_xerox')?.setValue(false);
    this.studentProfileForm.get('community_original')?.setValue(false);
    this.studentProfileForm.get('community_date_submission')?.setValue(this.today);
    this.studentProfileForm.get('tc_xerox')?.setValue(false);
    this.studentProfileForm.get('tc_original')?.setValue(false);
    this.studentProfileForm.get('tc_date_submission')?.setValue(this.today);
  }
  cancelclick() {
    sessionStorage.removeItem("selectd");
    this.studentProfileForm.reset();
    this.studentProfileForm.get('profileid')?.setValue(0);
    this.studentProfileForm.get('enquiryid')?.setValue(null);
    this.studentProfileForm.get('admission_no')?.setValue('');
    this.studentProfileForm.get('roll_no')?.setValue('');
    this.studentProfileForm.get('classid')?.setValue(0);
    this.studentProfileForm.get('groupid')?.setValue(0);
    this.studentProfileForm.get('sectionid')?.setValue(0);
    this.studentProfileForm.get('mark_10')?.setValue('');
    this.studentProfileForm.get('emis_no')?.setValue('');
    this.studentProfileForm.get('aadhar')?.setValue('');
    this.studentProfileForm.get('gender')?.setValue('');
    this.studentProfileForm.get('student_name')?.setValue('');
    this.studentProfileForm.get('student_name_t')?.setValue('');
    this.studentProfileForm.get('dob')?.setValue('');
    this.studentProfileForm.get('phy_challanged')?.setValue('');
    this.studentProfileForm.get('nationality')?.setValue('');
    this.studentProfileForm.get('religion')?.setValue('');
    this.studentProfileForm.get('community')?.setValue('');
    this.studentProfileForm.get('caste')?.setValue('');
    this.studentProfileForm.get('bloodgroup')?.setValue('');
    this.studentProfileForm.get('place')?.setValue('');
    this.studentProfileForm.get('address')?.setValue('');
    this.studentProfileForm.get('feesless')?.setValue('');
    this.studentProfileForm.get('rt_student')?.setValue('');
    this.studentProfileForm.get('i_m_1')?.setValue('');
    this.studentProfileForm.get('i_m_2')?.setValue('');
    this.studentProfileForm.get('l_class')?.setValue('');
    this.studentProfileForm.get('l_school')?.setValue('');
    this.studentProfileForm.get('l_stream')?.setValue('');
    this.studentProfileForm.get('l_medium')?.setValue('');
    this.studentProfileForm.get('sibling_status')?.setValue('');
    this.studentProfileForm.get('sibling_name')?.setValue('');
    this.studentProfileForm.get('sibling_classid')?.setValue(0);
    this.studentProfileForm.get('bus_status')?.setValue('');
    this.studentProfileForm.get('boading_place')?.setValue('');
    this.studentProfileForm.get('root_no')?.setValue('');
    this.studentProfileForm.get('dayscholar')?.setValue('');
    this.studentProfileForm.get('hostel')?.setValue('');
    this.studentProfileForm.get('father_name')?.setValue('');
    this.studentProfileForm.get('f_occupation')?.setValue('');
    this.studentProfileForm.get('f_qualification')?.setValue('');
    this.studentProfileForm.get('f_ph')?.setValue('');
    this.studentProfileForm.get('f_email')?.setValue('');
    this.studentProfileForm.get('mother_name')?.setValue('');
    this.studentProfileForm.get('m_occupation')?.setValue('');
    this.studentProfileForm.get('m_qualification')?.setValue('');
    this.studentProfileForm.get('m_ph')?.setValue('');
    this.studentProfileForm.get('birth_xerox')?.setValue(false);
    this.studentProfileForm.get('birth_original')?.setValue(false);
    this.studentProfileForm.get('birth_date_submission')?.setValue(this.today);
    this.studentProfileForm.get('community_xerox')?.setValue(false);
    this.studentProfileForm.get('community_original')?.setValue(false);
    this.studentProfileForm.get('community_date_submission')?.setValue(this.today);
    this.studentProfileForm.get('tc_xerox')?.setValue(false);
    this.studentProfileForm.get('tc_original')?.setValue(false);
    this.studentProfileForm.get('tc_date_submission')?.setValue(this.today);
    this.studentProfileForm.get('img')?.setValue('');
    this.studentProfileForm.get('cuid')?.setValue(1);    
  }

}
