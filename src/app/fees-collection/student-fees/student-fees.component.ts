import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-fees',
  templateUrl: './student-fees.component.html',
  styleUrls: ['./student-fees.component.scss']
})
export class StudentFeesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  printbill(){
    print()
  }

}
