import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ResonDialogComponent } from "../master/reson-dialog/reson-dialog.component";


@Injectable({
    providedIn:'root'
})
export class resonDialogService{
    
    constructor(private dialog:MatDialog){ }

    openConfirmDialog(msg: string){
           return this.dialog.open(ResonDialogComponent,{
                width:'390px',                            
                panelClass:'confirm-dialog-container',
                disableClose: true,
                data:{
                    message:msg
                }
            });
    }
}
