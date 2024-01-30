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
  today: string;
  constructor(private dBSvc: dashBoardService,
  ) {
  }

  ngOnInit(): void {
    this.today = new Date().toISOString().slice(0, 10);

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