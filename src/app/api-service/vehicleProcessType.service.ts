import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleProcessTypeService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getvehicleProcessTypeList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'VehicleProcessType/Get');
    }

    getMaxId(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'VehicleProcessType/get_MaxId_vehicle_process_type');
    }

    addNewvehicleProcessType(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'VehicleProcessType/insert_vehicle_process_type', value, httpOptions);
    }

    deletevehicleProcessType(id: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'VehicleProcessType/Delete_vehicle_process_type?processid=' + id, httpOptions);
    }
}