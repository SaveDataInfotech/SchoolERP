import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentProfileMigrationService } from 'src/app/api-service/studentProfileMigration.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  StudentMigrationList: any = [];
  FeesList:any=[];
  BusList:any=[];

  ArrearList:any[]=[];
  constructor(private MigSvc: studentProfileMigrationService,
    private notificationSvc: NotificationsService,
    private DialogSvc: DialogService) { }


  ngOnInit(): void {
   this.refreshStudentMigrationList();
   this.refreshFeesDetailsList();
   this.refreshBusDetailsList();

   this.refreshArrearDetailsList()
  }

  refreshStudentMigrationList() {
    this.MigSvc.getBatchYearList().subscribe(data => {
      this.StudentMigrationList = data;
      console.log(this.StudentMigrationList)
    });
  }

  save() {
    if (this.StudentMigrationList.length != 0) {
      this.DialogSvc.openConfirmDialog('Are you sure want to promote ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            this.MigSvc.newStudentMig(this.StudentMigrationList).subscribe(res => {
              
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success('Saved Successfully');
              }
              else if (res.status == "No fees") {
                this.notificationSvc.error('fees details not there for these students');
                // const classid = this.searchStudentForm.classid;
                // const groupid = this.searchStudentForm.groupid;
                // const sectionid = this.searchStudentForm.sectionid;
                // const Batch = this.searchStudentForm.batch_year;
                // if (classid != 0 && sectionid != 0 && Batch != '' && Batch != null) {
                //   this.promoSvc.searchStudentbypromote(classid, groupid, sectionid, Batch).subscribe(data => {
                //     this.StudentList = data;
                //   });
                // }

                this.refreshStudentMigrationList();
              }
              else {
                this.notificationSvc.error('Something Error');
              }
            });
          }
        });
    }
    else {
      this.notificationSvc.error("Please select atlest one student");
    }
  }


  /////////////////////////////

  refreshFeesDetailsList() {
    this.MigSvc.getFeeList().subscribe(data => {
      this.FeesList = data;
      console.log('Fee',this.FeesList)
    });
  }


  Gen() {
    if (this.FeesList.length != 0) {
      this.DialogSvc.openConfirmDialog('Are you sure want to promote ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            this.MigSvc.newFEEMig(this.FeesList).subscribe(res => {
              
              if (res.status == 'Insert Success') {
                this.notificationSvc.success('Saved Successfully');
              }             
              else {
                this.notificationSvc.error('Something Error');
              }
            });
          }
        });
    }
    else {
      this.notificationSvc.error("Please select atlest one student");
    }
  }

  // //////////////////////////////////////////


  refreshBusDetailsList() {
    this.MigSvc.getBusList().subscribe(data => {
      this.BusList = data;
      console.log('Fee',this.BusList)
    });
  }

  Bus() {
    if (this.BusList.length != 0) {
      this.DialogSvc.openConfirmDialog('Are you sure want to promote ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            this.MigSvc.newBusMig(this.BusList).subscribe(res => {
              
              if (res.status == 'Insert Success') {
                this.notificationSvc.success('Saved Successfully');
              }             
              else {
                this.notificationSvc.error('Something Error');
              }
            });
          }
        });
    }
    else {
      this.notificationSvc.error("Please select atlest one student");
    }
  }



  refreshArrearDetailsList() {
    this.MigSvc.getarrearList().subscribe(data => {
      this.ArrearList = data;
      console.log('Arrear',this.ArrearList)
    });
  }

  Arrear() {
    if (this.ArrearList.length != 0) {
      this.DialogSvc.openConfirmDialog('Are you sure want to promote ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            this.MigSvc.newArrearMig(this.ArrearList).subscribe(res => {
              
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success('Saved Successfully');
              }             
              else {
                this.notificationSvc.error('Something Error');
              }
            });
          }
        });
    }
    else {
      this.notificationSvc.error("Please select atlest one student");
    }
  }

}