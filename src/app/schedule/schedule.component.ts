import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { studentTcLeftService } from '../api-service/studentTcLeft.service';
import { markEntryService } from '../api-service/markEntryGrade.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  allstudentList: any[] = [];
  subjectList:any[]=[];
  spiltList:any[]=[];
  
  constructor(private spinner: NgxSpinnerService,
    private tcSvc: studentTcLeftService,
    private meSvc: markEntryService) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.searchStudentByClass();
  }


  searchStudentByClass() {
    debugger;  
    let classid: number = (1);
    let groupid: number = (0);
    let sectionid: number = (1);

    this.meSvc.searchSubjectByClass(classid, groupid, sectionid).subscribe(data => {
      debugger;
      this.subjectList = data;
      console.log('subject'+this.subjectList)
      this.spiltList = this.subjectList[0].subjectsname.split(",").map(function(item){
        return { name: item,mark:0,grade:'',s_status:'',selected: false };
      });
      console.log('spilt'+this.spiltList+'aaa');


      // this.spiltList[0].forEach(element => {
      //   const control = <FormArray>this.subjectsFormGroup(element.i).controls['studentSubjectArray'];      
      //   control.push(
      //     new FormGroup({
      //       subject:new FormControl(element.name),
      //       mark:new FormControl(element.mark),
      //     })
      //   )
      // });
    });

  }

  getAllStudents() {
    debugger;
    this.spinner.show();
    this.tcSvc.allStudents().subscribe(data => {
      this.allstudentList = data;
      this.spinner.hide();

      this.allstudentList.forEach(element => {
        const control = <FormArray>this.studentForm.controls['studentList'];
        this.spiltList.forEach(element => {
          const control = <FormArray>this.subjectsFormGroup(element.i).controls['studentSubjectArray'];      
          control.push(
            new FormGroup({
              subject:new FormControl(element.name),
              mark:new FormControl(element.mark),
            })
          )
        });
        control.push(
          new FormGroup({
            student_name: new FormControl(element.student_name),
            student_class:new FormControl(element.classid),
            studentSubjects:new FormGroup({
              studentSubjectArray:new FormArray([this.putNewSubject()])
            })
          })
        )
      });
    });
  }

  studentForm:FormGroup=new FormGroup({
    EX_name:new FormControl('Sem'),
    studentList:new FormArray([])
  });
  studentListArray(){
    return this.studentForm.get('studentList') as FormArray;
  }

  // getStudentsFields():FormGroup{
  //   return new FormGroup ({    
  //     student_name:new FormControl(''),
  //     student_class:new FormControl(''),
  //     studentSubjects:new FormGroup({
  //       studentSubjectArray:new FormArray([this.putNewSubject()])
  //     })
  //   });
  // }

  // addStudent(){
  //   this.studentListArray().push(this.getStudentsFields());
  // }



  subjectsFormGroup(i:number){
    return this.studentListArray().at(i).get('studentSubjects') as FormGroup;
  }

  subjectsArray(i){
    return this.subjectsFormGroup(i).get('studentSubjectArray') as FormArray;
  }

  putNewSubject(){
    return new FormGroup({
      subject:new FormControl(''),
      mark:new FormControl(''),
    })
  }

  addNewSubject(i){
    this.subjectsArray(i).push(this.putNewSubject());
  }

  save()
  {
    console.log(this.studentForm)
  }
}
