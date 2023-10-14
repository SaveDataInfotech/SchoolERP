import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclePlaceService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getPlaceList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'VehiclePlace/Get');
  }

  getMaxIdPlace(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'VehiclePlace/get_MaxId_vehicle_place');
  }

  addNewPlace(placeinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'VehiclePlace/insert_vehicle_place', placeinsert, httpOptions);
  }

  deletePlace(placeid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'VehiclePlace/delete_vehicle_place?placeid=' + placeid, httpOptions);
  }
}