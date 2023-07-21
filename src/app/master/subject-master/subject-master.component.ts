import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  subjectDetailList: any[] = [];
  
  constructor(private subjectSvc: subjectService,private DialogSvc: DialogService) { }

  ngOnInit(): void {
    this.refreshsubjectList(),
      this.getMaxId(),
      this.cancelClick()
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
    if(this.subjectForm.value.subjectid == 0){
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          var subjectinsert = (this.subjectForm.value);
          this.subjectSvc.addNewsubject(subjectinsert).subscribe(res => {
            console.log(res, 'resss')
            if (res?.recordid) {              
              this.refreshsubjectList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
    }
    else if(this.subjectForm.value.subjectid != 0){
      this.DialogSvc.openConfirmDialog('Are you sure want to update this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          var subjectinsert = (this.subjectForm.value);
          this.subjectSvc.addNewsubject(subjectinsert).subscribe(res => {
            console.log(res, 'resss')
            if (res?.recordid) {
              this.refreshsubjectList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
    }
    else{
      alert("Something error;")
    }    
  }

  getMaxId() {
    this.subjectSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }


  //sample  for Dialog working
  deleteClick(subjectid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.subjectSvc.deletesubject(subjectid).subscribe(res => {
            if (res?.recordid) {
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

}
