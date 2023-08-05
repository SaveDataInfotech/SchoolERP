import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import { studentEnquiryService } from 'src/app/api-service/studentEnquiry.service';
@Component({
  selector: 'app-enquiry-dashbord',
  templateUrl: './enquiry-dashbord.component.html',
  styleUrls: ['./enquiry-dashbord.component.scss']
})
export class EnquiryDashbordComponent implements OnInit {
  DashBordList:any=[];
  EnquiryList:any=[];
  EntranceList:any=[];
  SelectedList:any=[];
  constructor(private router: Router,private enquirySvc:studentEnquiryService,) { }

  ngOnInit(): void {
    this.refreshDashBoardList();
    this.refreshEnquiryList();
    this.refreshEntranceList();
    this.refreshSelectedList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard');
  }
  fub() {
    debugger;
    this.router.navigate(['../student_profile"'], { state: { example: 'bar' } });
  }

  refreshDashBoardList() {
    this.enquirySvc.getDashBoardList().subscribe(data => {
      this.DashBordList = data;
    });
  }

  ActiveEnquiryStatusClick(enquiryid: number) {
    this.enquirySvc.ActiveEnquiry(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.refreshDashBoardList();
        this.refreshEnquiryList();  
        this.refreshEntranceList();  
        this.refreshSelectedList();     
      }
    });
  }

  refreshEnquiryList() {
    this.enquirySvc.getEnquiryList().subscribe(data => {
      this.EnquiryList = data;
    });
  }

  ActiveEntranceStatusClick(enquiryid: number) {
    this.enquirySvc.ActiveEntrance(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.refreshDashBoardList();
        this.refreshEnquiryList();  
        this.refreshEntranceList();  
        this.refreshSelectedList();     
      }
    });
  }

  refreshEntranceList() {
    this.enquirySvc.getEntranceList().subscribe(data => {
      this.EntranceList = data;
    });
  }

  ActiveSelectedStatusClick(enquiryid: number) {
    this.enquirySvc.ActiveSelected(enquiryid).subscribe(res => {
      if (res?.recordid) {        
        this.refreshDashBoardList();
        this.refreshEnquiryList();  
        this.refreshEntranceList();  
        this.refreshSelectedList();     
      }
    });
  }

  refreshSelectedList() {
    this.enquirySvc.getSelectedList().subscribe(data => {
      this.SelectedList = data;
    });
  }

  inActiveEnquiryStatusClick(enquiryid: number) {
    this.enquirySvc.inActiveEnquiry(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.refreshDashBoardList();
        this.refreshEnquiryList();  
        this.refreshEntranceList();  
        this.refreshSelectedList();     
      }
    });
  }


  inActiveEntranceStatusClick(enquiryid: number) {
    this.enquirySvc.inActiveEntrance(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.refreshDashBoardList();
        this.refreshEnquiryList();  
        this.refreshEntranceList();  
        this.refreshSelectedList();     
      }
    });
  }

  inActiveSelectedStatusClick(enquiryid: number) {
    this.enquirySvc.inActiveSelected(enquiryid).subscribe(res => {
      if (res?.recordid) {
        this.refreshDashBoardList();
        this.refreshEnquiryList();  
        this.refreshEntranceList();  
        this.refreshSelectedList();     
      }
    });
  }


  ActiveAdmissionClick(selected:any){
    this.router.navigate(
      ['../student_profile', selected]);
  }

}
