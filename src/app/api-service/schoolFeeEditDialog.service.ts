import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SchoolfeeEditComponent } from "../master/schoolfee-edit/schoolfee-edit.component";


@Injectable({
    providedIn: 'root'
})
export class SchoolfeeEditDialogService {

    constructor(private dialog: MatDialog) { }

    openConfirmDialog(value) {
        debugger;
        return this.dialog.open(SchoolfeeEditComponent, {
            width: '620px',
            maxHeight: '650px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: {
                data: value
            }
        });
    }
}
