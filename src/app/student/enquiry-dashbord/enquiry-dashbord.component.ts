import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
@Component({
  selector: 'app-enquiry-dashbord',
  templateUrl: './enquiry-dashbord.component.html',
  styleUrls: ['./enquiry-dashbord.component.scss']
})
export class EnquiryDashbordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
fub(){
  debugger;
  this.router.navigate(['../student_profile"'], { state: { example: 'bar' } });
}
}
