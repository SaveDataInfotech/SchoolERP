import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class staffTypeService {
 readonly apiUrl = 'http://localhost:3399/api/';
  constructor(private http: HttpClient) {
  }

  getstaffTypeList(): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiUrl + 'StaffType/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StaffType/get_MaxId_staff_type');
  }

  addNewstaffType(stafftypeinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StaffType/insert_staff_type', stafftypeinsert, httpOptions);
  }

  deletestaffType(staff_typeid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'StaffType/delete_staff_type?staff_typeid=' + staff_typeid, httpOptions);
  }

  // udateGetClick(staffTypeid:number): Observable<any[]> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.get<any[]>(this.apiUrl + 'StaffType/get_staff_type_ById?staffTypeid='+staffTypeid,httpOptions);
  // }

}