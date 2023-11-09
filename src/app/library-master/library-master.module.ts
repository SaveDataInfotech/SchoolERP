import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookMasterComponent } from './book-master/book-master.component';
import { RouterModule } from '@angular/router';
import { libraryMaterRoutes } from './library.routes';


@NgModule({
  declarations: [
    BookMasterComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(libraryMaterRoutes),
  ]
})
export class LibraryMasterModule { }
