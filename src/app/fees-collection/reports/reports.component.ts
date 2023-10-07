import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  markEntryForm: FormGroup;
  sub:any;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.markEntryForm = this.fb.group({
      students: this.fb.array([])
    });

    this.sub=['Math', 'Science','English', 'History']

    // Data from another array: Students
    const studentsData = [
      { name: 'Student 1', subjects:this.sub },
      { name: 'Student 2', subjects: this.sub }
    ];

    studentsData.forEach(student => {
      this.addStudent(student);
    });

    this.onSubmit()
  }

  createStudentFormGroup(student?: any): FormGroup {
    student = student || { name: '', subjects: [] };
    return this.fb.group({
      name: [student.name, Validators.required],
      subjects: this.fb.array(student.subjects.map(subject => this.createSubjectFormGroup(subject)))
    });
  }

  getControls() {
    return (this.markEntryForm.get('students') as FormArray).controls;
  }

  createSubjectFormGroup(subject?: string): FormGroup {
    return this.fb.group({
      name: [subject, Validators.required],
      marks: ['', Validators.required],
      grade: ['', Validators.required],
    });
  }

  addStudent(student?: any) {
    const students = this.markEntryForm.get('students') as FormArray;
    students.push(this.createStudentFormGroup(student));
  }

  addSubject(studentFormGroup: FormGroup) {
    const subjects = studentFormGroup.get('subjects') as FormArray;
    subjects.push(this.createSubjectFormGroup());
  }



  onSubmit() {
    if (this.markEntryForm.valid) {
      console.log(this.markEntryForm.value);
    } else {
      console.log(this.markEntryForm.value);
    }
  }

}
