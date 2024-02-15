import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EnrollmentNoDialogComponent } from "../master/enrollment-no-dialog/enrollment-no-dialog.component";


@Injectable({
    providedIn: 'root'
})
export class enrollmentNoDialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmDialog(msg: string) {
        return this.dialog.open(EnrollmentNoDialogComponent, {
            width: '390px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: {
                message: msg
            }
        });
    }
}
