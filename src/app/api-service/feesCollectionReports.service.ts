import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FeesCollectionReportsService {
   readonly apiUrl = 'http://localhost:8081/api/';
    constructor(private http: HttpClient) {
    }

    outstandingreportmultiplestudent(batchYear, classId, groupID, sectionId): Observable<any[]> {
        debugger;
        return this.http.get<any[]>(this.apiUrl + 'FeesCollectionReports/get_subject_markentry_byclass?batch_year=' + batchYear + '&classid=' + classId + '&groupid=' + groupID + '&sectionid=' + sectionId);
    }

    outstandingreportindividualstudent(batchYear, ad): Observable<any[]> {
        debugger;
        return this.http.get<any[]>(this.apiUrl + 'FeesCollectionReports/outstandingreport_individual_students?batch_year=' + batchYear + '&admission_no=' + ad);
    }

    generalDescriptionReport(value): Observable<any[]> {
        debugger;
        return this.http.get<any[]>(this.apiUrl + 'FeesCollection/fees_description_date?date=' + value);
    }
    busDescriptionReport(value): Observable<any[]> {
        debugger;
        return this.http.get<any[]>(this.apiUrl + 'FeesCollection/bus_fees_description_date?date=' + value);
    }
}