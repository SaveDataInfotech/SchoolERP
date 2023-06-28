import { OnInit } from '@angular/core';
import { Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {

  OnSubmit(){
    alert();
  }

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name','Group','section','option'];
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
  {position: 1, name: '1-St', },
  {position: 2, name: '1-ND', },
  {position: 3, name: '3-Rd', },
  {position: 4, name: '4-Th'},
  {position: 5, name: '5-Th', },
  {position: 6, name: '6-Th ', },
  {position: 7, name: '7-Th ',},
  {position: 8, name: '8-Th', },
  {position: 9, name: '9-Th', },
  {position: 10, name: '10-Th', },
  {position: 11, name: '11-Th',  },
  {position: 12, name: '12-Th', }
];
