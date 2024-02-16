import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleNoRootService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  getVeNoRtList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'VehicleNoRoot/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'VehicleNoRoot/get_MaxId_vehicle_no_root');
  }

  addNewVeNoRt(venortinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'VehicleNoRoot/insert_vehicle_no_root', venortinsert, httpOptions);
  }

  deleteVeNoRt(vehicle_no_id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'VehicleNoRoot/delete_vehicle_no_root?vehicle_no_id=' + vehicle_no_id, httpOptions);
  }
}