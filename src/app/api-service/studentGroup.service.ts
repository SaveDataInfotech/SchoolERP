import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import {  ApiResult, StudentGroupDto } from "src/app/model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class studentGroupService{
    apiUrl : string;
    baseUrl = environment.API_URL;
    constructor(private http: HttpClient){
        this.apiUrl = this.baseUrl+'StudentGroup';
    }
    

    getStudentGroupDetails(){
        console.log("Service Fille Exe")
        return this.http.get<ApiResult<StudentGroupDto[]>>(this.apiUrl+'/getStudentGroup')
    }
}