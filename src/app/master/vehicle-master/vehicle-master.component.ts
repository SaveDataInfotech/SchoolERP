import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { VehicleNoRootService } from 'src/app/api-service/VehicleNoRoot.service';
import { VehiclePlaceService } from 'src/app/api-service/VehiclePlace.service';
import { VehicleTypeService } from 'src/app/api-service/VehicleType.service';
import * as XLSX from 'xlsx';
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
    private notificationSvc: NotificationsService, private router: Router) {
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

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshvehicleTypeList() {
    this.VhtySvc.getvehicleTypeList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  NewVehicleType() {
    if (this.vehicletypeForm.valid) {
      if (this.vehicletypeForm.value.typeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var vehicletypeinsert = (this.vehicletypeForm.value);
              this.VhtySvc.addNewvehicleType(vehicletypeinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshvehicleTypeList();
                  this.getMaxId();
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
      else if (this.vehicletypeForm.value.typeid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var vehicletypeinsert = (this.vehicletypeForm.value);
              this.VhtySvc.addNewvehicleType(vehicletypeinsert).subscribe(res => {

                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshvehicleTypeList();
                  this.getMaxId();
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
    }
    else {
      this.vehicletypeForm.markAllAsTouched();
    }
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
    this.vehicletypeForm.patchValue(type);
    this.vehicletypeForm.get('cuid')?.setValue(1);
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

  get vehicle_type() {
    return this.vehicleNoRootForm.get('vehicle_type');
  }

  refreshvehicleNoRootList() {
    this.vhNoRtSvc.getVeNoRtList().subscribe(data => {
      this.vehicleNoRootList = data;
    });
  }

  NewVehicleNoRoot() {
    if (this.vehicleNoRootForm.valid) {
      if (this.vehicleNoRootForm.value.vehicle_no_id == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var venortinsert = (this.vehicleNoRootForm.value);
              this.vhNoRtSvc.addNewVeNoRt(venortinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshvehicleNoRootList();
                  this.getMaxIdVehicleNoRoot();
                  this.cancelClickVehicleNoRoot();
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
      else if (this.vehicleNoRootForm.value.vehicle_no_id != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var venortinsert = (this.vehicleNoRootForm.value);
              this.vhNoRtSvc.addNewVeNoRt(venortinsert).subscribe(res => {
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshvehicleNoRootList();
                  this.getMaxIdVehicleNoRoot();
                  this.cancelClickVehicleNoRoot();
                }
              });
            }
          });
      }
    }
    else {
      this.vehicleNoRootForm.markAllAsTouched();
    }
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
    this.vehicleNoRootForm.patchValue(vhnort);
    this.vehicleNoRootForm.get('cuid')?.setValue(1);
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
    root_no: new FormControl(null, [Validators.required]),
    place: new FormControl('', [Validators.required]),
    cuid: new FormControl(1)
  })

  get root_no() {
    return this.vehicleplaceForm.get('root_no');
  }

  refreshvehiclePlaceList() {
    this.PlaceSvc.getPlaceList().subscribe(data => {
      this.PlaceList = data;
    });
  }

  NewVehiclePlace() {
    if (this.vehicleplaceForm.valid) {
      if (this.vehicleplaceForm.value.placeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var placeinsert = (this.vehicleplaceForm.value);
              this.PlaceSvc.addNewPlace(placeinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshvehiclePlaceList();
                  this.getMaxIdPlace();
                  this.cancelClickPlace();
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
      else if (this.vehicleplaceForm.value.placeid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var placeinsert = (this.vehicleplaceForm.value);
              this.PlaceSvc.addNewPlace(placeinsert).subscribe(res => {
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshvehiclePlaceList();
                  this.getMaxIdPlace();
                  this.cancelClickPlace();
                }
              });
            }
          });
      }
    }
    else {
      this.vehicleplaceForm.markAllAsTouched();
    }
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
    this.vehicleplaceForm.patchValue(place);
    this.vehicleplaceForm.get('cuid')?.setValue(1);
    this.buttonIdPlace = false;
  }

  cancelClickPlace() {
    this.vehicleplaceForm.reset();
    this.vehicleplaceForm.get('placeid')?.setValue(0);
    this.vehicleplaceForm.get('root_no')?.setValue(null);
    this.vehicleplaceForm.get('place')?.setValue('');
    this.vehicleplaceForm.get('cuid')?.setValue(1);
    this.buttonIdPlace = true;
  }


  /////////////////


  file: File | null;
  data: any[] = [];
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  vehicleplaceXLForm = new FormGroup({
    root_no: new FormControl(null),
    places: new FormControl([]),
    cuid: new FormControl(1)
  })

  onFileChange(event: any) {
    debugger;
    this.file = event.target.files[0];
  }
  uploadFile(event: Event) {
    debugger;
    event.preventDefault();

    if (!this.file) {
      this.notificationSvc.error('No file selected')
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const arr = [];
      for (let i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');

      const workbook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      for (let i = 0; i < this.data.length; i++) {
        const obj = this.data[i];
        const keys = Object.keys(obj);

        if (keys[0] != 'places') {
          this.notificationSvc.error('The column name must be in lowercase with this name (places).');
          this.xlCancelClick();
          return;
        }
      }

      this.vehicleplaceXLForm.get('places')?.setValue(this.data);

      if (this.vehicleplaceXLForm.valid) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var placeinsert = (this.vehicleplaceXLForm.value);
              this.PlaceSvc.addNewXLPlace(placeinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshvehiclePlaceList();
                  this.getMaxIdPlace();
                  this.xlCancelClick();
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
        this.vehicleplaceXLForm.markAllAsTouched();
      }

    };
    fileReader.readAsArrayBuffer(this.file);
  }

  xlCancelClick() {
    this.vehicleplaceXLForm.reset();
    this.myInputVariable.nativeElement.value = "";
    this.vehicleplaceXLForm.get('cuid')?.setValue(1);
  }
}