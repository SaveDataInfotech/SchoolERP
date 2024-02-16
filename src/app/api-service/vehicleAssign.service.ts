import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class VehicleAssignService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getvehicleAssignList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'VehicleAssign/Get');
    }

    getMaxId(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'VehicleProcessType/get_MaxId_vehicle_process_type');
    }

    addNewvehicleAssign(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'VehicleAssign/insert_vehicle_assign', value, httpOptions);
    }

    deletevehicleAssign(id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'VehicleAssign/Delete_vehicle_assign?vehicle_assignid=' + id, httpOptions);
    }
}