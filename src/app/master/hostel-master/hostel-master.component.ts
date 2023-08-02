import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { hostelMasterService } from 'src/app/api-service/hostelMaster.service';
import { NotificationsService } from 'angular2-notifications';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-hostel-master',
  templateUrl: './hostel-master.component.html',
  styleUrls: ['./hostel-master.component.scss']
})
export class HostelMasterComponent implements OnInit {

  DepartmentList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  constructor(
    private hosSvc: hostelMasterService, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService) {
  }
  ngOnInit(): void {
    this.refreshHostelList(),
      this.getMaxId(),
      this.cancelClick()

    //this.notificationSvc.success("Heloo")
  }

  hostelForm = new FormGroup({
    hostelid: new FormControl(0),
    hostel_name: new FormControl('', [Validators.required]),
    no_of_rooms: new FormControl(null, [Validators.required]),
    pa_room: new FormControl(null, [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshHostelList() {
    this.hosSvc.getHostelList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  newHostel() {
    debugger;
    if (this.hostelForm.valid) {
      if (this.hostelForm.value.hostelid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var hostelinsert = (this.hostelForm.value);
              this.hosSvc.addNewHostel(hostelinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")                  
                  this.refreshHostelList();
                  this.getMaxId();
                  this.cancelClick();
                }
              });
            }
          });
      }
      else if (this.hostelForm.value.hostelid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var hostelinsert = (this.hostelForm.value);
              this.hosSvc.addNewHostel(hostelinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshHostelList();
                  this.getMaxId();
                  this.cancelClick();
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
      this.hostelForm.markAllAsTouched();
    }
  }

  getMaxId() {
    this.hosSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }


  //sample  for Dialog working
  deleteClick(hostelid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.hosSvc.deleteHostel(hostelid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshHostelList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  updateGetClick(hostel: any) {
    this.hostelForm.get('hostelid')?.setValue(hostel.hostelid);
    this.hostelForm.get('hostel_name')?.setValue(hostel.hostel_name);
    this.hostelForm.get('no_of_rooms')?.setValue(hostel.no_of_rooms);
    this.hostelForm.get('pa_room')?.setValue(hostel.pa_room);
    this.hostelForm.get('cuid')?.setValue(hostel.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.hostelForm.reset();
    this.hostelForm.get('hostelid')?.setValue(0);
    // this.hostelForm.get('hostel_name')?.setValue('');
    // this.hostelForm.get('no_of_rooms')?.setValue(0);
    // this.hostelForm.get('pa_room')?.setValue(0);
    this.hostelForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }
}