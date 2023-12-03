import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-schoolfee-edit',
  templateUrl: './schoolfee-edit.component.html',
  styleUrls: ['./schoolfee-edit.component.scss']
})
export class SchoolfeeEditComponent implements OnInit {
  userID: number = Number(localStorage.getItem("userid"));


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SchoolfeeEditComponent>,
    private notificationSvc: NotificationsService,
  ) { }

  datas: any;

  ngOnInit(): void {
    this.datas = this.data.data

    this.editFeeCollection.patchValue(this.data.data);
    this.editFeeCollection.get('cuid')?.setValue(this.userID);
  }

  closedialog() {
    this.dialogRef.close(false);
  }

  editFeeCollection = new FormGroup({
    payment_type: new FormControl(''),
    bill_no: new FormControl(''),
    admission_no: new FormControl(''),
    cuid: new FormControl(this.userID)
  });

  save(){
    debugger;
    if(this.editFeeCollection.valid){
      const res: any = true
      this.dialogRef.close(this.editFeeCollection.value);
    }
    else{
      this.notificationSvc.warn("Please fill in the mandatory Fill the mandatory entries");
    }
  }

}
