import { Component, OnInit } from '@angular/core';
import { dashBoardService } from '../api-service/dashBoard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  studentCount: string;
  todayCollectedAmount: string;
  total_balance_amount: string;
  animationState: string = 'show';
  constructor(private dBSvc: dashBoardService,
  ) {
  }

  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDate = this.date1.getUTCDate();
  todayDate: Date = new Date();
  today = String(this.todayDate);
  finalMonth: any;
  finalDay: any;
  ngOnInit(): void {
    if (this.currentMonth < 10) {
      this.finalMonth = "0" + this.currentMonth;
    }
    else {
      this.finalMonth = this.currentMonth;
    }
    if (this.currentDate < 10) {
      this.finalDay = "0" + this.currentDate;
    }
    else {
      this.finalDay = this.currentDate;
    }
    this.today = this.currentYear + "-" + this.finalMonth + "-" + this.finalDay;

    this.reloadFunctions();

    setInterval(() => {
      this.reloadFunctions();
    }, 8000);
  }

  reloadFunctions(): void {
    this.totalNoOfStudents();
    this.todayDeductionAmount();
    this.todayBalanceAmount();
  }

  totalNoOfStudents() {
    this.dBSvc.totalStudents().subscribe(data => {
      if (data) {
        this.studentCount = data[0].studentcount
      }
    });
  }

  todayDeductionAmount() {
    this.dBSvc.todayDeductionAmount(this.today).subscribe(data => {
      if (data) {
        this.todayCollectedAmount = data[0].today_deduction_amount
      }
    });
  }

  todayBalanceAmount() {
    this.dBSvc.todayBalanceAmount().subscribe(data => {
      if (data) {
        this.total_balance_amount = data[0].total_balance_amount
      }
    });
  }
}