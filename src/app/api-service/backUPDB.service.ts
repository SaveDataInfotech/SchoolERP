import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./configuration.service";


@Injectable({
    providedIn: 'root'
})
export class backUPDBService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    backupDB(): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<any>(this.apiUrl + 'BackUpDataBase/backUpDataBase', httpOptions);
    }
}