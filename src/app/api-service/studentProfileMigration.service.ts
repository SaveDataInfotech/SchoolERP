import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class studentProfileMigrationService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getBatchYearList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StudentProfileMigration/get_student_profile_migration');
    }



    //   getMaxId(): Observable<any[]> {
    //     return this.http.get<any[]>(this.apiUrl + 'StudentSection/get_MaxId_student_section');
    //   }

    newStudentMig(Sectioninsert: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StudentProfileMigration/student_promote', Sectioninsert, httpOptions);
    }

    //   deleteSection(sectionid: any): Observable<any> {
    //     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //     return this.http.delete<any>(this.apiUrl + 'StudentSection/delete_student_section?sectionid=' + sectionid, httpOptions);
    //   }


    //////////////////////////////////

    getFeeList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StudentFeeMig/get_general_fees_mig');
    }

    newFEEMig(Sectioninsert: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StudentFeeMig/insert_student_admissionfees_deduction', Sectioninsert, httpOptions);
    }
}