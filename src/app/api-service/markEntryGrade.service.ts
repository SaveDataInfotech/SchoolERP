import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class markEntryService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
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
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'MarkEntryGrade/insert_student_markentry_rank', value, httpOptions);
  }
}