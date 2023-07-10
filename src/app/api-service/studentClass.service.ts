import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import {  ApiResult, StudentClassDto } from "src/app/model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class studentClassService{
    apiUrl : string;
    baseUrl = environment.API_URL;
    constructor(private http: HttpClient){
        this.apiUrl = this.baseUrl+'StudentClass';
    }
    
    addNewStudentClass(StudentClassDetail: StudentClassDto){
        debugger;
        return  this.http.post<ApiResult<string>>(this.apiUrl+'/addNewStudentClass' ,StudentClassDetail);
    }

    getStudentClassDetails(){
        console.log("Service Fille Exe")
        return this.http.get<ApiResult<StudentClassDto[]>>(this.apiUrl+'/getStudentClass')
    }
}