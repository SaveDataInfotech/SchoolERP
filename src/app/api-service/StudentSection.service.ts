import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class studentSectionService {
 readonly apiUrl = 'http://localhost:3399/api/';
  constructor(private http: HttpClient) {
  }

  getSectionList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentSection/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentSection/get_MaxId_student_section');
  }

  addNewSection(Sectioninsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentSection/insert_student_section', Sectioninsert, httpOptions);
  }

  deleteSection(sectionid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'StudentSection/delete_student_section?sectionid=' + sectionid, httpOptions);
  }

}