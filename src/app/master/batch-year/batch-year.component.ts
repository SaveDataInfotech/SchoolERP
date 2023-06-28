import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-batch-year',
  templateUrl: './batch-year.component.html',
  styleUrls: ['./batch-year.component.scss']
})
export class BatchYearComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name','option','active'];
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
  {position: 1, name: '2011-2012', },
  {position: 2, name: '2012-2013', },
  {position: 3, name: '2013-2014', },
  {position: 4, name: '2014-2015'},
  {position: 5, name: '2015-2016', },
  {position: 6, name: '2016-2017 ', },
  {position: 7, name: '2017-2018 ',},
  {position: 8, name: '2018-2019', },
  {position: 9, name: '2019-2020', },
  {position: 10, name: '2020-2021', },
  {position: 11, name: '2021-2022',  },
];
