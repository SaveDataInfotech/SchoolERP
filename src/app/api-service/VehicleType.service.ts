import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
 readonly apiUrl = 'http://localhost:3399/api/';
  constructor(private http: HttpClient) {
  }

  getvehicleTypeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'VehicleType/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'VehicleType/get_MaxId_vehicle_type');
  }

  addNewvehicleType(vehicletypeinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'VehicleType/insert_vehicle_type', vehicletypeinsert, httpOptions);
  }

  deletevehicleType(staffTypeid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'VehicleType/delete_vehicle_type?typeid=' + staffTypeid, httpOptions);
  }
}