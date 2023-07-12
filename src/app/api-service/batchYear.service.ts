import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiResult, BatchYearDto } from "../model";


@Injectable({
    providedIn: 'root'
})
export class BatechYearService{
    apiUrl : string;
    baseUrl = environment.API_URL;
    constructor(private http: HttpClient){
        this.apiUrl = this.baseUrl+'batchyear';
    }
    

    getBatchYearDetails(){
        console.log("Service Fille Exe")
        return this.http.get<ApiResult<BatchYearDto[]>>(this.apiUrl+'/getBatchYear')
    }
}