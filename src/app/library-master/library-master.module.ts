import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookMasterComponent } from './book-master/book-master.component';
import { RouterModule } from '@angular/router';
import { libraryMaterRoutes } from './library.routes';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BookMasterComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(libraryMaterRoutes),
    MatCardModule, MatTabsModule, MatIconModule, MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class LibraryMasterModule { }
