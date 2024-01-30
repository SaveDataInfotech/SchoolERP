import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleDetailsService {
   readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
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