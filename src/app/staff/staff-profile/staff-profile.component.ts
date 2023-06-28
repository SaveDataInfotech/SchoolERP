import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit {
  files:File[] = [];
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

replaceFile(){
  this.files.splice(0,1); // index =0 , remove_count = 1
  }

}

// onRemove(event : any) {
//   console.log(event);
//   this.files.splice(this.files.indexOf(event), 1);

// }



