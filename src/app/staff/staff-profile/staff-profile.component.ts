import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { staffCategoryService } from 'src/app/api-service/staffCategory.service';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';

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
  userID: number = Number(localStorage.getItem("userid"));
  StaffTypeList: any[] = [];

  staffFilterList: any[] = [];
  maxIDList: any[] = [];
  maxnumber: number;
  staffno: string;

  categoryList: any[] = [];
  constructor(private SttySvc: staffTypeService,
    private notificationSvc: NotificationsService,
    private stpSvc: staffProfileService,
    private staffSvc: staffProfileService,
    private DialogSvc: DialogService,
    private router: Router,
    private scSvc: staffCategoryService,
  ) { this.createForm() }

  ngOnInit(): void {
    this.refreshstaffTypeList();
    this.cancelClick();
    this.refreshstaffCategoryList()
  }

  deleteImage() {
    this.files = [];
    this.editableImage = null;
    this.base64textString = [];
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
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
    this.staffProfileForm.get('img')?.setValue(this.base64textString[0]);
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

  numberNotApplicable(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;
  }

  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {

      this.StaffTypeList = data;
    });
  }

  refreshstaffCategoryList() {
    this.scSvc.getCategoryList().subscribe(data => {
      this.categoryList = data;
    });
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  staffProfileForm: FormGroup;
  createForm() {
    this.staffProfileForm = new FormGroup({
      id: new FormControl(0),
      staff_typeid: new FormControl(null),
      category_id: new FormControl(null),
      staff_no: new FormControl(''),
      staff_name: new FormControl(''),
      gender: new FormControl(''),
      img: new FormControl(''),
      dob: new FormControl(''),
      mobile: new FormControl(''),
      blood_group: new FormControl(''),
      qualification: new FormControl(''),
      designation: new FormControl(''),
      experience: new FormControl(''),
      pc: new FormControl(''),
      major_subject: new FormControl(''),
      class_hand: new FormControl(''),
      join_date: new FormControl(''),
      rejoin: new FormControl('No'),
      rejoin_date: new FormControl(''),
      f_name: new FormControl(''),
      m_name: new FormControl(''),
      s_address: new FormControl(''),
      sslc_x: new FormControl(false),
      sslc_o: new FormControl(false),
      sslc_date: new FormControl(''),
      hsc_x: new FormControl(false),
      hsc_o: new FormControl(false),
      hsc_date: new FormControl(''),
      ug_x: new FormControl(false),
      ug_o: new FormControl(false),
      ug_date: new FormControl(''),
      pg_x: new FormControl(false),
      pg_o: new FormControl(false),
      pg_date: new FormControl(''),
      bed_x: new FormControl(false),
      bed_o: new FormControl(false),
      bed_date: new FormControl(''),
      med_x: new FormControl(false),
      med_o: new FormControl(false),
      med_date: new FormControl(''),
      basic_pay: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      da: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      hra: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      allowance: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      total_salary: new FormControl(''),
      pf: new FormControl(''),
      pfamount: new FormControl(''),
      pftype: new FormControl('automatic'),
      paymentmode: new FormControl('cash'),
      account_no: new FormControl(''),
      ifsc_code: new FormControl(''),
      bank_name: new FormControl(''),
      branch_name: new FormControl(''),
      reliving: new FormControl('No'),
      reliving_date: new FormControl(''),
      cuid: new FormControl(this.userID)
    })
  }

  onSubmit() {
    if (this.staffProfileForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(async res => {
          if (res == true) {
            await this.findStaffCode();
            var staffProfileinsert = (this.staffProfileForm.value);
            this.staffSvc.addNewstaff(staffProfileinsert).subscribe(res => {
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved successfully");
                this.cancelClick();
                this.staffFilterList = [];
                this.files = [];
              }
              else if (res.status == 'Already exists') {
                this.notificationSvc.warn("Staff No already exists ! Please save it again");
              }
              else {
                this.notificationSvc.error("Something error")
              }
            });
          }
        });
    }
    else {
      this.staffProfileForm.markAllAsTouched();
      this.notificationSvc.error('Fill in the Mandatory fileds')
    }
  }

  ///////////////Update Staff Profile


  typeChange(value) {
    this.stpSvc.getStaffByStaffID(value).subscribe(data => {
      this.staffFilterList = data
    })
  }


  findStaffCode() {
    const staffTypeid = this.staffProfileForm.value.staff_typeid
    const newStaffCode = this.StaffTypeList.filter((e) => { return e.staff_typeid == staffTypeid })
    const staffCd = newStaffCode[0].short_code

    this.staffSvc.getMaxId(staffTypeid).subscribe(data => {

      this.maxIDList = data;
      if (this.maxIDList.length == 0) {
        this.maxnumber = 0;
      }
      this.maxIDList.forEach(element => {
        this.maxnumber = element.id
      });

      var maxnum: string = String(this.maxnumber + 1)
      if (maxnum.length == 1) {
        this.staffno = '000' + maxnum
        this.staffProfileForm.get('staff_no')?.setValue(staffCd + '000' + maxnum);
      }
      else if (maxnum.length == 2) {
        this.staffno = '00' + maxnum
        this.staffProfileForm.get('staff_no')?.setValue(staffCd + '00' + maxnum);
      }
      else if (maxnum.length == 3) {
        this.staffno = '0' + maxnum
        this.staffProfileForm.get('staff_no')?.setValue(staffCd + '0' + maxnum);
      }
      else {
        this.staffno = maxnum
        this.staffProfileForm.get('staff_no')?.setValue(staffCd + maxnum);
      }
    });
  }


  totalChange() {
    let totalAmount = 0;
    totalAmount = Number(this.staffProfileForm.value.basic_pay) + Number(this.staffProfileForm.value.da)
      + Number(this.staffProfileForm.value.hra) + Number(this.staffProfileForm.value.allowance);

    this.staffProfileForm.get('total_salary')?.setValue(String(totalAmount));

    const basicPay = Number(this.staffProfileForm.value.basic_pay);
    const pfType = this.staffProfileForm.value.pftype
    const pf = this.staffProfileForm.value.pf
    let aPf = 0;
    if (pf == 'Yes' && pfType == 'automatic') {
      aPf = (basicPay * 12) / 100;

      this.staffProfileForm.get('pfamount')?.setValue(String(Math.round(aPf)));
    }
  }

  editFun(staff: any) {
    this.staffProfileForm.patchValue(staff);
    this.editableImage = staff.img;
  }

  calculatePf() {
    debugger;
    const basicPay = Number(this.staffProfileForm.value.basic_pay);
    const pfType = this.staffProfileForm.value.pftype
    const pf = this.staffProfileForm.value.pf
    let aPf = 0;
    if (pf == 'Yes' && pfType == 'automatic') {
      aPf = (basicPay * 12) / 100;
    }
    else {
      aPf = 0;
    }
    this.staffProfileForm.get('pfamount')?.setValue(String(Math.round(aPf)));
  }

  cancelClick() {
    this.staffProfileForm.reset();
    this.staffProfileForm.get('id')?.setValue(0);
    this.staffProfileForm.get('staff_no')?.setValue('');
    this.staffProfileForm.get('category_id')?.setValue(null);
    this.staffProfileForm.get('staff_name')?.setValue('');
    this.staffProfileForm.get('gender')?.setValue('');
    this.staffProfileForm.get('img')?.setValue('');
    this.staffProfileForm.get('dob')?.setValue('');
    this.staffProfileForm.get('mobile')?.setValue('');
    this.staffProfileForm.get('blood_group')?.setValue('');
    this.staffProfileForm.get('qualification')?.setValue('');
    this.staffProfileForm.get('designation')?.setValue('');
    this.staffProfileForm.get('experience')?.setValue('');
    this.staffProfileForm.get('pc')?.setValue('');
    this.staffProfileForm.get('staff_typeid')?.setValue(null);
    this.staffProfileForm.get('major_subject')?.setValue('');
    this.staffProfileForm.get('class_hand')?.setValue('');
    this.staffProfileForm.get('join_date')?.setValue('');
    this.staffProfileForm.get('rejoin')?.setValue('No');
    this.staffProfileForm.get('rejoin_date')?.setValue('');
    this.staffProfileForm.get('f_name')?.setValue('');
    this.staffProfileForm.get('m_name')?.setValue('');
    this.staffProfileForm.get('s_address')?.setValue('');
    this.staffProfileForm.get('sslc_x')?.setValue(false);
    this.staffProfileForm.get('sslc_o')?.setValue(false);
    this.staffProfileForm.get('sslc_date')?.setValue('');
    this.staffProfileForm.get('hsc_x')?.setValue(false);
    this.staffProfileForm.get('hsc_o')?.setValue(false);
    this.staffProfileForm.get('hsc_date')?.setValue('');
    this.staffProfileForm.get('ug_x')?.setValue(false);
    this.staffProfileForm.get('ug_o')?.setValue(false);
    this.staffProfileForm.get('ug_date')?.setValue('');
    this.staffProfileForm.get('pg_x')?.setValue(false);
    this.staffProfileForm.get('pg_o')?.setValue(false);
    this.staffProfileForm.get('pg_date')?.setValue('');
    this.staffProfileForm.get('bed_x')?.setValue(false);
    this.staffProfileForm.get('bed_o')?.setValue(false);
    this.staffProfileForm.get('bed_date')?.setValue('');
    this.staffProfileForm.get('med_x')?.setValue(false);
    this.staffProfileForm.get('med_o')?.setValue(false);
    this.staffProfileForm.get('med_date')?.setValue('');
    this.staffProfileForm.get('basic_pay')?.setValue('');
    this.staffProfileForm.get('da')?.setValue('');
    this.staffProfileForm.get('hra')?.setValue('');
    this.staffProfileForm.get('allowance')?.setValue('');
    this.staffProfileForm.get('total_salary')?.setValue('');
    this.staffProfileForm.get('pf')?.setValue('Yes');
    this.staffProfileForm.get('pfamount')?.setValue('');
    this.staffProfileForm.get('pftype')?.setValue('automatic');
    this.staffProfileForm.get('paymentmode')?.setValue('cash');
    this.staffProfileForm.get('account_no')?.setValue('');
    this.staffProfileForm.get('ifsc_code')?.setValue('');
    this.staffProfileForm.get('bank_name')?.setValue('');
    this.staffProfileForm.get('branch_name')?.setValue('');
    this.staffProfileForm.get('reliving')?.setValue('No');
    this.staffProfileForm.get('reliving_date')?.setValue('');
    this.staffProfileForm.get('cuid')?.setValue(this.userID);
    this.editableImage = '';
    this.files = [];
  }
}