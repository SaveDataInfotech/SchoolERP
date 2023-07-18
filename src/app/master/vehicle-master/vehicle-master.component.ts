import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleTypeService } from 'src/app/api-service/VehicleType.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss']
})
export class VehicleMasterComponent implements OnInit {
  DepartmentList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  constructor(
    private VhtySvc: VehicleTypeService) {
  }
  ngOnInit(): void {
    this.refreshvehicleTypeList(),
      this.getMaxId(),
      this.cancelClick()
  }

  vehicletypeForm = new FormGroup({
    typeid: new FormControl(0),
    vehicle_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })


  refreshvehicleTypeList() {
    this.VhtySvc.getvehicleTypeList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  NewVehicleType() {
    var vehicletypeinsert = (this.vehicletypeForm.value);
    this.VhtySvc.addNewvehicleType(vehicletypeinsert).subscribe(res => {
      console.log(res, 'resss')
      if (res?.recordid) {
        this.refreshvehicleTypeList();
        this.getMaxId();
        this.cancelClick();
      }
    });
  }

  getMaxId() {
    this.VhtySvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(Typeid: number) {
    this.VhtySvc.deletevehicleType(Typeid).subscribe(res => {
      if (res?.recordid) {        
        this.refreshvehicleTypeList();
        this.getMaxId();
        this.cancelClick();
      }
    });
  }

  udateGetClick(type: any) {
    this.vehicletypeForm.get('typeid')?.setValue(type.typeid);
    this.vehicletypeForm.get('vehicle_name')?.setValue(type.vehicle_name);
    this.vehicletypeForm.get('cuid')?.setValue(type.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.vehicletypeForm.reset();
    this.vehicletypeForm.get('typeid')?.setValue(0);
    this.vehicletypeForm.get('vehicle_name')?.setValue('');
    this.vehicletypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }

}
