import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HttpClient,HttpClientModule,HttpHeaders,} from '@angular/common/http';


@Component({
  selector: 'app-staff-type',
  templateUrl: './staff-type.component.html',
  styleUrls: ['./staff-type.component.scss']
})
export class StaffTypeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
  }

  formdata={staff:""};

  onsubmit(){
    
   var stafftypeinsert=JSON.stringify(this.formdata);
    debugger;
    alert(this.formdata.staff);
    alert(stafftypeinsert);
    var headers =new Headers({'Content-Type':'appliction/json'});
    let options = {
      headers: headers 
   }

    return this.http.post("https://localhost:44326/api/StaffType",stafftypeinsert);

  }
   

  displayedColumns: string[] = ['position', 'name','option'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Teaching Staff', },
  {position: 2, name: 'Driver', },
  {position: 3, name: 'Attender', },
  {position: 3, name: 'Watch Man', },
];

