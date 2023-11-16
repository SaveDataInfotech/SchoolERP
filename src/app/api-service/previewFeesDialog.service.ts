import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PreviewFeesDialogComponentComponent } from "../master/preview-fees-dialog-component/preview-fees-dialog-component.component";


@Injectable({
    providedIn: 'root'
})
export class PreviewFeesDialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmDialog(generalFee:any,busFee:any,value) {
        debugger;
        return this.dialog.open(PreviewFeesDialogComponentComponent, {
            width: '620px',
            height:'auto',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: {
                general: generalFee,
                bus:busFee,
                studentDetails:value
            }
        });
    }
}
