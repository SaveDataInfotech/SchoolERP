import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class studentProfileMigrationService {
    readonly apiUrl = 'http://localhost:3399/api/';
    constructor(private http: HttpClient) {
    }

        getBatchYearList(): Observable<any[]> {
            return this.http.get<any[]>(this.apiUrl + 'StudentProfileMigration/get_student_profile_migration');
        }



        //   getMaxId(): Observable<any[]> {
        //     return this.http.get<any[]>(this.apiUrl + 'StudentSection/get_MaxId_student_section');
        //   }

        newStudentMig(Sectioninsert: any): Observable<any> {
            
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
            
            const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
            return this.http.post<any>(this.apiUrl + 'StudentFeeMig/insert_student_admissionfees_deduction', Sectioninsert, httpOptions);
        }

    //////////////////////////////////////

        getBusList(): Observable<any[]> {
            return this.http.get<any[]>(this.apiUrl + 'StudentFeeMig/get_bus_fees_mig');
        }

        newBusMig(Sectioninsert: any): Observable<any> {
            
            const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
            return this.http.post<any>(this.apiUrl + 'StudentFeeMig/insert_student_bus_fees_deduction_mig', Sectioninsert, httpOptions);
        }


    ///////////////////////// ----- Arrear Fees service


    getarrearList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'ArrearFeeMig/get_arrear_fees_mig');
    }

    newArrearMig(Sectioninsert: any): Observable<any> {
        
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'ArrearFeeMig/insert_Arrear_feeMig', Sectioninsert, httpOptions);
    }


}