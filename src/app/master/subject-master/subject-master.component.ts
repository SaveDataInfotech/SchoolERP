import { Component, OnInit } from '@angular/core';
import { subjectService } from 'src/app/api-service/subject.service';


@Component({
  selector: 'app-subject-master',
  templateUrl: './subject-master.component.html',
  styleUrls: ['./subject-master.component.scss']
})
export class SubjectMasterComponent implements OnInit {
  notificationSvc: any;

  subjectDetailList: any[] = [];
  
  constructor(private subjectSvc: subjectService,) { }

  ngOnInit(): void {
    this.getSubject();
  }

  getSubject() {
    // this.ngxSpinner.show();
    this.subjectSvc.getSubjectDetails().subscribe(
      (res) => {
        // this.ngxSpinner.hide();
        // this.dataSource?.data = [];
        console.log(res.Result,'test');
        
        if (res.Result?.length) {
          this.subjectDetailList = res.Result;
        }

        if (res?.ErrorMessage) {
          this.notificationSvc.error(`Error!, ${res.ErrorMessage}`);
        }
        // this.ngxSpinner.hide();
      },
      (err) => {
        this.notificationSvc.error('Error!', err);
        // this.ngxSpinner.hide();
      }
    );
  }

}
