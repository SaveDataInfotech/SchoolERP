import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class studentEnquiryService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getstaffTypeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StaffType/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StaffType/get_MaxId_staff_type');
  }


  addNewEnquiry(enquiryinsert: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentEnquiry/insert_student_enquiry', enquiryinsert, httpOptions);
  }


  deletestaffType(staffTypeid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'StaffType/delete_staff_type?staffTypeid=' + staffTypeid, httpOptions);
  }
}