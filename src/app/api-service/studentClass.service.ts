import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class studentClassService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  getClassList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentClass/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentClass/get_MaxId_student_class');
  }

  addNewClass(Classinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentClass/insert_student_class', Classinsert, httpOptions);
  }

  deleteClass(classid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'StudentClass/delete_student_class?classid=' + classid, httpOptions);
  }
}