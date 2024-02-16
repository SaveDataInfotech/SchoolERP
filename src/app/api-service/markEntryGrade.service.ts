import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class markEntryService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  searchStudentByClass(classid: number, groupid: number, sectionid: number, batchYear: string): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'MarkEntryGrade/get_student_markentry_byclass?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batchYear, httpOptions);
  }

  searchSubjectByClass(classid: number, groupid: number, sectionid: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'MarkEntryGrade/get_subject_markentry_byclass?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid, httpOptions);
  }

  newRankTypeMark(value: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'MarkEntryGrade/insert_student_markentry_rank', value, httpOptions);
  }

  editRankTypeMark(value: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'MarkEntryGrade/update_student_markentry_rank', value, httpOptions);
  }

  refresStudentList(examClass, examGroup, examSection, examBatchYear, examName): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'MarkEntryGrade/get_student_mark_by_rank?classid=' + examClass + '&groupid=' + examGroup + '&sectionid=' + examSection + '&batch_year=' + examBatchYear + '&exam_name=' + examName, httpOptions);
  }

  refresSubjectList(classID, groupID, sectionID, batchYear, examName): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'MarkEntryGrade/get_subject_mark_by_rank?classid=' + classID + '&groupid=' + groupID + '&sectionid=' + sectionID + '&batch_year=' + batchYear + '&exam_name=' + examName, httpOptions);
  }

  refresExamname(classID, groupID, sectionID, batchYear): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'MarkEntryGrade/get_exam_name_mark_entry?classid=' + classID + '&groupid=' + groupID + '&sectionid=' + sectionID + '&batch_year=' + batchYear, httpOptions);
  }
  ////////////////////////////////
  refresExamnameGradeList(examClass, examGroup, examSection, examBatchYear, examName): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'MarkEntryGrade/get_student_mark_by_grade?classid=' + examClass + '&groupid=' + examGroup + '&sectionid=' + examSection + '&batch_year=' + examBatchYear + '&exam_name=' + examName, httpOptions);
  }

  newGradekTypeMark(value: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'MarkEntryGrade/insert_student_markentry_grade', value, httpOptions);
  }

  refresExamnameGroup(classID, groupID, sectionID, batchYear): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'MarkEntryGrade/get_exam_name_mark_entry_grade?classid=' + classID + '&groupid=' + groupID + '&sectionid=' + sectionID + '&batch_year=' + batchYear, httpOptions);
  }

  refresSubjectGradeList(classID, groupID, sectionID, batchYear, examName): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'MarkEntryGrade/get_subject_mark_by_grade?classid=' + classID + '&groupid=' + groupID + '&sectionid=' + sectionID + '&batch_year=' + batchYear + '&exam_name=' + examName, httpOptions);
  }

  editGradeTypeMark(value: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'MarkEntryGrade/update_student_markentry_grade', value, httpOptions);
  }
}