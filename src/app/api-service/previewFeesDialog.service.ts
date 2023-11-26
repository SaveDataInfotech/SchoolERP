import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PreviewFeesDialogComponentComponent } from "../master/preview-fees-dialog-component/preview-fees-dialog-component.component";


@Injectable({
    providedIn: 'root'
})
export class PreviewFeesDialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmDialog(generalFee:any,busFee:any,arrearFee,value) {
        debugger;
        return this.dialog.open(PreviewFeesDialogComponentComponent, {
            width: '620px',
            maxHeight:'650px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: {
                general: generalFee,
                bus:busFee,
                arrear:arrearFee,
                studentDetails:value
            }
        });
    }
}
