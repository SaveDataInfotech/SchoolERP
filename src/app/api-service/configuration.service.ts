import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    readonly gapiUrl = 'http://localhost:3399/api/';
}