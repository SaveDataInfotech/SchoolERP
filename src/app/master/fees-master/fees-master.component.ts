import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-fees-master',
  templateUrl: './fees-master.component.html',
  styleUrls: ['./fees-master.component.scss']
})
export class FeesMasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position','name','option'];
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
  {position: 1, name: 'Ram', },
  {position: 2, name: 'Oliviya', },
  {position: 3, name: 'Priya', },
  {position: 4, name: 'Raju'},
  {position: 5, name: 'Vijay', },
  {position: 6, name: 'Adam ', },
  {position: 7, name: 'James ',},
  {position: 8, name: 'Stevie Smith', },
  {position: 9, name: 'Aristotle', },
  {position: 10, name: 'Roy', },
  {position: 11, name: 'Robert',  },
  {position: 12, name: 'Simon', },
  {position: 13, name: 'Sam',  },
  {position: 14, name: 'Kumar',  },
  {position: 15, name: 'Arun',},
  {position: 16, name: 'Aravindh',  },
  {position: 17, name: 'Aakash',  },
  {position: 18, name: 'Divya', },
  {position: 19, name: 'Mohan', },
  {position: 20, name: 'Krish',},
];
