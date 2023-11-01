import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { assign, subject } from 'src/app/Model/subjectAssign.model';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { getSubjects } from 'src/app/api-service/getSubjects.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-subject-assign',
  templateUrl: './subject-assign.component.html',
  styleUrls: ['./subject-assign.component.scss']
})
export class SubjectAssignComponent implements OnInit {
  subjectDetailList: subject[];
  subjectSubAssignList: assign[] = [];
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupDisplay: boolean = true;
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  MaxIdAssign: any = [];
  assignbuttonId: boolean = true;

  constructor(private subSvc: getSubjects,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private notificationSvc: NotificationsService,
    private DialogSvc: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshsubjectList();
    this.getSubassign();
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.cancelClick();
    this.getMaxIdAssign();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshsubjectList() {
    // this.subSvc.getsubjectList().subscribe(data => {
    //   this.subjectDetailList = data;
    // });
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
    this.subjectAssignForm.classid = classid;
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.subjectAssignForm.groupid = 0;
    this.subjectAssignForm.sectionid = null;
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.subjectAssignForm.sectionid = null;
    }
    else {
      this.groupDisplay = true;
      this.subjectAssignForm.sectionid = null;
    }
    this.filterSubject();
  }

  FilterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.subjectAssignForm.groupid = groupid;
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.subjectAssignForm.sectionid = null;
  }

  filterSubject() {
    debugger;
    this.subSvc.getsubjectList().subscribe(data => {
      debugger;
      const clasID = this.subjectAssignForm.classid;
      this.subjectDetailList = data;
      this.subjectDetailList.forEach(item => {
        item.classids = item.classids.split(',').map(Number);
      });
      this.subjectDetailList = this.subjectDetailList.filter(item => item.classids.includes(clasID));
    });

  }

  subjectAssignForm: assign = {
    assignid: 0,
    classid: null,
    groupid: 0,
    sectionid: null,
    subjetsid: '',
    subjectsname: '',
    cuid: 1,
    class_name: '',
    section_name: '',
    group_name: ''
  };

  onSubmit() {
    this.subjectAssignForm.subjetsid = this.subjectDetailList.filter(x => x.isselect == true).map(x => x.subjectid).join(",").toString();
    if (this.subjectAssignForm.subjetsid != '') {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            this.subjectAssignForm.subjectsname = this.subjectDetailList.filter(x => x.isselect == true).map(x => x.subject_name).join(",").toString();
            this.subSvc.newSubjectAssign(this.subjectAssignForm).subscribe(res => {
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved Success");
                this.getSubassign();
                this.cancelClick();
                this.getMaxIdAssign();
              }
              else if (res.status == 'Updated successfully') {
                this.notificationSvc.success("Updated Success");
                this.getSubassign();
                this.cancelClick();
                this.getMaxIdAssign();
              }
              else if (res.status == 'Already exists') {
                this.notificationSvc.warn("Already exists")
              }
              else {
                this.notificationSvc.error("Something Error")
              }
            });
          }
        });
    }
    else {
      this.notificationSvc.error('Please select Subjects')
    }
  }

  getSubassign() {
    this.subSvc.getSubassign().subscribe(data => {
      this.subjectSubAssignList = data;
    });
  }

  getMaxIdAssign() {
    this.subSvc.getMaxId().subscribe(data => {
      this.MaxIdAssign = data;
    });
  }

  assigndeleteClick(assignid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.subSvc.deleteAssign(assignid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshsubjectList();
              this.getSubassign();
              this.getMaxIdAssign();
              this.cancelClick();
            }
          });
        }
      });
  }

  edit(assign: assign) {
    this.assignbuttonId = false;
    this.subjectDetailList.forEach(element => {
      element.isselect = false;
    });
    let select = assign.subjetsid.split(",");
    for (let i = 0; i < select.length; i++) {
      this.subjectDetailList.filter(x => x.subjectid == Number(select[i])).map(x => x.isselect = true);
    }
    this.subjectAssignForm.assignid = assign.assignid;
    this.subjectAssignForm.classid = assign.classid;

    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == assign.classid });
    this.subjectAssignForm.groupid = assign.groupid;
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == assign.groupid });
    this.subjectAssignForm.sectionid = assign.sectionid;
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == assign.classid });
      this.subjectAssignForm.sectionid = assign.sectionid;
    }
    else {
      this.groupDisplay = true;
    }
  }

  cancelClick() {
    this.subjectAssignForm.assignid = 0;
    this.subjectAssignForm.classid = null;
    this.subjectAssignForm.groupid = 0;
    this.subjectAssignForm.sectionid = null;
    this.subjectAssignForm.subjetsid = '';
    this.subjectAssignForm.subjectsname = '';
    this.refreshsubjectList();
    this.getSubassign();
    this.assignbuttonId = true;
  }

}

