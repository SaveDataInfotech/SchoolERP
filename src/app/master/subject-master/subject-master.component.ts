import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-subject-master',
  templateUrl: './subject-master.component.html',
  styleUrls: ['./subject-master.component.scss']
})
export class SubjectMasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
  {position: 1, name: 'Tamil', },
  {position: 2, name: 'English', },
  {position: 3, name: 'Maths', },
  {position: 4, name: 'science'},
  {position: 5, name: 'Social Science', },
  {position: 6, name: 'history ', },
  {position: 7, name: 'physics ',},
  {position: 8, name: 'chemistry', },
  {position: 9, name: 'Zoology', },
  {position: 10, name: 'Botony', },
  {position: 11, name: 'Computer Science',  },
  {position: 12, name: 'geography', },
  {position: 13, name: 'biology',  },
  {position: 14, name: 'Economics',  },
  {position: 15, name: 'Accountancy',},
  {position: 16, name: 'Commerce',  },
  {position: 17, name: 'Political Science',  },
  {position: 18, name: 'EVS', },
  {position: 19, name: 'PET', },
  {position: 20, name: 'Music',},
];
