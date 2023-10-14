import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
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

  constructor(private subjectSvc: subjectService,
    private DialogSvc: DialogService, private notificationSvc: NotificationsService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.refreshsubjectList(),
      this.getMaxId(),
      this.cancelClick()
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  subjectForm = new FormGroup({
    subjectid: new FormControl(0),
    subject_name: new FormControl('', [Validators.required]),
    practical_status: new FormControl('Non Practical Subject'),
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
  }

  cancelClick() {
    this.subjectForm.reset();
    this.subjectForm.get('subjectid')?.setValue(0);
    this.subjectForm.get('subject_name')?.setValue('');
    this.subjectForm.get('practical_status')?.setValue('Non Practical Subject');
    this.subjectForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }
}
