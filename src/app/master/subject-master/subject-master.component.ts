import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { subjectAssignService } from 'src/app/api-service/SubjectAssign.service';
import { SubjectBranchService } from 'src/app/api-service/SubjectBranch.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { subjectService } from 'src/app/api-service/subject.service';

@Component({
  selector: 'app-subject-master',
  templateUrl: './subject-master.component.html',
  styleUrls: ['./subject-master.component.scss']
})
export class SubjectMasterComponent implements OnInit {
  MaxId: any = [];
  buttonId: boolean = true;
  subjectDetailList: any = [];

  subjectBranchList: any = [];
  MaxIdBranch: any = [];
  BranchbuttonId: boolean = true;


  //Subject Assign
  subjectArray: any[] = [];
  groupDisplay: boolean = true;
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  subjectAssignList:any=[];

  constructor(private subjectSvc: subjectService, private BranchSvc: SubjectBranchService,
    private DialogSvc: DialogService, private notificationSvc: NotificationsService,
    private ClassSvc: studentClassService, private GroupSvc: studentGroupService,
    private fb: FormBuilder,private router: Router,
    private ScSvc: studentSectionService, private subAsSvc: subjectAssignService) {

    
  }

  ngOnInit(): void {
    this.refreshsubjectList(),
      this.getMaxId(),
      this.cancelClick(),

      this.refreshsubjectBranchList(),
      this.getMaxIdSubBranch(),
      this.cancelClickSubBranch(),


      //Subject Assign

      this.refreshClassList()
    this.refreshGroupList()
    this.refreshSectionList()

    this.refreshsubjectAssignList()
    this.cancelClickSubAssign()
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard');
  }

  subjectForm = new FormGroup({
    subjectid: new FormControl(0),
    subject_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshsubjectList() {
    this.subjectSvc.getsubjectList().subscribe(data => {
      this.subjectDetailList = data;
    });
  }

  newSubject() {
    if (this.subjectForm.valid) {
      if (this.subjectForm.value.subjectid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var subjectinsert = (this.subjectForm.value);
              this.subjectSvc.addNewsubject(subjectinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  this.refreshsubjectList();
                  this.getMaxId();
                  this.cancelClick();
                }
              });
            }
          });
      }
      else if (this.subjectForm.value.subjectid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var subjectinsert = (this.subjectForm.value);
              this.subjectSvc.addNewsubject(subjectinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshsubjectList();
                  this.getMaxId();
                  this.cancelClick();
                }
              });
            }
          });
      }
      else {
        alert("Something error;")
      }
    }
    else {
      this.subjectForm.markAllAsTouched();
    }
  }

  getMaxId() {
    this.subjectSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(subjectid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.subjectSvc.deletesubject(subjectid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              debugger;
              this.refreshsubjectList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(subject: any) {
    this.subjectForm.get('subjectid')?.setValue(subject.subjectid);
    this.subjectForm.get('subject_name')?.setValue(subject.subject_name);
    this.subjectForm.get('cuid')?.setValue(subject.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.subjectForm.reset();
    this.subjectForm.get('subjectid')?.setValue(0);
    this.subjectForm.get('subject_name')?.setValue('');
    this.subjectForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }


  //Subject Branches


  subjectBranchForm = new FormGroup({
    branchid: new FormControl(0),
    subjectid: new FormControl(null, [Validators.required]),
    branch_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshsubjectBranchList() {
    this.BranchSvc.getsubBranchList().subscribe(data => {
      this.subjectBranchList = data;
    });
  }

  newSubjectBranch() {
    if (this.subjectBranchForm.valid) {
      if (this.subjectBranchForm.value.branchid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var subBranchinsert = (this.subjectBranchForm.value);
              this.BranchSvc.addNewsubBranch(subBranchinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  this.refreshsubjectBranchList();
                  this.getMaxIdSubBranch();
                  this.cancelClickSubBranch();
                }
              });
            }
          });
      }
      else if (this.subjectBranchForm.value.branchid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var subBranchinsert = (this.subjectBranchForm.value);
              this.BranchSvc.addNewsubBranch(subBranchinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshsubjectBranchList();
                  this.getMaxIdSubBranch();
                  this.cancelClickSubBranch();
                }
              });
            }
          });
      }
      else {
        alert("Something error;")
      }
    }
    else {
      this.subjectBranchForm.markAllAsTouched();
    }
  }

  getMaxIdSubBranch() {
    this.BranchSvc.getMaxIdsubBranch().subscribe(data => {
      this.MaxIdBranch = data;
    });
  }

  deleteClickSubBranch(branchid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.BranchSvc.deletesubBranch(branchid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              debugger;
              this.refreshsubjectBranchList();
              this.getMaxIdSubBranch();
              this.cancelClickSubBranch();
            }
          });
        }
      });
  }

  updateGetClickSubBranch(branch: any) {
    this.subjectBranchForm.get('branchid')?.setValue(branch.branchid);
    this.subjectBranchForm.get('subjectid')?.setValue(branch.subjectid);
    this.subjectBranchForm.get('branch_name')?.setValue(branch.branch_name);
    this.subjectBranchForm.get('cuid')?.setValue(branch.cuid);
    this.BranchbuttonId = false;
  }

  cancelClickSubBranch() {
    this.subjectBranchForm.reset();
    this.subjectBranchForm.get('branchid')?.setValue(0);
    this.subjectBranchForm.get('subjectid')?.setValue(null);
    this.subjectBranchForm.get('branch_name')?.setValue('');
    this.subjectBranchForm.get('cuid')?.setValue(1);
    this.BranchbuttonId = true;
  }

  //Subject Assign

  subjectAssignForm = new FormGroup({
    subjectAssignid: new FormControl(0),
    classid: new FormControl(0, [Validators.required]),
    groupid: new FormControl(0, [Validators.required]),
    sectionid: new FormControl(0, [Validators.required]),
    selectedSubjects:new FormControl(),
    cuid: new FormControl(1),
  })

  refreshsubjectAssignList() {
    this.subAsSvc.getSubjectAssign().subscribe(data => {
      this.subjectAssignList = data;
    });
  }

  
  selectedSub(event: any, option: any) {
    debugger;    
    if (event.target.checked) {
      this.subjectArray.push(option.toString());
    } else {
      this.subjectArray = this.subjectArray.filter((val) => val.toString() !== option.toString());
    }
    //this.subjectAssignForm.selectedSubjects new FormControl(this.subjectArray);
    this.subjectAssignForm.get('selectedSubjects')?.setValue(this.subjectArray);
    console.log(this.subjectArray);
  };
  


  newSubjectAssign() {
    debugger;
    var subBranchinsert = (this.subjectAssignForm.value);
   
    this.subAsSvc.addNewsubjectAssign(subBranchinsert).subscribe(res => {
      console.log(res, 'resss')
      if (res?.recordid) {
        this.refreshsubjectAssignList();
        //this.getMaxIdSubBranch();
        this.cancelClickSubAssign();
      }
    });
  }

  

  cancelClickSubAssign() {
    this.subjectAssignForm.reset();
    this.subjectAssignForm.get('subjectAssignid')?.setValue(0);
    this.subjectAssignForm.get('classid')?.setValue(0);
    this.subjectAssignForm.get('groupid')?.setValue(0);
    this.subjectAssignForm.get('sectionid')?.setValue(0);
    this.subjectAssignForm.get('selectedSubjects')?.setValue(0);
    this.subjectAssignForm.get('cuid')?.setValue(1);
    //this.BranchbuttonId = true;
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
    debugger;
    const classid = Number(classsid);
    this.subjectAssignForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.subjectAssignForm.get('groupid')?.setValue(0);
    this.subjectAssignForm.get('sectionid')?.setValue(0);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.subjectAssignForm.get('sectionid')?.setValue(0);
    }
    else {
      this.groupDisplay = true;
      this.subjectAssignForm.get('sectionid')?.setValue(0);
    }
  }

  FilterSectionfun(groupID: any) {
    debugger;
    const groupid = Number(groupID);
    this.subjectAssignForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.subjectAssignForm.get('sectionid')?.setValue(0);
  }
}
