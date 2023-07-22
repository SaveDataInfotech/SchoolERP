import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  ClassList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  GroupList: any = [];
  MaxGroupId: any = [];
  GroupbuttonId: boolean = true;

  SectionList: any = [];
  MaxSectionId: any = [];
  SectionbuttonId: boolean = true;

  //Fillter new list array
  newlist: any = [];


  constructor(
    private ClassSvc: studentClassService, private GroupSvc: studentGroupService, private ScSvc: studentSectionService,
    private DialogSvc: DialogService) {
  }

  ngOnInit(): void {
    this.refreshClassList(),
      this.getMaxId(),
      this.cancelClick(),

      //Student Group
      this.refreshGroupList(),
      this.getGroupMaxId(),
      this.GroupcancelClick(),

      //Student Section
      this.refreshSectionList();
    this.getSectionMaxId();
    this.SectioncancelClick()
  }

  Student_classForm = new FormGroup({
    classid: new FormControl(0),
    class_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  New_Class() {
    var Classinsert = (this.Student_classForm.value);
    this.ClassSvc.addNewstaffType(Classinsert).subscribe(res => {
      if (res?.recordid) {
        this.refreshClassList();
        this.getMaxId();
        this.cancelClick();
      }
    });
  }

  getMaxId() {
    this.ClassSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(classid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.ClassSvc.deletestaffType(classid).subscribe(res => {
            if (res?.recordid) {
              this.refreshClassList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  updateGetClick(StClass: any) {
    this.Student_classForm.get('classid')?.setValue(StClass.classid);
    this.Student_classForm.get('class_name')?.setValue(StClass.class_name);
    this.Student_classForm.get('cuid')?.setValue(StClass.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.Student_classForm.reset();
    this.Student_classForm.get('classid')?.setValue(0);
    this.Student_classForm.get('class_name')?.setValue('');
    this.Student_classForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }

  //Student Group
  Student_GroupForm = new FormGroup({
    groupid: new FormControl(0),
    classid: new FormControl(0),
    group_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  // changeGroupClassfun(classsid:any){
  //   debugger;
  //   const classid=Number(classsid);
  //   this.Student_GroupForm.get('classid')?.setValue(classid);
  // }


  refreshGroupList() {
    this.GroupSvc.getGroupList().subscribe(data => {
      this.GroupList = data;
    });
  }

  getGroupMaxId() {
    this.GroupSvc.getMaxId().subscribe(data => {
      this.MaxGroupId = data;
    });
  }

  NewGroup() {
    debugger;
    var Groupinsert = (this.Student_GroupForm.value);
    this.GroupSvc.addNewGroup(Groupinsert).subscribe(res => {
      if (res?.recordid) {
        this.SectioncancelClick();
        this.refreshGroupList();
        this.getGroupMaxId();
        this.GroupcancelClick();
        //this.cancelClick();        
      }
    });
  }

  updateGroupClick(group: any) {
    debugger;
    this.Student_GroupForm.get('groupid')?.setValue(group.groupid);
    this.Student_GroupForm.get('classid')?.setValue(group.classid);
    this.Student_GroupForm.get('group_name')?.setValue(group.group_name);
    this.Student_GroupForm.get('cuid')?.setValue(group.cuid);
    this.GroupbuttonId = false;
  }

  GroupcancelClick() {
    debugger;
    this.Student_GroupForm.reset();
    this.Student_GroupForm.get('groupid')?.setValue(0);
    this.Student_GroupForm.get('classid')?.setValue(0);
    this.Student_GroupForm.get('group_name')?.setValue('');
    this.Student_GroupForm.get('cuid')?.setValue(1);
    this.GroupbuttonId = true;
  }

  GroupdeleteClick(groupid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.GroupSvc.deleteGroup(groupid).subscribe(res => {
            if (res?.recordid) {
              this.refreshGroupList();
              this.getGroupMaxId();
              this.GroupcancelClick();
            }
          });
        }
      });
  }

  //Student Section
  changefun(classsid: any) {
    debugger;
    const classid = Number(classsid);
    this.Student_SectionForm.get('classid')?.setValue(classid);
    this.newlist = this.GroupList.filter((e: any) => { return e.classid == classid });
  }

  Student_SectionForm = new FormGroup({
    sectionid: new FormControl(0),
    groupid: new FormControl(0),
    classid: new FormControl(0),
    section_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshSectionList() {
    this.ScSvc.getSectionList().subscribe(data => {
      this.SectionList = data;
    });
  }

  getSectionMaxId() {
    this.ScSvc.getMaxId().subscribe(data => {
      this.MaxSectionId = data;
    });
  }

  NewSection() {
    debugger;
    var Sectioninsert = (this.Student_SectionForm.value);
    this.ScSvc.addNewSection(Sectioninsert).subscribe(res => {
      if (res?.recordid) {
        this.refreshSectionList();
        this.getSectionMaxId();
        this.SectioncancelClick();
      }
    });
  }

  updateSectionClick(section: any) {
    debugger;
    this.Student_SectionForm.get('sectionid')?.setValue(section.sectionid);
    this.Student_SectionForm.get('groupid')?.setValue(section.groupid);
    this.Student_SectionForm.get('classid')?.setValue(section.classid);
    this.Student_SectionForm.get('section_name')?.setValue(section.section_name);
    this.Student_SectionForm.get('cuid')?.setValue(section.cuid);
    this.SectionbuttonId = false;

    this.Student_SectionForm.get('classid')?.setValue(section.classid);
    this.newlist = this.GroupList.filter((e: any) => { return e.classid == section.classid });
  }

  SectioncancelClick() {
    debugger;
    this.Student_SectionForm.reset();
    this.Student_SectionForm.get('sectionid')?.setValue(0);
    this.Student_SectionForm.get('groupid')?.setValue(0);
    this.Student_SectionForm.get('classid')?.setValue(0);
    this.Student_SectionForm.get('section_name')?.setValue('');
    this.Student_SectionForm.get('cuid')?.setValue(1);
    this.SectionbuttonId = true;
  }

}

