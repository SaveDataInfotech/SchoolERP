import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    readonly gapiUrl = 'https://localhost:44314/api/';
}