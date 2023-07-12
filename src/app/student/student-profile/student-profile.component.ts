import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {


  files:File[] = []; //used to bring the photo as a o/p in front design

  constructor() { }


  ngOnInit(): void {
  }


  ngxSpinner: any;

  onSelect(event: any) {
    
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){ // checking if files array has more than one content
      this.replaceFile(); // replace file
      }
    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) { 
      formData.append("file[]", this.files[0]);
    }
    
}
  replaceFile() {
    this.files.splice(0,1); // index =0 , remove_count = 1
  }





}
