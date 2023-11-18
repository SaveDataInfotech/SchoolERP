import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleDistanceService {
   readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getvehicleDistanceList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'VehicleDistance/Get');
    }

    addNewvehicleDistance(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'VehicleDistance/insert_vehicle_distance', value, httpOptions);
    }

    deletevehicleDistance(id: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'VehicleDistance/delete_vehicle_distance?distanceid=' + id, httpOptions);
    }
}