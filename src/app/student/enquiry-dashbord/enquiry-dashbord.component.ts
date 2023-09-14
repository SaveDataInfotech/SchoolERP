import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentEnquiryService } from 'src/app/api-service/studentEnquiry.service';
import { StudentProfileComponent } from '../student-profile/student-profile.component';
@Component({
  selector: 'app-enquiry-dashbord',
  templateUrl: './enquiry-dashbord.component.html',
  styleUrls: ['./enquiry-dashbord.component.scss']
})
export class EnquiryDashbordComponent implements OnInit {
  DashBordList: any = [];
  EnquiryList: any = [];
  EntranceList: any = [];
  SelectedList: any = [];

  serachList: any = [];
  staffTypeid: number = 0;
  ClassList: any = [];
  constructor(private router: Router,
    private enquirySvc: studentEnquiryService,
    private ClassSvc: studentClassService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService) { }

  ngOnInit(): void {
    this.refreshClassList();
    this.serchList(this.staffTypeid);
  }
  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  onchange(id: any) {
    debugger;
    var idd = Number(id)
    this.staffTypeid = idd;
    this.serchList(this.staffTypeid);
  }

  serchList(staffTypeid: any) {
    this.enquirySvc.serchList(staffTypeid).subscribe(data => {
      this.serachList = data;
      this.DashBordList = this.serachList.filter((e: any) => { return e.isactive == 1 });
      this.EnquiryList = this.serachList.filter((e: any) => { return e.enquiry_status == 1 });
      this.EntranceList = this.serachList.filter((e: any) => { return e.entrance_status == 1 });
      this.SelectedList = this.serachList.filter((e: any) => { return e.selected_status == 1 });
    });
  }

  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  ActiveEnquiryStatusClick(enquiryid: number) {
    this.enquirySvc.ActiveEnquiry(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.serchList(this.staffTypeid);
      }
    });
  }

  ActiveEntranceStatusClick(enquiryid: number) {
    this.enquirySvc.ActiveEntrance(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.serchList(this.staffTypeid);
      }
    });
  }

  ActiveSelectedStatusClick(enquiryid: number) {
    this.enquirySvc.ActiveSelected(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.serchList(this.staffTypeid);
      }
    });
  }

  inActiveEnquiryStatusClick(enquiryid: number) {
    this.enquirySvc.inActiveEnquiry(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.serchList(this.staffTypeid);
      }
    });
  }

  inActiveEntranceStatusClick(enquiryid: number) {
    this.enquirySvc.inActiveEntrance(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.serchList(this.staffTypeid);
      }
    });
  }

  inActiveSelectedStatusClick(enquiryid: number) {
    this.enquirySvc.inActiveSelected(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.serchList(this.staffTypeid);
      }
    });
  }


  ActiveAdmissionClick(selected: any) {
    debugger;
    var myStr = JSON.stringify(selected);
    sessionStorage.setItem("selectd", myStr);
    //this.pro.setvalueform(myStr);
    this.router.navigateByUrl('/app/student/student_profile');
  }

  removeAllRegister() {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete all Registeration ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.enquirySvc.removeAllRegister().subscribe(res => {
            if (res.status == 'Saved successfully') {
              this.notificationSvc.error("Deleted Success")
              this.serchList(this.staffTypeid);
            }
            else {
              this.notificationSvc.error("Something Error")
            }
          });
        }
      });
  }

}
