import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { calendarService } from 'src/app/api-service/calendar.service';
import { markEntryService } from 'src/app/api-service/markEntryGrade.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { subjectService } from 'src/app/api-service/subject.service';
import { Router } from '@angular/router';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';
@Component({
  selector: 'app-calendar-event-assign',
  templateUrl: './calendar-event-assign.component.html',
  styleUrls: ['./calendar-event-assign.component.scss']
})
export class CalendarEventAssignComponent implements OnInit {
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  subjectList: any[] = [];
  subjectDetailList: any[] = [];
  allEventList: any[] = [];
  userID: number = Number(localStorage.getItem("userid"));
  today: any = (new Date().toISOString().slice(0, 10));
  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private notificationSvc: NotificationsService,
    private meSvc: markEntryService,
    private subjectSvc: subjectService,
    private calSvc: calendarService,
    private DialogSvc: DialogService,
    private router: Router,
    private stpSvc: staffProfileService,
    private SttySvc: staffTypeService) { }

  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.refreshsubjectList();
    this.refreshstaffTypeList();
    this.getCalenderEventList(this.today);
    this.calendarEventAssignForm.get('start')?.setValue(this.today);
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

  filterGroupfun(classsid: any) {
    const classid = Number(classsid);
    this.calendarEventAssignForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.calendarEventAssignForm.get('groupid')?.setValue(0);
    this.calendarEventAssignForm.get('sectionid')?.setValue(0);
    if (this.groupFilterlist.length == 0) {
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.calendarEventAssignForm.get('sectionid')?.setValue(0);
    }
    else {
      this.calendarEventAssignForm.get('sectionid')?.setValue(0);
      this.sectionFilterlist = [];
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.calendarEventAssignForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.calendarEventAssignForm.get('sectionid')?.setValue(0);
  }

  refreshsubjectList() {
    this.subjectSvc.getsubjectList().subscribe(data => {
      this.subjectDetailList = data;
    });
  }

  searchStudentByClass() {
    this.subjectList = [];
    let classid: number = (this.calendarEventAssignForm.value.classid);
    let groupid: number = (this.calendarEventAssignForm.value.groupid);
    let sectionid: number = (this.calendarEventAssignForm.value.sectionid);
    this.meSvc.searchSubjectByClass(classid, groupid, sectionid).subscribe(data => {

      if (data.length != 0) {
        this.subjectList = data[0].subjetsid.split(",").map(Number);
        if (this.subjectList.length != 0) {
          const control = <FormArray>this.calendarEventAssignForm.controls['nesteventlist']
          while (control.length !== 0) {
            control.removeAt(0)
          }
          if (control.length == 0) {
            this.subjectList.forEach(e => {
              control.push(
                new FormGroup({
                  workid: new FormControl(0),
                  subjectid: new FormControl(e),
                  work: new FormControl('')
                })
              )
            });
          }
        }
        else {
          this.notificationSvc.error('No subject has been assigned to this class');
        }
      }
      else {
        this.notificationSvc.error('No subject has been assigned to this class');
      }
    });
  }

  getCalenderEventList(date) {
    this.calSvc.getEventsbyMaster(date, this.userID).subscribe((data) => {
      this.allEventList = data
    })
  }

  calendarEventAssignForm = new FormGroup({
    eventid: new FormControl(0),
    start: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    backgroundColor: new FormControl('#0520F0'),
    textColor: new FormControl('#FFFFFF'),
    type: new FormControl('None'),
    classid: new FormControl(0),
    groupid: new FormControl(0),
    sectionid: new FormControl(0),
    nesteventlist: new FormArray([]),
    staff_typeid: new FormControl(0),
    staff_no: new FormControl(''),
    stafftimetablelist: new FormArray([]),
    cuid: new FormControl(this.userID)
  });

  getControls() {
    return (this.calendarEventAssignForm.get('nesteventlist') as FormArray).controls;
  }

  getControlsStaffTimeTable() {
    return (this.calendarEventAssignForm.get('stafftimetablelist') as FormArray).controls;
  }

  save() {
    const value = this.calendarEventAssignForm.value
    if (this.calendarEventAssignForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to Save this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            this.calSvc.newEvent(value).subscribe((res) => {
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved Success")
                this.getCalenderEventList(this.today);
                this.cancelClick();
              }
              else {
                this.notificationSvc.error("Something error")
              }
            })
          }
        });
    }
    else {
      this.calendarEventAssignForm.markAllAsTouched()
    }
  }

  async updateClick(item) {

    let nestedHomeWorkList: any[] = [];
    let stafftimetablelist: any[] = [];
    await this.cancelClick();

    this.staffFilterList = await this.stpSvc.getStaffByStaffID(item.staff_typeid).toPromise();

    if (item.type == 'Home Work') {
      nestedHomeWorkList = await this.calSvc.getNestedCalendarHomeWork(item.eventid).toPromise();
    }
    else if (item.type == 'StaffTimeTable') {
      stafftimetablelist = await this.calSvc.getNestedCalendarTimeTable(item.eventid).toPromise();
    }

    this.calendarEventAssignForm.patchValue(item);

    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == item.classid });
    this.calendarEventAssignForm.get('groupid')?.setValue(item.groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == item.groupid });
    this.calendarEventAssignForm.get('sectionid')?.setValue(item.sectionid);
    if (this.groupFilterlist.length == 0) {
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == item.classid });
      this.calendarEventAssignForm.get('sectionid')?.setValue(item.sectionid);
    }

    if (nestedHomeWorkList.length != 0) {
      const control = <FormArray>this.calendarEventAssignForm.controls['nesteventlist']
      while (control.length !== 0) {
        control.removeAt(0)
      }
      if (control.length == 0) {
        nestedHomeWorkList.forEach(e => {
          control.push(
            new FormGroup({
              workid: new FormControl(e.workid),
              subjectid: new FormControl(e.subjectid),
              work: new FormControl(e.work)
            })
          )
        });
      }
    }

    if (stafftimetablelist.length != 0) {
      const control = <FormArray>this.calendarEventAssignForm.controls['stafftimetablelist']
      while (control.length !== 0) {
        control.removeAt(0)
      }
      if (control.length == 0) {
        stafftimetablelist.forEach((x, i) => {
          debugger;
          this.progroupFilterlist[i] = this.GroupList.filter((e: any) => { return e.classid == x.classid });
          this.prosectionFilterlist[i] = this.SectionList.filter((e: any) => { return e.groupid == x.groupid && e.classid == x.classid });
          if (this.progroupFilterlist[i].length == 0) {
            this.prosectionFilterlist[i] = this.SectionList.filter((e: any) => { return e.classid == x.classid });
          }

          control.push(
            new FormGroup({
              timeperiod: new FormControl(x.timeperiod),
              classid: new FormControl(x.classid),
              groupid: new FormControl(x.groupid),
              sectionid: new FormControl(x.sectionid)
            })
          )
        });
      }
    }
  }

  deleteEvent(eventid) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.calSvc.deleteEvent(eventid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.getCalenderEventList(this.today);
              this.cancelClick();
            }
          });
        }
      });
  }

  cancelClick() {
    this.calendarEventAssignForm.reset();
    this.calendarEventAssignForm.get('eventid')?.setValue(0);
    this.calendarEventAssignForm.get('start')?.setValue(this.today);
    this.calendarEventAssignForm.get('title')?.setValue('');
    this.calendarEventAssignForm.get('description')?.setValue('');
    this.calendarEventAssignForm.get('backgroundColor')?.setValue('#0520F0');
    this.calendarEventAssignForm.get('textColor')?.setValue('#FFFFFF');
    this.calendarEventAssignForm.get('type')?.setValue('None');
    this.calendarEventAssignForm.get('classid')?.setValue(0);
    this.calendarEventAssignForm.get('groupid')?.setValue(0);
    this.calendarEventAssignForm.get('sectionid')?.setValue(0);
    this.calendarEventAssignForm.get('staff_typeid')?.setValue(0);
    this.calendarEventAssignForm.get('staff_no')?.setValue('');
    this.calendarEventAssignForm.get('cuid')?.setValue(this.userID);

    this.subjectList = [];
    const control = <FormArray>this.calendarEventAssignForm.controls['nesteventlist']
    while (control.length !== 0) {
      control.removeAt(0)
    }

    const control2 = <FormArray>this.calendarEventAssignForm.controls['stafftimetablelist']
    while (control2.length !== 0) {
      control2.removeAt(0)
    }
  }


  closeClick() {
    this.router.navigateByUrl('/app/schedule/schedule');
  }


  //------------Staff Time Table -----------

  staffFilterList: any[] = [];
  StaffTypeList: any[] = [];
  prosectionFilterlist: any[] = [];
  progroupFilterlist: any[] = [];

  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }

  typeChange() {
    const value = this.calendarEventAssignForm.value.staff_typeid
    this.stpSvc.getStaffByStaffID(value).subscribe(data => {
      this.staffFilterList = data
    })
  }

  searchStaffTimetableFormArray() {
    const control = <FormArray>this.calendarEventAssignForm.controls['stafftimetablelist']
    if (this.calendarEventAssignForm.value.eventid == 0) {
      while (control.length !== 0) {
        control.removeAt(0)
      }
      if (control.length == 0) {
        for (let i = 0; i < 8; i++) {
          control.push(
            new FormGroup({
              timeperiod: new FormControl(''),
              classid: new FormControl(0),
              groupid: new FormControl(0),
              sectionid: new FormControl(0)
            })
          )
        }
      }
    }
  };


  timetablefilterGroupfun(classsid: any, i) {
    const classid = Number(classsid)
    const timeTableControl = this.calendarEventAssignForm.get('stafftimetablelist') as FormArray;
    timeTableControl.at(i).get('classid').setValue(classid);
    this.progroupFilterlist[i] = this.GroupList.filter((e: any) => { return e.classid == classid });
    timeTableControl.at(i).get('groupid').setValue(0);
    timeTableControl.at(i).get('sectionid').setValue(0);
    if (this.progroupFilterlist[i].length == 0) {
      this.prosectionFilterlist[i] = this.SectionList.filter((e: any) => { return e.classid == classid });
      timeTableControl.at(i).get('sectionid').setValue(0);
    }
    else {
      timeTableControl.at(i).get('sectionid').setValue(0);
      this.prosectionFilterlist[i] = [];
    }
  }

  profilterSectionfun(groupiD: any, i) {
    const groupID = Number(groupiD)
    const timeTableControl = this.calendarEventAssignForm.get('stafftimetablelist') as FormArray;
    timeTableControl.at(i).get('groupid').setValue(groupID);
    this.prosectionFilterlist[i] = this.SectionList.filter((e: any) => { return e.groupid == groupID });
    timeTableControl.at(i).get('sectionid').setValue(0);
  }

  addtimetable() {
    const control = <FormArray>this.calendarEventAssignForm.controls['stafftimetablelist'];
    control.push(
      new FormGroup({
        timeperiod: new FormControl(''),
        classid: new FormControl(0),
        groupid: new FormControl(0),
        sectionid: new FormControl(0)
      })
    )
  }

  removetimetable(j) {
    (this.calendarEventAssignForm.get('stafftimetablelist') as FormArray).removeAt(j);
  }
}