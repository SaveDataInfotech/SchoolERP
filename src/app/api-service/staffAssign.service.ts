import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class staffAssignService {
 readonly apiUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {
  }

  searchSubjectByClass(classid: number, groupid: number, sectionid: number, batch_year: any): Observable<any[]> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StaffAssign/get_subject_by_staffassign?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batch_year, httpOptions);
  }

  addNewstaffAssign(staffAsssinInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StaffAssign/insert_staff_assign', staffAsssinInsert, httpOptions);
  }

  getSubjectArray(id:number): Observable<any[]> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StaffAssign/get_subjects_by_staffassign?staff_assign_id='+id,httpOptions);
  }
}