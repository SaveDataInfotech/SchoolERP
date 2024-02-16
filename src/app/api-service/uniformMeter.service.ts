import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class uniformMeterService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  getUniformList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'UniformMeter/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'UniformMeter/get_MaxId_Uniform_meter');
  }

  addNewUniform(uniforminsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'UniformMeter/insert_Uniform_meter', uniforminsert, httpOptions);
  }

  deleteUniform(uniformid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'UniformMeter/delete_Uniform_meter?uniformid=' + uniformid, httpOptions);
  }

}