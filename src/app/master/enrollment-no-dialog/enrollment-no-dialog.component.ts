import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-enrollment-no-dialog',
  templateUrl: './enrollment-no-dialog.component.html',
  styleUrls: ['./enrollment-no-dialog.component.scss']
})
export class EnrollmentNoDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EnrollmentNoDialogComponent>) { }



  ngOnInit(): void {
  }

  closedialog() {
    this.dialogRef.close(false);
  }
}
