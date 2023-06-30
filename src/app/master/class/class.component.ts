import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classcodeauto = 1;
  classForm!: FormGroup;
  sectionForm!:FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.classForm = this.fb.group({
      classname: ['', Validators.required],
    })

    this.sectionForm=this.fb.group({
      classname: ['', Validators.required],
    })
  }

  classdata = { classname: "", classcode: this.classcodeauto };

  onClassSubmit() {
    console.log(this.classdata)
    debugger;
    if (this.classForm.invalid) {
      debugger;
      this.submitted = true;
    }
    else if (this.classForm.valid) {
      debugger;
      alert(this.classdata.classcode + "-" + this.classdata.classname);
      this.submitted = false;
      this.classcodeauto += 1;
      this.classForm.reset();
    }

    //window.location.reload();
    //this.classForm.hide();
  }

  sectiondata = { classname:0,};
  classnamee=this.sectiondata.classname;
  
  onSectionSubmit(){
    debugger;
    alert(this.sectiondata.classname)
  }
}