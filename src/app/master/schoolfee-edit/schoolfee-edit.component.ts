import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
@Component({
  selector: 'app-schoolfee-edit',
  templateUrl: './schoolfee-edit.component.html',
  styleUrls: ['./schoolfee-edit.component.scss']
})
export class SchoolfeeEditComponent implements OnInit {
  userID: number = Number(localStorage.getItem("userid"));
  userName: string = localStorage.getItem("userName");
  isdelete: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SchoolfeeEditComponent>,
    private notificationSvc: NotificationsService,
    private DialogSvc: DialogService,
  ) { }

  ngOnInit(): void {
    this.editFeeCollection.patchValue(this.data.data);
    this.editFeeCollection.get('cuid')?.setValue(this.userID);

    const control3 = <FormArray>this.editFeeCollection.controls['busFeesList'];
    while (control3.length !== 0) {
      control3.removeAt(0)
    }

    if (control3.length == 0) {
      this.data.busFees.forEach(element => {
        const control = <FormArray>this.editFeeCollection.controls['busFeesList'];
        control.push(
          new FormGroup({
            s_deductionid: new FormControl(element.s_deductionid),
            feesid: new FormControl(element.feesid),
            type_name: new FormControl(element.type_name),
            balance: new FormControl(element.balance),
            deduction_amount: new FormControl(element.deduction_amount),
            correct_amount: new FormControl(element.deduction_amount),
            cuid: new FormControl(this.userID)
          })
        )
      });
    }

    const control4 = <FormArray>this.editFeeCollection.controls['generalFees'];
    while (control4.length !== 0) {
      control4.removeAt(0)
    }

    if (control4.length == 0) {
      this.data.generalFees.forEach(element => {
        const control = <FormArray>this.editFeeCollection.controls['generalFees'];
        control.push(
          new FormGroup({
            s_deductionid: new FormControl(element.s_deductionid),
            feesid: new FormControl(element.feesid),
            typeid: new FormControl(element.typeid),
            type_name: new FormControl(element.type_name),
            balance: new FormControl(element.balance),
            deduction_amount: new FormControl(element.deduction_amount),
            correct_amount: new FormControl(element.deduction_amount),
            cuid: new FormControl(this.userID)
          })
        )
      });
    }

    const control5 = <FormArray>this.editFeeCollection.controls['arrearFees'];
    while (control5.length !== 0) {
      control5.removeAt(0)
    }

    if (control5.length == 0) {
      this.data.arrearFees.forEach(element => {
        const control = <FormArray>this.editFeeCollection.controls['arrearFees'];
        control.push(
          new FormGroup({
            arrearfees_deductionid: new FormControl(element.arrearfees_deductionid),
            arrear_feesid: new FormControl(element.arrear_feesid),
            type_name: new FormControl(element.type_name),
            balance: new FormControl(element.balance),
            deduction_amount: new FormControl(element.deduction_amount),
            correct_amount: new FormControl(element.deduction_amount),
            cuid: new FormControl(this.userID),
          })
        )
      });
    }
  }

  checkTotalBus(i, val) {
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
        let total: number = 0;
        const busControl = this.editFeeCollection.get('busFeesList') as FormArray;
        const busam = Number(busControl.at(i).get('balance').value) + Number(busControl.at(i).get('deduction_amount').value);
        if (Number(busam) < Number(val)) {
          this.notificationSvc.error('Invalid Payable Amount');
          const busControl1 = this.editFeeCollection.get('busFeesList') as FormArray;
          busControl1.at(i).get('correct_amount').setValue('0');
        }

        const bus = this.editFeeCollection.get('busFeesList') as FormArray;
        bus.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        });

        const common = this.editFeeCollection.get('generalFees') as FormArray;
        common.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        });

        const arrear = this.editFeeCollection.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        });

        this.editFeeCollection.get('total_amount')?.setValue(String(total))

      } else {

        const busControl1 = this.editFeeCollection.get('busFeesList') as FormArray;
        busControl1.at(i).get('correct_amount').setValue('');
      }
    } else {
      this.notificationSvc.error('Entered value is not a number.');
      const busControl1 = this.editFeeCollection.get('busFeesList') as FormArray;
      busControl1.at(i).get('correct_amount').setValue('');
    }
  }

  checkTotalGen(i, val) {
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
        let total: number = 0;
        const busControl = this.editFeeCollection.get('generalFees') as FormArray;
        const aram = Number(busControl.at(i).get('balance').value) + Number(busControl.at(i).get('deduction_amount').value);
        if (Number(aram) < Number(val)) {
          this.notificationSvc.error('Invalid Payable Amount');
          const busControl1 = this.editFeeCollection.get('generalFees') as FormArray;
          busControl1.at(i).get('correct_amount').setValue('0');
        }

        const common = this.editFeeCollection.get('generalFees') as FormArray;
        common.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        })

        const bus = this.editFeeCollection.get('busFeesList') as FormArray;
        bus.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        });

        const arrear = this.editFeeCollection.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        });

        this.editFeeCollection.get('total_amount')?.setValue(String(total))
      } else {

        const busControl1 = this.editFeeCollection.get('generalFees') as FormArray;
        busControl1.at(i).get('correct_amount').setValue('');
      }
    } else {
      const busControl1 = this.editFeeCollection.get('generalFees') as FormArray;
      busControl1.at(i).get('correct_amount').setValue('');
      this.notificationSvc.error('Entered value is not a number.');
    }

  }

  checkTotalArrear(i, val) {
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
        let total: number = 0;
        const arrearControl = this.editFeeCollection.get('arrearFees') as FormArray;
        const aram = Number(arrearControl.at(i).get('balance').value) + Number(arrearControl.at(i).get('deduction_amount').value);
        if (Number(aram) < Number(val)) {
          this.notificationSvc.error('Invalid Payable Amount');
          const arrearControl = this.editFeeCollection.get('arrearFees') as FormArray;
          arrearControl.at(i).get('correct_amount').setValue('0');
        }

        const common = this.editFeeCollection.get('generalFees') as FormArray;
        common.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        });

        const bus = this.editFeeCollection.get('busFeesList') as FormArray;
        bus.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        });

        const arrear = this.editFeeCollection.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.correct_amount);
          total = total + num;
        });

        this.editFeeCollection.get('total_amount')?.setValue(String(total))
      } else {
        const arrearControl = this.editFeeCollection.get('arrearFees') as FormArray;
        arrearControl.at(i).get('correct_amount').setValue('');

      }
    } else {
      const arrearControl = this.editFeeCollection.get('arrearFees') as FormArray;
      arrearControl.at(i).get('correct_amount').setValue('');
      this.notificationSvc.error('Entered value is not a number.');
    }

  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  closedialog() {
    this.dialogRef.close(false);
  }

  editFeeCollection = new FormGroup({
    payment_type: new FormControl(''),
    date: new FormControl(''),
    bill_no: new FormControl(''),
    admission_no: new FormControl(''),
    total_amount: new FormControl(''),
    busFeesList: new FormArray([]),
    generalFees: new FormArray([]),
    arrearFees: new FormArray([]),
    cuid: new FormControl(this.userID)
  });

  getCommonControls() {
    return (this.editFeeCollection.get('generalFees') as FormArray).controls;
  }

  getBusControls() {
    return (this.editFeeCollection.get('busFeesList') as FormArray).controls;
  }

  getArrearControls() {
    return (this.editFeeCollection.get('arrearFees') as FormArray).controls;
  }

  checkTotal() {
    let total: number = 0;
    const common = this.editFeeCollection.get('generalFees') as FormArray;
    common.controls.forEach((e) => {
      const num = Number(e.value.correct_amount);
      total = total + num;
    });

    const bus = this.editFeeCollection.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      const num = Number(e.value.correct_amount);
      total = total + num;
    });

    const arrear = this.editFeeCollection.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.correct_amount);
      total = total + num;
    });

    this.editFeeCollection.get('total_amount')?.setValue(String(total));
  }

  async save() {
    await this.checkTotal();
    if (this.editFeeCollection.valid) {
      const res = {
        status: 'update',
        value: this.editFeeCollection.value
      }
      this.dialogRef.close(res);
    }
    else {
      this.notificationSvc.warn("Please Fill the mandatory entries");
    }
  }

  async deleteFUN() {
    await this.checkTotal();
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          if (this.editFeeCollection.valid) {
            const res = {
              status: 'delete',
              value: this.editFeeCollection.value
            }
            this.dialogRef.close(res);
          }
          else {
            this.notificationSvc.warn("Please Fill the mandatory entries");
          }
        }
      });
  }

  generateAndCheckOTP() {
    this.isdelete = true;
    this.notificationSvc.bare('Wait for confirmation...')

    var userEmail = "kamalesan2002@gmail.com";
    var maxAttempts = 3;
    var incorrectAttempts = 0;

    fetch('http://localhost:3399/api/otp/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail, userName: this.userName, userId: this.userID })
    })
      .then(response => response.json())
      .then(data => {
        var userFilledOTP;
        do {
          userFilledOTP = prompt("We have sent OTP to Kamlesan, please contact him ! and Enter OTP:");
          if (data.otp !== userFilledOTP) {
            incorrectAttempts++;
            if (incorrectAttempts >= maxAttempts) {
              this.notificationSvc.alert("Error! Maximum attempts reached. Please try again later.");
              return;
            }
            alert(`Incorrect OTP. Attempts left: ${maxAttempts - incorrectAttempts}`);
          }
        } while (data.otp !== userFilledOTP);
        this.deleteFUN();
      })
      .catch(error => {
        this.notificationSvc.error('Error:', error);
      });
  }

}