import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class SupplierTypeService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  getsupplierTypeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'SupplierType/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'SupplierType/get_MaxId_supplier_type');
  }

  addNewsupplierType(suppliertypeinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'SupplierType/insert_supplier_type', suppliertypeinsert, httpOptions);
  }

  deletesupplierType(supplierid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'SupplierType/delete_supplier_type?supplierid=' + supplierid, httpOptions);
  }

}