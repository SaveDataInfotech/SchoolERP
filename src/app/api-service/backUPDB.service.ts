import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class backUPDBService {
    constructor(private http: HttpClient) {
    }

    readonly apiUrl = 'https://localhost:44314/api/';

    backupDB(): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<any>(this.apiUrl + 'BackUpDataBase/backUpDataBase', httpOptions);
    }
}