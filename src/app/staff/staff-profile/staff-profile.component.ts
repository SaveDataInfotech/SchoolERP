import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { StaffProfile } from 'src/app/Model/StaffProfile.model';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit {
  files: File[] = [];
  editableImage: any;
  file: any;
  base64textString: any[] = [];

  StaffTypeList: any[] = [];
  ClassList: any = [];

  staffList: any[] = [];
  staffFilterList: any[] = [];
  maxIDList:any[]=[];
  maxnumber:number;
  staffno:string;
  constructor(private SttySvc: staffTypeService,
    private ClassSvc: studentClassService,
    private notificationSvc: NotificationsService,
    private staffSvc: staffProfileService,
    private DialogSvc: DialogService,
  ) { }

  ngOnInit(): void {
    this.refreshstaffTypeList();
    this.refreshClassList();

    this.refreshStaffList();
    this.cancelClick();
    this.getMaxId();
  }
  ngxSpinner: any;
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
    this.staffProfileForm.img = this.base64textString[0];
  }

  //uplaod File
  getFile(event: any) {
    this.file = event.target.file[0];
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }

  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  staffProfileForm: StaffProfile = {
    id: 0,
    staff_no: '',
    staff_name: '',
    gender: '',
    img: '',
    dob: '',
    mobile: '',
    blood_group: '',
    qualification: '',
    designation: '',
    experience: '',
    pc: '',
    staff_type: '',
    major_subject: '',
    class_hand: '',
    join_date: '',
    rejoin: 'No',
    rejoin_date: '',
    f_name: '',
    m_name: '',
    s_address: '',
    sslc_x: false,
    sslc_o: false,
    sslc_date: '',
    hsc_x: false,
    hsc_o: false,
    hsc_date: '',
    ug_x: false,
    ug_o: false,
    ug_date: '',
    pg_x: false,
    pg_o: false,
    pg_date: '',
    bed_x: false,
    bed_o: false,
    bed_date: '',
    med_x: false,
    med_o: false,
    med_date: '',
    basic_pay: '',
    da: '',
    hra: '',
    allowance: '',
    total_salary: '',
    pf: 'Yes',
    epf: 'Yes',
    account_no: '',
    ifsc_code: '',
    bank_name: '',
    branch_name: '',
    reliving: 'No',
    reliving_date: '',
    activestatus: false,
    cuid: 0
  }

  onSubmit() {
    var staffProfileinsert = (this.staffProfileForm);
    this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.staffSvc.addNewstaff(staffProfileinsert).subscribe(res => {
            if (res.status == 'Saved successfully') {
              this.notificationSvc.success("Saved successfully")
              this.refreshStaffList();
              this.getMaxId();
              this.cancelClick();
              this.staffFilterList = null;
              this.files = [];
            }
            else if (res.status == 'Already exists') {
              this.notificationSvc.warn("Already exists")
            }
            else {
              this.notificationSvc.error("Something error")
            }
          })
        }
      })
  }



  ///////////////Update Staff Profile


  refreshStaffList() {
    this.staffSvc.getstaffProfileList().subscribe(data => {
      this.staffList = data;
      console.log('staff profile list'+this.staffList)
    });
  }

  getMaxId() {
    this.staffSvc.getMaxId().subscribe(data => {
      debugger;
      this.maxIDList = data;
      this.maxIDList.forEach(element => {
        this.maxnumber =element.id
      });

      var maxnum:string=String(this.maxnumber+1)
    if(maxnum.length==1)
    {
      this.staffno='000'+maxnum
      this.staffProfileForm.staff_no='000'+maxnum
    }
    else if(maxnum.length==2){
      this.staffno='00'+maxnum
      this.staffProfileForm.staff_no='00'+maxnum
    }
    else if(maxnum.length==3)
    {
      this.staffno='0'+maxnum
      this.staffProfileForm.staff_no='0'+maxnum
    }
    else{
      this.staffno=maxnum
      this.staffProfileForm.staff_no=maxnum
    }
    });
  }

  typeChange(type: any) {
    this.staffFilterList = this.staffList.filter((e) => { return e.staff_type == type })
  }

  noChange(no: any) {
    this.staffFilterList = this.staffList.filter((e) => { return e.staff_no == no })
  }
  editFun(staff: any) {
    this.staffProfileForm.id = staff.id;
    this.staffProfileForm.staff_no = staff.staff_no;
    this.staffProfileForm.staff_name = staff.staff_name;
    this.staffProfileForm.gender = staff.gender;
    this.staffProfileForm.img = staff.img;
    this.staffProfileForm.dob = staff.dob;
    this.staffProfileForm.mobile = staff.mobile;
    this.staffProfileForm.blood_group = staff.blood_group;
    this.staffProfileForm.qualification = staff.qualification;
    this.staffProfileForm.designation = staff.designation;
    this.staffProfileForm.experience = staff.experience;
    this.staffProfileForm.pc = staff.pc;
    this.staffProfileForm.staff_type = staff.staff_type;
    this.staffProfileForm.major_subject = staff.major_subject;
    this.staffProfileForm.class_hand = staff.class_hand;
    this.staffProfileForm.join_date = staff.join_date;
    this.staffProfileForm.rejoin = staff.rejoin;
    this.staffProfileForm.rejoin_date = staff.rejoin_date;
    this.staffProfileForm.f_name = staff.f_name;
    this.staffProfileForm.m_name = staff.m_name;
    this.staffProfileForm.s_address = staff.s_address;
    this.staffProfileForm.sslc_x = staff.sslc_x;
    this.staffProfileForm.sslc_o = staff.sslc_o;
    this.staffProfileForm.sslc_date = staff.sslc_date;
    this.staffProfileForm.hsc_x = staff.hsc_x;
    this.staffProfileForm.hsc_o = staff.hsc_o;
    this.staffProfileForm.hsc_date = staff.hsc_date;
    this.staffProfileForm.ug_x = staff.ug_x;
    this.staffProfileForm.ug_o = staff.ug_o;
    this.staffProfileForm.ug_date = staff.ug_date;
    this.staffProfileForm.pg_x = staff.pg_x;
    this.staffProfileForm.pg_o = staff.pg_o;
    this.staffProfileForm.pg_date = staff.pg_date;
    this.staffProfileForm.bed_x = staff.bed_x;
    this.staffProfileForm.bed_o = staff.bed_o;
    this.staffProfileForm.bed_date = staff.bed_date;
    this.staffProfileForm.med_x = staff.med_x;
    this.staffProfileForm.med_o = staff.med_o;
    this.staffProfileForm.med_date = staff.med_date;
    this.staffProfileForm.basic_pay = staff.basic_pay;
    this.staffProfileForm.da = staff.da;
    this.staffProfileForm.hra = staff.hra;
    this.staffProfileForm.allowance = staff.allowance;
    this.staffProfileForm.total_salary = staff.total_salary;
    this.staffProfileForm.pf = staff.pf;
    this.staffProfileForm.epf = staff.epf;
    this.staffProfileForm.account_no = staff.account_no;
    this.staffProfileForm.ifsc_code = staff.ifsc_code;
    this.staffProfileForm.bank_name = staff.bank_name;
    this.staffProfileForm.branch_name = staff.branch_name;
    this.staffProfileForm.reliving = staff.reliving;
    this.staffProfileForm.reliving_date = staff.reliving_date;
    this.editableImage = staff.img;
  }


  cancelClick() {
    this.getMaxId();
    this.refreshStaffList();
    this.staffProfileForm.id = 0;
    this.staffProfileForm.staff_no =  this.staffno;
    this.staffProfileForm.staff_name = '';
    this.staffProfileForm.gender = '';
    this.staffProfileForm.img = '';
    this.staffProfileForm.dob = '';
    this.staffProfileForm.mobile = '';
    this.staffProfileForm.blood_group = '';
    this.staffProfileForm.qualification = '';
    this.staffProfileForm.designation = '';
    this.staffProfileForm.experience = '';
    this.staffProfileForm.pc = '';
    this.staffProfileForm.staff_type = '';
    this.staffProfileForm.major_subject = '';
    this.staffProfileForm.class_hand = '';
    this.staffProfileForm.join_date = '';
    this.staffProfileForm.rejoin = 'No';
    this.staffProfileForm.rejoin_date = '';
    this.staffProfileForm.f_name = '';
    this.staffProfileForm.m_name = '';
    this.staffProfileForm.s_address = '';
    this.staffProfileForm.sslc_x = false;
    this.staffProfileForm.sslc_o = false;
    this.staffProfileForm.sslc_date = '';
    this.staffProfileForm.hsc_x = false;
    this.staffProfileForm.hsc_o = false;
    this.staffProfileForm.hsc_date = '';
    this.staffProfileForm.ug_x = false;
    this.staffProfileForm.ug_o = false;
    this.staffProfileForm.ug_date = '';
    this.staffProfileForm.pg_x = false;
    this.staffProfileForm.pg_o = false;
    this.staffProfileForm.pg_date = '';
    this.staffProfileForm.bed_x = false;
    this.staffProfileForm.bed_o = false;
    this.staffProfileForm.bed_date = '';
    this.staffProfileForm.med_x = false;
    this.staffProfileForm.med_o = false;
    this.staffProfileForm.med_date = '';
    this.staffProfileForm.basic_pay = '';
    this.staffProfileForm.da = '';
    this.staffProfileForm.hra = '';
    this.staffProfileForm.allowance = '';
    this.staffProfileForm.total_salary = '';
    this.staffProfileForm.pf = 'Yes';
    this.staffProfileForm.epf = 'Yes';
    this.staffProfileForm.account_no = '';
    this.staffProfileForm.ifsc_code = '';
    this.staffProfileForm.bank_name = '';
    this.staffProfileForm.branch_name = '';
    this.staffProfileForm.reliving = 'No';
    this.staffProfileForm.reliving_date = '';
    this.editableImage = '';
    this.files = [];
  }

}