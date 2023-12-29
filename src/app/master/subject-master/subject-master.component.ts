import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
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
  ClassList: any = [];

  constructor(private subjectSvc: subjectService,
    private DialogSvc: DialogService, private notificationSvc: NotificationsService,
    private router: Router, private ClassSvc: studentClassService,) {
  }

  ngOnInit(): void {
    this.refreshsubjectList(),
      this.getMaxId(),
      this.cancelClick();
    this.refreshClassList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshClassList() {
    debugger
    this.ClassSvc.getClassList().subscribe(data => {
      
      this.ClassList = data;

      const control = <FormArray>this.subjectForm.controls['classidArray']
      while (control.length !== 0) {
        control.removeAt(0)
      }

      if (this.ClassList.length != 0 && control.length == 0) {
        this.ClassList.forEach(element => {
          
          control.push(
            new FormGroup({
              classid: new FormControl(element.classid),
              class_name: new FormControl(element.class_name),
              selected: new FormControl(false)
            })
          )
        });
      }
    });
  }

  subjectForm = new FormGroup({
    subjectid: new FormControl(0),
    subject_name: new FormControl('', [Validators.required]),
    practical_status: new FormControl('Non Practical Subject'),
    classidArray: new FormArray([
    ]),
    selectAll: new FormControl(false),
    cuid: new FormControl(1),
  });

  getControls() {
    return (this.subjectForm.get('classidArray') as FormArray).controls;
  }

  refreshsubjectList() {
    this.subjectSvc.getsubjectList().subscribe(data => {
      this.subjectDetailList = data;
    });
  }

  toggleAllCheckboxes() {
    
    const selectAllValue = this.subjectForm.get('selectAll').value;
    const classidArray = this.subjectForm.get('classidArray') as FormArray;
    for (let i = 0; i < classidArray.length; i++) {
      classidArray.at(i).get('selected').setValue(selectAllValue);
    }
  }

  updateSelectAllCheckbox() {
    const classidArray = this.subjectForm.get('classidArray') as FormArray;
    const selectAll = classidArray.controls.every((control) => control.get('selected').value === true);
    this.subjectForm.get('selectAll').setValue(selectAll);
  }

  // updateFormArrayCheckboxes(selectAllValue: boolean) {
  //   const classidArray = this.subjectForm.get('classidArray') as FormArray;
  //   for (let i = 0; i < classidArray.length; i++) {
  //     classidArray.at(i).get('selected').setValue(selectAllValue);
  //   }
  // }

  newSubject() {
    
    const classidArray = <FormArray>this.subjectForm.get('classidArray');
    const filteredItems = classidArray.controls.filter((control) => {
      return control.get('selected').value === true;
    });

    if (this.subjectForm.valid && filteredItems.length != 0) {
      if (this.subjectForm.value.subjectid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var subjectinsert = (this.subjectForm.value);
              this.subjectSvc.addNewsubject(subjectinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshsubjectList();
                  this.getMaxId();
                  this.cancelClick();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists")
                }
                else {
                  this.notificationSvc.error("Something error")
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
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshsubjectList();
                  this.getMaxId();
                  this.cancelClick();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists")
                }
                else {
                  this.notificationSvc.error("Something error")
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
      this.notificationSvc.error("Fill in the mandatory fields or select atleast one class")
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
              this.refreshsubjectList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(subject: any) {
    
    this.subjectForm.patchValue(subject);
    this.subjectForm.get('cuid')?.setValue(1);
    this.buttonId = false;
    const classIdsArray = subject.classids.split(',').map(Number);

    const classidArrayValue = this.subjectForm.get('classidArray').value;
    const classidArray = this.subjectForm.get('classidArray') as FormArray;

    classidArrayValue.forEach((e, i) => {
      
      if (classIdsArray.includes(e.classid)) {
        classidArray.at(i).get('selected').setValue(true);
      }
      else {
        classidArray.at(i).get('selected').setValue(false);
      }
    });
  }

  cancelClick() {
    this.subjectForm.reset();
    this.refreshClassList()
    this.subjectForm.get('subjectid')?.setValue(0);
    this.subjectForm.get('subject_name')?.setValue('');
    this.subjectForm.get('practical_status')?.setValue('Non Practical Subject');
    this.subjectForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }
}
