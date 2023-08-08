import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentEnquiryService } from 'src/app/api-service/studentEnquiry.service';
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
  ClassList:any=[];
  constructor(private router: Router, private enquirySvc: studentEnquiryService,private ClassSvc: studentClassService) { }

  ngOnInit(): void {
    this.refreshClassList();


    // this.refreshDashBoardList();
    // this.refreshEnquiryList();
    // this.refreshEntranceList();
    // this.refreshSelectedList();

    this.serchList(this.staffTypeid);
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard');
  }
  fub() {
    debugger;
    this.router.navigate(['../student_profile"'], { state: { example: 'bar' } });
  }

  onchange(id:any){
    debugger;
   var idd=Number(id)
    this.staffTypeid=idd;
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
    console.log(staffTypeid, 'yy'); // bharath
    //this.stafftypeForm.patchValue(staffTypeid);
  }

  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  refreshDashBoardList() {
    debugger;
    this.enquirySvc.getDashBoardList().subscribe(data => {
      this.DashBordList = data;
    });
  }

  ActiveEnquiryStatusClick(enquiryid: number) {
    this.enquirySvc.ActiveEnquiry(enquiryid).subscribe(res => {
      if (res?.recordid) {
        // this.refreshDashBoardList();
        // this.refreshEnquiryList();
        // this.refreshEntranceList();
        // this.refreshSelectedList();

        this.serchList(this.staffTypeid);
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
        // this.refreshDashBoardList();
        // this.refreshEnquiryList();
        // this.refreshEntranceList();
        // this.refreshSelectedList();

        this.serchList(this.staffTypeid);
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
        // this.refreshDashBoardList();
        // this.refreshEnquiryList();
        // this.refreshEntranceList();
        // this.refreshSelectedList();

        this.serchList(this.staffTypeid);
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
        // this.refreshDashBoardList();
        // this.refreshEnquiryList();
        // this.refreshEntranceList();
        // this.refreshSelectedList();

        this.serchList(this.staffTypeid);
      }
    });
  }


  inActiveEntranceStatusClick(enquiryid: number) {
    this.enquirySvc.inActiveEntrance(enquiryid).subscribe(res => {
      if (res?.recordid) {
        // this.refreshDashBoardList();
        // this.refreshEnquiryList();
        // this.refreshEntranceList();
        // this.refreshSelectedList();

        this.serchList(this.staffTypeid);
      }
    });
  }

  inActiveSelectedStatusClick(enquiryid: number) {
    this.enquirySvc.inActiveSelected(enquiryid).subscribe(res => {
      if (res?.recordid) {
        // this.refreshDashBoardList();
        // this.refreshEnquiryList();
        // this.refreshEntranceList();
        // this.refreshSelectedList();

        this.serchList(this.staffTypeid);
      }
    });
  }


  ActiveAdmissionClick(selected: any) {
    debugger;
   var myStr = JSON.stringify(selected);
    sessionStorage.setItem("selectd",myStr);
    //this.router.navigateByUrl('student/student_profile');
   //this.router.navigate([ '/student_profile']);
  }

  // ngOnInuit(){
  //   const storedValue = sessionStorage.getItem("selectd");

  //   form.patchValue(storedValue)
  // }

}
