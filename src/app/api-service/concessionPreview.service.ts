import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConcessionPreviewComponent } from "../master/concession-preview/concession-preview.component";

@Injectable({
    providedIn: 'root'
})
export class concessionPreviewDialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmDialog(generalFee: any, busFee: any, arrearFee, value) {
        debugger;
        return this.dialog.open(ConcessionPreviewComponent, {
            width: '620px',
            maxHeight: '650px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: {
                general: generalFee,
                bus: busFee,
                arrear: arrearFee,
                studentDetails: value
            }
        });
    }
}
