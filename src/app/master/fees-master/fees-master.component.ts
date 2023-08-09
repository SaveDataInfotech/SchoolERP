import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesAssignService } from 'src/app/api-service/FeesAssign.service';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { FeesTypeService } from 'src/app/api-service/FeesType.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-fees-master',
  templateUrl: './fees-master.component.html',
  styleUrls: ['./fees-master.component.scss']
})
export class FeesMasterComponent implements OnInit {
  FeesList: any = [];
  buttonId: boolean = true;
  MaxId: any = [];

  FeesLessList: any = [];
  MaxIdLess: any = [];
  buttonIdLess: boolean = true;


  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  activeBatchYear: any = [];
  groupDisplay: boolean = true;
  newgetbatch: string;

  FeesAssignList: any = [];
  MaxIdAssign: any = [];
  assignbuttonId: boolean = true;

  constructor(
    private FtySvc: FeesTypeService,
    private FlSvc: FeesLessService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private feeAsSvc: FeesAssignService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private batchSvc: BatechYearService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshFeesTypeList(),
      this.getMaxId(),
      this.cancelClick(),

      this.refreshFeesLessList(),
      this.getMaxIdLess(),
      this.cancelClickLess(),

      this.refreshClassList()
    this.refreshGroupList()
    this.refreshSectionList()
    this.GetActiveBatchYear()

    this.refreshFeesAssignList();
    this.getMaxIdAssign();
    this.cancelClickAssign();

  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard');
  }

  //Fees type

  feestypeForm = new FormGroup({
    typeid: new FormControl(0),
    type_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshFeesTypeList() {
    this.FtySvc.getfeesTypeList().subscribe(data => {
      this.FeesList = data;
    });
  }

  NewFeesType() {
    if (this.feestypeForm.valid) {
      if (this.feestypeForm.value.typeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feestypeinsert = (this.feestypeForm.value);
              this.FtySvc.addNewFeesType(feestypeinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshFeesTypeList();
                  this.getMaxId();
                  this.cancelClick();
                }
                else if(res.status == 'Already exists'){
                  this.notificationSvc.warn("Already exists")
                }
                else{
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else if (this.feestypeForm.value.typeid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feestypeinsert = (this.feestypeForm.value);
              this.FtySvc.addNewFeesType(feestypeinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshFeesTypeList();
                  this.getMaxId();
                  this.cancelClick();
                }
                else if(res.status == 'Already exists'){
                  this.notificationSvc.warn("Already exists")
                }
                else{
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
    }
    else {
      this.feestypeForm.markAllAsTouched();
    }
  }

  getMaxId() {
    this.FtySvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(typeid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.FtySvc.deletefeesType(typeid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshFeesTypeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(fees: any) {
    this.feestypeForm.get('typeid')?.setValue(fees.typeid);
    this.feestypeForm.get('type_name')?.setValue(fees.type_name);
    this.feestypeForm.get('cuid')?.setValue(fees.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.feestypeForm.reset();
    this.feestypeForm.get('typeid')?.setValue(0);
    this.feestypeForm.get('type_name')?.setValue('');
    this.feestypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }


  //fess less Back end Code

  feesLessForm = new FormGroup({
    fess_lessid: new FormControl(0),
    less_type: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshFeesLessList() {
    this.FlSvc.getfeesLessList().subscribe(data => {
      this.FeesLessList = data;
    });
  }

  getMaxIdLess() {
    debugger;
    this.FlSvc.getMaxId().subscribe(data => {
      this.MaxIdLess = data;
    });
  }

  NewFeesLess() {
    if (this.feesLessForm.valid) {
      if (this.feesLessForm.value.fess_lessid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feeslessinsert = (this.feesLessForm.value);
              this.FlSvc.addNewFeesLess(feeslessinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshFeesLessList();
                  this.getMaxIdLess();
                  this.cancelClickLess();
                }
                else if(res.status == 'Already exists'){
                  this.notificationSvc.warn("Already exists")
                }
                else{
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else if (this.feesLessForm.value.fess_lessid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feeslessinsert = (this.feesLessForm.value);
              this.FlSvc.addNewFeesLess(feeslessinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshFeesLessList();
                  this.getMaxIdLess();
                  this.cancelClickLess();
                }
                else if(res.status == 'Already exists'){
                  this.notificationSvc.warn("Already exists")
                }
                else{
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
    }
    else {
      this.feesLessForm.markAllAsTouched();
    }
  }

  udateGetClickLess(less: any) {
    this.feesLessForm.get('fess_lessid')?.setValue(less.fess_lessid);
    this.feesLessForm.get('less_type')?.setValue(less.less_type);
    this.feesLessForm.get('cuid')?.setValue(less.cuid);
    this.buttonIdLess = false;
  }

  deleteClickLess(fess_lessid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.FlSvc.deletefeesLessType(fess_lessid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshFeesLessList();
              this.getMaxIdLess();
              this.cancelClickLess();
            }
          });
        }
      });
  }

  cancelClickLess() {
    this.feesLessForm.reset();
    this.feesLessForm.get('fess_lessid')?.setValue(0);
    this.feesLessForm.get('less_type')?.setValue('');
    this.feesLessForm.get('cuid')?.setValue(1);
    this.buttonIdLess = true;
  }


  //FeesAssign Backend Code

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

  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.feesAssignForm.get('batch_year')?.setValue(this.newgetbatch);
    });
  }


  filterGroupfun(classsid: any) {
    debugger;
    const classid = Number(classsid);
    this.feesAssignForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.feesAssignForm.get('groupid')?.setValue(0);
    this.feesAssignForm.get('sectionid')?.setValue(0);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.feesAssignForm.get('sectionid')?.setValue(0);
    }
    else {
      this.groupDisplay = true;
      this.feesAssignForm.get('sectionid')?.setValue(0);
    }
  }

  filterSectionfun(groupID: any) {
    debugger;
    const groupid = Number(groupID);
    this.feesAssignForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.feesAssignForm.get('sectionid')?.setValue(0);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  feesAssignForm = new FormGroup({
    assignid: new FormControl(0),
    classid: new FormControl(0, [Validators.required]),
    groupid: new FormControl(0, [Validators.required]),
    sectionid: new FormControl(0, [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    batch_year: new FormControl('', [Validators.required]),
    feestype: new FormControl('', [Validators.required]),
    fees_less: new FormControl('Not Specified', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshFeesAssignList() {
    this.feeAsSvc.getFeesAssignList().subscribe(data => {
      this.FeesAssignList = data;
    });
  }

  newFeesAssign() {
    debugger;
    if (this.feesAssignForm.valid) {
      if (this.feesAssignForm.value.assignid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feesAssignInsert = (this.feesAssignForm.value);
              this.feeAsSvc.addNewFeesAssign(feesAssignInsert).subscribe(res => {
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  this.refreshFeesAssignList();
                  this.getMaxIdAssign();
                  this.cancelClickAssign();
                }
              });
            }
          });
      }
      else if (this.feesAssignForm.value.assignid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feesAssignInsert = (this.feesAssignForm.value);
              this.feeAsSvc.addNewFeesAssign(feesAssignInsert).subscribe(res => {
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshFeesAssignList();
                  this.getMaxIdAssign();
                  this.cancelClickAssign();
                }
              });
            }
          });
      }
    }
    else{
      this.feesAssignForm.markAllAsTouched()
    }
  }

  getMaxIdAssign() {
    this.feeAsSvc.getMaxId().subscribe(data => {
      this.MaxIdAssign = data;
    });
  }

  assigndeleteClick(assignid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.feeAsSvc.deleteFeesAssign(assignid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshFeesAssignList();
              this.getMaxIdAssign();
              this.cancelClickAssign();
            }
          });
        }
      });
  }

  updateGetClickAssign(Assign: any) {
    debugger;
    this.feesAssignForm.get('assignid')?.setValue(Assign.assignid);
    this.feesAssignForm.get('classid')?.setValue(Assign.classid);
    this.filterGroupfun(Assign.classid);
    this.feesAssignForm.get('groupid')?.setValue(Assign.groupid);
    this.filterSectionfun(Assign.groupid)
    this.feesAssignForm.get('sectionid')?.setValue(Assign.sectionid);
    this.feesAssignForm.get('gender')?.setValue(Assign.gender);
    this.feesAssignForm.get('batch_year')?.setValue(Assign.batch_year);
    this.feesAssignForm.get('feestype')?.setValue(Assign.feestype);
    this.feesAssignForm.get('fees_less')?.setValue(Assign.fees_less);
    this.feesAssignForm.get('amount')?.setValue(Assign.amount);
    this.feesAssignForm.get('cuid')?.setValue(Assign.cuid);
    this.assignbuttonId = false;
  }

  cancelClickAssign() {
    this.feesAssignForm.reset();
    this.feesAssignForm.get('assignid')?.setValue(0);
    this.feesAssignForm.get('classid')?.setValue(0);
    this.feesAssignForm.get('groupid')?.setValue(0);
    this.feesAssignForm.get('sectionid')?.setValue(0);
    this.feesAssignForm.get('gender')?.setValue('');
    this.feesAssignForm.get('batch_year')?.setValue(this.newgetbatch);
    this.feesAssignForm.get('feestype')?.setValue('');
    this.feesAssignForm.get('fees_less')?.setValue('Not Specified');
    this.feesAssignForm.get('amount')?.setValue('');
    this.feesAssignForm.get('cuid')?.setValue(1);
    this.assignbuttonId = true;
  }
}