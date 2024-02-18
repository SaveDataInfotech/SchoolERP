import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./configuration.service";


@Injectable({
    providedIn: 'root'
})
export class schoolDetailsService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'SchoolDetails/Get');
    }

    // GetActiveBatchYear(): Observable<any[]> {
    //     return this.http.get<any[]>(this.apiUrl + 'BatchYear/ActiveBatchGet');
    // }

    addNewDetail(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post(this.apiUrl + 'SchoolDetails/insert_school_deatils', value, httpOptions);
    }

    ActiveStatus(id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<any>(this.apiUrl + 'SchoolDetails/Update_school_details_activeStataus?schoolid=' + id, httpOptions);
    }

    delete(id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'SchoolDetails/delete_school_deatils?schoolid=' + id, httpOptions);
    }
}