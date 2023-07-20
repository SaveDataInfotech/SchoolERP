import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { staffTypeService } from 'src/app/api-service/staffType.service';
import { DialogService } from 'src/app/api-service/Dialog.service';

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
    private stySvc: staffTypeService, private DialogSvc: DialogService) {
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
    if(this.stafftypeForm.value.staffTypeid == 0){
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
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
      });
    }
    else if(this.stafftypeForm.value.staffTypeid != 0){
      this.DialogSvc.openConfirmDialog('Are you sure want to update this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
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
      });
    }
    else{
      alert("something error;")
    }

    
  }

  getMaxId() {
    this.stySvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }


  //sample  for Dialog working
  deleteClick(staffTypeid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.stySvc.deletestaffType(staffTypeid).subscribe(res => {
            if (res?.recordid) {
              debugger;
              this.refreshstaffTypeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
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
