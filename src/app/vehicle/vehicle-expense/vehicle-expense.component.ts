import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-expense',
  templateUrl: './vehicle-expense.component.html',
  styleUrls: ['./vehicle-expense.component.scss']
})
export class VehicleExpenseComponent implements OnInit {

  constructor() { }

  date1=new Date();

  currentYear=this.date1.getUTCFullYear();

  currentMonth=this.date1.getUTCMonth()+1;

  currentDate=this.date1.getUTCDate();

  today="2023-12-12";

  finalMonth:any;
  finalDay:any;

  ngOnInit(): void {

    if(this.currentMonth < 10){
      this.finalMonth="0"+this.currentMonth;
    }
    else{
      this.finalMonth=this.currentMonth;
    }


    if(this.currentDate < 10){
      this.finalDay="0"+this.currentDate;
    }
    else{
      this.finalDay=this.currentDate;
    }

    this.today=this.currentYear+"-"+this.finalMonth+"-"+this.finalDay;

  }

}
