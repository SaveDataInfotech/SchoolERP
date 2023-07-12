import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import { BatechYearService } from 'src/app/api-service/batchYear.service';

@Component({
  selector: 'app-batch-year',
  templateUrl: './batch-year.component.html',
  styleUrls: ['./batch-year.component.scss']
})
export class BatchYearComponent implements OnInit {
  notificationSvc: any;

  batchList:any[]=[];

  constructor(private batchyearSvc: BatechYearService) {}

  ngOnInit(): void {
    this.getbatchYear()
  }
  getbatchYear() {  
    // this.ngxSpinner.show();
    this.batchyearSvc.getBatchYearDetails().subscribe(
      (res) => {
        // this.ngxSpinner.hide();
        // this.dataSource?.data = [];
        console.log(res.Result,'test');
        
        if (res.Result?.length) {
          this.batchList = res.Result;
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

