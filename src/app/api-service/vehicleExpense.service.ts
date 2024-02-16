import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class VehicleExpenseService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getvehicleExpenseList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'VehicleExpense/Get');
    }

    addNewvehicleExpense(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'VehicleExpense/insert_vehicle_expense', value, httpOptions);
    }

    deletevehicleExpense(id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'VehicleExpense/delete_vehicle_expense?expenseid=' + id, httpOptions);
    }
}