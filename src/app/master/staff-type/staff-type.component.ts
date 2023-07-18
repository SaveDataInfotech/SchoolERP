import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { staffTypeService } from 'src/app/api-service/staffType.service';

@Component({
  selector: 'app-staff-type',
  templateUrl: './staff-type.component.html',
  styleUrls: ['./staff-type.component.scss']
})
export class StaffTypeComponent implements OnInit {
  DepartmentList: any = [];
  MaxId: any = [];
  //StaffTypeListById:any=[];
  //myBooleanVar:boolean =true;
  //addEditrecords :any= 0;
  buttonId: boolean = true;

  constructor(private http: HttpClient,
    private stySvc: staffTypeService) {
  }
  ngOnInit(): void {
    this.refreshstaffTypeList(),
      this.getMaxId(),
      this.cancelClick()
  }

  stafftypeForm = new FormGroup({
    staffTypeid: new FormControl(0),
    stafftype: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  get stafftype() {
    return this.stafftypeForm.get('stafftype');
  }

  refreshstaffTypeList() {
    this.stySvc.getstaffTypeList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  StaffType() {
    var stafftypeinsert = (this.stafftypeForm.value);
    this.stySvc.addNewstaffType(stafftypeinsert).subscribe(res => {
      console.log(res, 'resss')
      if (res?.recordid) {
        this.refreshstaffTypeList();
        this.getMaxId();
        this.cancelClick();
      }
    });
  }

  getMaxId() {
    this.stySvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(staffTypeid: number) {
    this.stySvc.deletestaffType(staffTypeid).subscribe(res => {
      //alert(data.toString());  
      //alert((JSON.stringify(res.status))); 
      if (res?.recordid) {
        debugger;
        this.refreshstaffTypeList();
        this.getMaxId();
        this.cancelClick();
      }
    });
  }

  udateGetClick(staffType: any) {
    // 
    // this.stySvc.udateGetClick(staffTypeid).subscribe(data => {
    //   this.StaffTypeListById = data;
    // });
    //console.log(staffTypeid,'yy'); // bharath
    // this.stafftypeForm.patchValue(staffTypeid);
    this.stafftypeForm.get('staffTypeid')?.setValue(staffType.staffTypeid);
    this.stafftypeForm.get('stafftype')?.setValue(staffType.staffType);
    this.stafftypeForm.get('cuid')?.setValue(staffType.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.stafftypeForm.reset();
    this.stafftypeForm.get('staffTypeid')?.setValue(0);
    this.stafftypeForm.get('stafftype')?.setValue('');
    this.stafftypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }

}
