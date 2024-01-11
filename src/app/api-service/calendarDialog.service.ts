import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CalendarDialogComponent } from "../master/calendar-dialog/calendar-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class calendarDialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmDialog(msg: string, nestedHomeWorkList: any, stafftimetablelist: any) {
        return this.dialog.open(CalendarDialogComponent, {
            width: '550px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: {
                msg: msg,
                homework: nestedHomeWorkList,
                timeTable: stafftimetablelist
            }
        });
    }
}
