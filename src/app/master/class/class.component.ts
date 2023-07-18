import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { studentClassService } from 'src/app/api-service/studentClass.service';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  ClassList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  constructor(
    private ClassSvc: studentClassService) {
  }

  ngOnInit(): void {
    this.refreshClassList(),
      this.getMaxId(),
      this.cancelClick()
  }

  Student_classForm = new FormGroup({
    classid: new FormControl(0),
    class_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  get stafftype() {
    return this.Student_classForm.get('stafftype');
  }

  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  New_Class() {
    var Classinsert = (this.Student_classForm.value);
    this.ClassSvc.addNewstaffType(Classinsert).subscribe(res => {
      if (res?.recordid) {
        this.refreshClassList();
        this.getMaxId();
        this.cancelClick();
      }
    });
  }

  getMaxId() {
    this.ClassSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(classid: number) {
    this.ClassSvc.deletestaffType(classid).subscribe(res => {
      if (res?.recordid) {
        this.refreshClassList();
        this.getMaxId();
        this.cancelClick();
      }
    });
  }

  updateGetClick(StClass: any) {
    this.Student_classForm.get('classid')?.setValue(StClass.classid);
    this.Student_classForm.get('class_name')?.setValue(StClass.class_name);
    this.Student_classForm.get('cuid')?.setValue(StClass.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.Student_classForm.reset();
    this.Student_classForm.get('classid')?.setValue(0);
    this.Student_classForm.get('class_name')?.setValue('');
    this.Student_classForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }

}

