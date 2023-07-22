import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { VehicleNoRootService } from 'src/app/api-service/VehicleNoRoot.service';
import { VehiclePlaceService } from 'src/app/api-service/VehiclePlace.service';
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

  vehicleNoRootList: any = [];
  NoRootMaxId: any = [];
  NoRootbuttonId: boolean = true;

  PlaceList: any = [];
  MaxIdPlace: any = [];
  buttonIdPlace: boolean = true;

  constructor(
    private VhtySvc: VehicleTypeService, private vhNoRtSvc: VehicleNoRootService,
    private PlaceSvc: VehiclePlaceService, private DialogSvc: DialogService,
    private notificationSvc:NotificationsService) {
  }


  ngOnInit(): void {
    this.refreshvehicleTypeList();
    this.getMaxId();
    this.cancelClick();

    this.refreshvehicleNoRootList();
    this.getMaxIdVehicleNoRoot();
    this.cancelClickVehicleNoRoot();

    this.refreshvehiclePlaceList();
    this.getMaxIdPlace();
    this.cancelClickPlace();
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
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.VhtySvc.deletevehicleType(Typeid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshvehicleTypeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
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


  //Vehicle No && Root

  vehicleNoRootForm = new FormGroup({
    vehicle_no_id: new FormControl(0),
    vehicle_no: new FormControl('', [Validators.required]),
    vehicle_type: new FormControl('', [Validators.required]),
    vehicle_root_no: new FormControl(),
    cuid: new FormControl(1),
  })


  refreshvehicleNoRootList() {
    this.vhNoRtSvc.getVeNoRtList().subscribe(data => {
      this.vehicleNoRootList = data;
    });
  }

  NewVehicleNoRoot() {
    debugger;
    var venortinsert = (this.vehicleNoRootForm.value);
    this.vhNoRtSvc.addNewVeNoRt(venortinsert).subscribe(res => {
      console.log(res, 'resss')
      if (res?.recordid) {
        this.refreshvehicleNoRootList();
        this.getMaxIdVehicleNoRoot();
        this.cancelClickVehicleNoRoot();
      }
    });
  }

  getMaxIdVehicleNoRoot() {
    this.vhNoRtSvc.getMaxId().subscribe(data => {
      this.NoRootMaxId = data;
    });
  }

  deleteClickVehicleNoRoot(vehicle_no_id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.vhNoRtSvc.deleteVeNoRt(vehicle_no_id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshvehicleNoRootList();
              this.getMaxIdVehicleNoRoot();
              this.cancelClickVehicleNoRoot();
            }
          });
        }
      });
  }

  udateGetClickVehicleNoRoot(vhnort: any) {
    this.vehicleNoRootForm.get('vehicle_no_id')?.setValue(vhnort.vehicle_no_id);
    this.vehicleNoRootForm.get('vehicle_no')?.setValue(vhnort.vehicle_no);
    this.vehicleNoRootForm.get('vehicle_type')?.setValue(vhnort.vehicle_type);
    this.vehicleNoRootForm.get('vehicle_root_no')?.setValue(vhnort.vehicle_root_no);
    this.vehicleNoRootForm.get('cuid')?.setValue(vhnort.cuid);
    this.NoRootbuttonId = false;
  }

  cancelClickVehicleNoRoot() {
    this.vehicleNoRootForm.reset();
    this.vehicleNoRootForm.get('vehicle_no_id')?.setValue(0);
    this.vehicleNoRootForm.get('vehicle_no')?.setValue('');
    this.vehicleNoRootForm.get('vehicle_type')?.setValue('');
    this.vehicleNoRootForm.get('vehicle_root_no')?.setValue(null);
    this.vehicleNoRootForm.get('cuid')?.setValue(1);
    this.NoRootbuttonId = true;
  }


  // Vehicle Place

  vehicleplaceForm = new FormGroup({
    placeid: new FormControl(0),
    root_no: new FormControl(0),
    place: new FormControl('', [Validators.required]),
    cuid: new FormControl(1)
  })


  refreshvehiclePlaceList() {
    this.PlaceSvc.getPlaceList().subscribe(data => {
      this.PlaceList = data;
    });
  }

  NewVehiclePlace() {
    debugger;
    var placeinsert = (this.vehicleplaceForm.value);
    this.PlaceSvc.addNewPlace(placeinsert).subscribe(res => {
      console.log(res, 'resss')
      if (res?.recordid) {
        this.refreshvehiclePlaceList();
        this.getMaxIdPlace();
        this.cancelClickPlace();
      }
    });
  }

  getMaxIdPlace() {
    this.PlaceSvc.getMaxIdPlace().subscribe(data => {
      this.MaxIdPlace = data;
    });
  }

  deleteClickPlace(placeid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.PlaceSvc.deletePlace(placeid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshvehiclePlaceList();
              this.getMaxIdPlace();
              this.cancelClickPlace();
            }
          });
        }
      });
  }

  udateGetClickPlace(place: any) {
    this.vehicleplaceForm.get('placeid')?.setValue(place.placeid);
    this.vehicleplaceForm.get('root_no')?.setValue(place.root_no);
    this.vehicleplaceForm.get('place')?.setValue(place.place);
    this.vehicleplaceForm.get('cuid')?.setValue(place.cuid);
    this.buttonIdPlace = false;
  }

  cancelClickPlace() {
    this.vehicleplaceForm.reset();
    this.vehicleplaceForm.get('placeid')?.setValue(0);
    this.vehicleplaceForm.get('root_no')?.setValue(0);
    this.vehicleplaceForm.get('place')?.setValue('');
    this.vehicleplaceForm.get('cuid')?.setValue(1);
    this.buttonIdPlace = true;
  }

}
