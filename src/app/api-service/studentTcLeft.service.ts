import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class studentTcLeftService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  searchStudentByClass(classid:number,groupid:number,sectionid:number,batch_year:any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StudentTcLeft/get_student_lefttc_byclass?classid='+classid+'&groupid='+groupid+'&sectionid='+sectionid+'&batch_year='+batch_year,httpOptions);
  }

}