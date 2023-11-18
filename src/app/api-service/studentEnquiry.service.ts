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

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentEnquiry/get_MaxId_student_enquiry');
  }

  addNewEnquiry(enquiryinsert: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentEnquiry/insert_student_enquiry', enquiryinsert, httpOptions);
  }

  ActiveEnquiry(enquiryid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'StudentEnquiry/Update_student_enquiry_toenquiry?enquiryid=' + enquiryid, httpOptions);
  }

  ActiveEntrance(enquiryid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'StudentEnquiry/Update_student_enquiry_toentrance?enquiryid=' + enquiryid, httpOptions);
  }

  ActiveSelected(enquiryid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'StudentEnquiry/Update_student_enquiry_toselected?enquiryid=' + enquiryid, httpOptions);
  }

  inActiveEnquiry(enquiryid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'StudentEnquiry/Update_student_enquiry_inactiveenquiry?enquiryid=' + enquiryid, httpOptions);
  }

  inActiveEntrance(enquiryid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'StudentEnquiry/Update_student_enquiry_inactiveentrance?enquiryid=' + enquiryid, httpOptions);
  }

  inActiveSelected(enquiryid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'StudentEnquiry/Update_student_enquiry_inactiveselected?enquiryid=' + enquiryid, httpOptions);
  }

  serchList(classid: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StudentEnquiry/get_student_enquiry_search?classid=' + classid, httpOptions);
  }

  removeAllRegister(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'StudentEnquiry/Update_student_enquiry_remove_all', httpOptions);
  }

  deleteEnquiry(enquiryid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'StudentEnquiry/Delete_enquiry?enquiryid=' + enquiryid, httpOptions);
  }
}