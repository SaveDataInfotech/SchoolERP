import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { SubjectBranchService } from 'src/app/api-service/SubjectBranch.service';
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


  subjectBranchList:any=[];
  MaxIdBranch:any=[];
  BranchbuttonId:boolean=true;
  
  constructor(private subjectSvc: subjectService,private BranchSvc: SubjectBranchService,private DialogSvc: DialogService) { }

  ngOnInit(): void {
    this.refreshsubjectList(),
      this.getMaxId(),
      this.cancelClick(),

      this.refreshsubjectBranchList(),
      this.getMaxIdSubBranch(),
      this.cancelClickSubBranch()
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


  //Subject Branches


  subjectBranchForm = new FormGroup({
    branchid: new FormControl(0),
    subjectid: new FormControl(0, [Validators.required]),
    branch_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshsubjectBranchList() {
    this.BranchSvc.getsubBranchList().subscribe(data => {
      this.subjectBranchList = data;
    });
  }

  newSubjectBranch() {
    if(this.subjectBranchForm.value.branchid == 0){
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          var subBranchinsert = (this.subjectBranchForm.value);
          this.BranchSvc.addNewsubBranch(subBranchinsert).subscribe(res => {
            console.log(res, 'resss')
            if (res?.recordid) {              
              this.refreshsubjectBranchList();
              this.getMaxIdSubBranch();
              this.cancelClickSubBranch();
            }
          });
        }
      });
    }
    else if(this.subjectBranchForm.value.branchid != 0){
      this.DialogSvc.openConfirmDialog('Are you sure want to update this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          var subBranchinsert = (this.subjectBranchForm.value);
          this.BranchSvc.addNewsubBranch(subBranchinsert).subscribe(res => {
            console.log(res, 'resss')
            if (res?.recordid) {
              this.refreshsubjectBranchList();
              this.getMaxIdSubBranch();
              this.cancelClickSubBranch();
            }
          });
        }
      });
    }
    else{
      alert("Something error;")
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
    this.subjectBranchForm.get('subjectid')?.setValue(0);
    this.subjectBranchForm.get('branch_name')?.setValue('');
    this.subjectBranchForm.get('cuid')?.setValue(1);
    this.BranchbuttonId = true;
  }


}
