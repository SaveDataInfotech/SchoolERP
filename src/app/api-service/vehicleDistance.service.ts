import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class VehicleDistanceService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getvehicleDistanceList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'VehicleDistance/Get');
    }

    addNewvehicleDistance(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'VehicleDistance/insert_vehicle_distance', value, httpOptions);
    }

    deletevehicleDistance(id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'VehicleDistance/delete_vehicle_distance?distanceid=' + id, httpOptions);
    }
}