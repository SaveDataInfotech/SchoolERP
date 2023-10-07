import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogModule,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-reson-dialog',
  templateUrl: './reson-dialog.component.html',
  styleUrls: ['./reson-dialog.component.scss']
})
export class ResonDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef:MatDialogRef<ResonDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closedialog(){
    this.dialogRef.close(false);
  }

  condialog(reson:any){
    
   const res:any=true
    this.dialogRef.close(reson);
  }

}
