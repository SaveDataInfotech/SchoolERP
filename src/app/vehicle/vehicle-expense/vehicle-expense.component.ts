import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { VehicleAssignService } from 'src/app/api-service/vehicleAssign.service';
import { VehicleExpenseService } from 'src/app/api-service/vehicleExpense.service';

@Component({
  selector: 'app-vehicle-expense',
  templateUrl: './vehicle-expense.component.html',
  styleUrls: ['./vehicle-expense.component.scss']
})
export class VehicleExpenseComponent implements OnInit {
  vehicleAssignList: any[] = [];
  vehicleExpenseList: any[] = [];

  constructor(private vhASvc: VehicleAssignService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private vESvc: VehicleExpenseService,
    private router: Router) { }

  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDate = this.date1.getUTCDate();
  today = "2023-12-12";
  finalMonth: any;
  finalDay: any;

  ngOnInit(): void {

    if (this.currentMonth < 10) {
      this.finalMonth = "0" + this.currentMonth;
    }
    else {
      this.finalMonth = this.currentMonth;
    }
    if (this.currentDate < 10) {
      this.finalDay = "0" + this.currentDate;
    }
    else {
      this.finalDay = this.currentDate;
    }
    this.today = this.currentYear + "-" + this.finalMonth + "-" + this.finalDay;
    this.vehicleExpenseForm.get('date')?.setValue(this.today);

    this.refreshVehicleAssignList();

    this.refreshvehicleExpenseList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }


  refreshVehicleAssignList() {
    this.vhASvc.getvehicleAssignList().subscribe(data => {
      this.vehicleAssignList = data
    });
  };

  refreshvehicleExpenseList() {
    this.vESvc.getvehicleExpenseList().subscribe(data => {
      this.vehicleExpenseList = data;
    });
  }

  getVehicleDetails() {
    debugger;
    const vehicleNo = this.vehicleExpenseForm.value.vehicle_no_id;
    const newVehicleDetails = this.vehicleAssignList.filter((e) => { return e.vehicle_no_id == vehicleNo });
    this.vehicleExpenseForm.get('driver_name')?.setValue(newVehicleDetails[0].driver_name);
    this.vehicleExpenseForm.get('helper_name')?.setValue(newVehicleDetails[0].helper_name)
    this.vehicleExpenseForm.get('vehicle_root_no')?.setValue(newVehicleDetails[0].vehicle_root_no)
  }

  vehicleExpenseForm = new FormGroup({
    expenseid: new FormControl(0),
    vehicle_no_id: new FormControl(null),
    date: new FormControl(''),
    vehicle_root_no: new FormControl(),
    driver_name: new FormControl(''),
    helper_name: new FormControl(''),
    place_of_work: new FormControl(),
    reson: new FormControl(''),
    amount: new FormControl(''),
    cuid: new FormControl(1)
  });


  newExpense() {
    debugger;
    if (this.vehicleExpenseForm.valid) {
      if (this.vehicleExpenseForm.value.expenseid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var values = (this.vehicleExpenseForm.value);
              this.vESvc.addNewvehicleExpense(values).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshvehicleExpenseList();
                  this.cancelClick();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists")
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else if (this.vehicleExpenseForm.value.expenseid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var values = (this.vehicleExpenseForm.value);
              this.vESvc.addNewvehicleExpense(values).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshvehicleExpenseList();
                  this.cancelClick();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists")
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else {
        alert("something error;")
      }
    }
    else {
      this.vehicleExpenseForm.markAllAsTouched();
    }
  }

  updateClick(item) {
    debugger;
    this.vehicleExpenseForm.patchValue(item);
    this.vehicleExpenseForm.get('cuid')?.setValue(1);
  }

  deleteClick(id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.vESvc.deletevehicleExpense(id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshvehicleExpenseList();
            }
          });
        }
      });
  }

  cancelClick() {
    this.vehicleExpenseForm.reset();
    this.vehicleExpenseForm.get('expenseid')?.setValue(0);
    this.vehicleExpenseForm.get('date')?.setValue(this.today);
    this.vehicleExpenseForm.get('vehicle_no_id')?.setValue(null);
    this.vehicleExpenseForm.get('vehicle_root_no')?.setValue('');
    this.vehicleExpenseForm.get('driver_name')?.setValue('');
    this.vehicleExpenseForm.get('helper_name')?.setValue('');
    this.vehicleExpenseForm.get('place_of_work')?.setValue('');
    this.vehicleExpenseForm.get('reson')?.setValue('');
    this.vehicleExpenseForm.get('amount')?.setValue('');

    this.vehicleExpenseForm.get('cuid')?.setValue(1);
  }

}
