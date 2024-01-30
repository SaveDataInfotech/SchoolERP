import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class markEntryReportService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getconsolidatedMarkRank(classid: number, groupid: number, sectionid: number, batchYear: string, examName): Observable<any[]> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'MarkEntryReports/get_consolidated_rank_report?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batchYear + '&exam_name=' + examName, httpOptions);
    }

    getOverAllSubMarkRank(classid: number, groupid: number, sectionid: number, batchYear: string, examName): Observable<any[]> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'MarkEntryReports/get_overallrankper_mark_entry_rank?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batchYear + '&exam_name=' + examName, httpOptions);
    }

    getMultiMarkRank(classid: number, groupid: number, sectionid: number, batchYear: string): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'MarkEntryReports/multi_mark_exam_report?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batchYear, httpOptions);
    }


    getconsolidatedMarkgrade(classid: number, groupid: number, sectionid: number, batchYear: string, examName): Observable<any[]> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'MarkEntryReports/get_consolidated_grade_report?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batchYear + '&exam_name=' + examName, httpOptions);
    }

    getOverAllSubMarkGrade(classid: number, groupid: number, sectionid: number, batchYear: string, examName): Observable<any[]> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'MarkEntryReports/get_overallrankper_mark_entry_grade?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batchYear + '&exam_name=' + examName, httpOptions);
    }

    getMultiMarkGrade(classid: number, groupid: number, sectionid: number, batchYear: string): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'MarkEntryReports/multi_mark_exam_grade_report?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batchYear, httpOptions);
    }


    getIndividualSubjectMarkRank(classid: number, groupid: number, sectionid: number, batchYear: string): Observable<any[]> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'StudentProfile/get_individual_subject_mark_report?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&batch_year=' + batchYear, httpOptions);
    }
}