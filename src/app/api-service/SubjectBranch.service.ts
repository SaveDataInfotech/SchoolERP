import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectBranchService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getsubBranchList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'SubjectBranch/Get');
  }

  getMaxIdsubBranch(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'SubjectBranch/get_MaxId_subject_branches');
  }


  addNewsubBranch(subBranchinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'SubjectBranch/insert_subject_branches', subBranchinsert, httpOptions);
  }


  deletesubBranch(branchid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'SubjectBranch/delete_subject_branches?branchid=' + branchid, httpOptions);
  }

}