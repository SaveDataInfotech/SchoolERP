import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FeesCollectionReportsService {
    readonly apiUrl = 'http://localhost:3399/api/';
    constructor(private http: HttpClient) {
    }

    outstandingreportmultiplestudent(batchYear, classId, groupID, sectionId): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'FeesCollectionReports/get_subject_markentry_byclass?batch_year=' + batchYear + '&classid=' + classId + '&groupid=' + groupID + '&sectionid=' + sectionId);
    }

    outstandingreportindividualstudent(batchYear, ad): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'FeesCollectionReports/outstandingreport_individual_students?batch_year=' + batchYear + '&admission_no=' + ad);
    }

    generalDescriptionReport(value, id, role): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'FeesCollection/fees_description_date?date=' + value + '&id=' + id + '&role=' + role);
    }
    busDescriptionReport(value, id, role): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'FeesCollection/bus_fees_description_date?date=' + value + '&id=' + id + '&role=' + role);
    }

    arrearDescriptionReport(value, id, role): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'FeesCollection/arrear_fees_description_date?date=' + value + '&id=' + id + '&role=' + role);
    }
}