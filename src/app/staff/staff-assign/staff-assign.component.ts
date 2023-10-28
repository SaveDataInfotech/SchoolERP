import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { staffAssignService } from 'src/app/api-service/staffAssign.service';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-staff-assign',
  templateUrl: './staff-assign.component.html',
  styleUrls: ['./staff-assign.component.scss']
})
export class StaffAssignComponent implements OnInit {

  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupDisplay: boolean = true;
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  activeBatchYear: any = [];
  newgetbatch: string;
  staffList: any[] = [];
  staffListAll: any[] = [];
  subjectList: any[] = [];
  subjectSpiltList: any[] = [];
  subjectAssignByList: any[] = [];


  constructor(
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private notificationSvc: NotificationsService,
    private DialogSvc: DialogService,
    private batchSvc: BatechYearService,
    private staffSvc: staffProfileService,
    private staSvc: staffAssignService,
    private router: Router
  ) { this.createForm(); }

  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.GetActiveBatchYear();
    this.refreshStaffList();
  }
  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.staffAssignForm.get('batch_year')?.setValue(this.newgetbatch);
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

  FilterGroupfun(classsid: any) {
    const classid = Number(classsid);
    this.staffAssignForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.staffAssignForm.get('groupid').setValue(0);
    this.staffAssignForm.get('sectionid').setValue(null);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.staffAssignForm.get('sectionid').setValue(null);
    }
    else {
      this.groupDisplay = true;
      this.staffAssignForm.get('sectionid').setValue(null);
    }
  }

  FilterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.staffAssignForm.get('groupid').setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.staffAssignForm.get('sectionid').setValue(null);
  }

  refreshStaffList() {
    this.staffSvc.getstaffProfileList().subscribe(data => {
      this.staffListAll = data;
      this.staffList = this.staffListAll.filter((e) => { return e.activestatus == 1 })
    });
  }

  staffNameChange(value) {
    const newarray = this.staffList.filter((e) => { return e.staff_no == value })
    this.staffAssignForm.get('staff_name')?.setValue(newarray[0].staff_name)
  }


  staffAssignForm: FormGroup;
  createForm() {
    this.staffAssignForm = new FormGroup({
      staff_assign_id: new FormControl(0),
      classid: new FormControl(null),
      groupid: new FormControl(0),
      sectionid: new FormControl(null),
      batch_year: new FormControl(''),
      class_incharge: new FormControl(''),
      staff_name: new FormControl(''),
      subjects: new FormArray([

      ]),
      cuid: new FormControl(1),
    })
  }

  getControls() {
    return (this.staffAssignForm.get('subjects') as FormArray).controls;
  }

  searchSubjectByClass() {
    this.staffAssignForm.get('class_incharge')?.setValue('');
    this.staffAssignForm.get('staff_name')?.setValue('');
    const control = <FormArray>this.staffAssignForm.controls['subjects'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
    let classid: number = (this.staffAssignForm.value.classid);
    let groupid: number = (this.staffAssignForm.value.groupid);
    let sectionid: number = (this.staffAssignForm.value.sectionid);
    let batch_year: any = (this.staffAssignForm.value.batch_year);
    if (classid != null && sectionid != null && batch_year != null) {
      this.staSvc.searchSubjectByClass(classid, groupid, sectionid, batch_year).subscribe(data => {

        this.subjectList = data;
        if (this.subjectList.length != 0) {
          if (this.subjectList[0].batch_year != null) {
            this.subjectList.forEach(element => {
              this.staffAssignForm.patchValue(element)
            });
            this.staSvc.getSubjectArray(this.staffAssignForm.value.staff_assign_id).subscribe(data => {

              this.subjectAssignByList = data;
              this.subjectAssignByList.forEach(element => {
                const control = <FormArray>this.staffAssignForm.controls['subjects'];
                control.push(
                  new FormGroup({
                    subjectsname: new FormControl(element.subjectsname),
                    pm_staff_no: new FormControl(element.pm_staff_no),
                    ad_staff_no: new FormControl(element.ad_staff_no),
                  })
                )
              });
            });
          }
          if (this.subjectList[0].subjectsname != null) {
            this.subjectSpiltList = this.subjectList[0].subjectsname.split(",").map(function (item) {
              return { subjecstname: item };
            });
            this.subjectSpiltList.forEach(element => {
              const control = <FormArray>this.staffAssignForm.controls['subjects'];
              control.push(
                new FormGroup({
                  subjectsname: new FormControl(element.subjecstname),
                  pm_staff_no: new FormControl(''),
                  ad_staff_no: new FormControl(''),
                  ad_staff_name: new FormControl('')
                })
              )
            });
          }
        }
        else {
          this.notificationSvc.error('No subject has been assigned to this class');
        }
      });
    }
    else {
      this.staffAssignForm.markAllAsTouched();
      this.notificationSvc.error('Fill in the mandatory fields');
    }
  }

  save() {
    var staffAsssinInsert = (this.staffAssignForm.value);
    this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.staSvc.addNewstaffAssign(staffAsssinInsert).subscribe(res => {

            if (res.status == 'Insert Success') {
              this.notificationSvc.success("Saved successfully")
              this.cancelClick();
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

  cancelClick() {
    this.staffAssignForm.reset();
    this.staffAssignForm.get('staff_assign_id')?.setValue(0);
    this.staffAssignForm.get('classid')?.setValue(null);
    this.staffAssignForm.get('groupid')?.setValue(0);
    this.staffAssignForm.get('sectionid')?.setValue(null);
    this.staffAssignForm.get('batch_year')?.setValue(this.newgetbatch);
    this.staffAssignForm.get('class_incharge')?.setValue('');
    this.staffAssignForm.get('staff_name')?.setValue('');
    this.staffAssignForm.get('cuid')?.setValue(1);

    const control = <FormArray>this.staffAssignForm.controls['subjects'];
    while (control.length !== 0) {
      control.removeAt(0)
    }

  }
}
