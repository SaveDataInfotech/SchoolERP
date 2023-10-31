import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VehicleAssignService } from 'src/app/api-service/vehicleAssign.service';

@Component({
  selector: 'app-vehicle-expense',
  templateUrl: './vehicle-expense.component.html',
  styleUrls: ['./vehicle-expense.component.scss']
})
export class VehicleExpenseComponent implements OnInit {
  vehicleAssignList: any[] = [];


  constructor(private vhASvc: VehicleAssignService,) { }

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

    this.refreshVehicleAssignList();
  }

  refreshVehicleAssignList() {
    this.vhASvc.getvehicleAssignList().subscribe(data => {
      this.vehicleAssignList = data
    });
  }

  vehicleExpenseForm = new FormGroup({
    expenseid: new FormControl(0),
    vehicle_no_id: new FormControl(null),
    vehicle_root_no: new FormControl(),
    driver_name: new FormControl(''),
    helper_name: new FormControl(''),
    place_of_work: new FormControl(),
    reson: new FormControl(''),
    amount: new FormControl(''),
    cuid: new FormControl(1)
  });

  getVehicleDetails() {
    debugger;
    const vehicleNo = this.vehicleExpenseForm.value.vehicle_no_id;
    const newVehicleDetails = this.vehicleAssignList.filter((e) => { return e.vehicle_no_id == vehicleNo });
    this.vehicleExpenseForm.get('driver_name')?.setValue(newVehicleDetails[0].driver_name);
    this.vehicleExpenseForm.get('helper_name')?.setValue(newVehicleDetails[0].helper_name)
    this.vehicleExpenseForm.get('vehicle_root_no')?.setValue(newVehicleDetails[0].vehicle_root_no)
  }

}
