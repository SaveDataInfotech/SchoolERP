import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class VehicleDetailsService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getvehicleDetailsList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'VehicleDetails/Get');
    }

    addNewvehicleDetails(values: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'VehicleDetails/insert_vehicle_details', values, httpOptions);
    }

    deletevehicleDetails(id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'VehicleDetails/delete_vehicle_details?detailsid=' + id, httpOptions);
    }
}