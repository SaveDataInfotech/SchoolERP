import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { schoolDetailsService } from 'src/app/api-service/schoolDetails.service';

@Component({
  selector: 'app-school-register',
  templateUrl: './school-register.component.html',
  styleUrls: ['./school-register.component.scss']
})
export class SchoolRegisterComponent implements OnInit {
  userID: number = Number(localStorage.getItem("userid"));
  files: File[] = [];
  editableImage: any;
  file: any;
  base64textString: any[] = [];
  schoolDetailsList: any[] = [];

  constructor(private router: Router, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private sdSvc: schoolDetailsService) { }

  ngOnInit(): void {
    this.getSchoolDetails();
  }
  //image
  deleteImage() {
    this.files = [];
    this.editableImage = null;
    this.base64textString = [];
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    // this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      // checking if files array has more than one content
      this.replaceFile(); // replace file
    }
    this.convertFileToBase64AndSet(event.addedFiles[0]);
    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[0]);
      this.file = this.files[0];
    }
  }
  replaceFile() {
    this.files.splice(0, 1); // index =0 , remove_count = 1
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  convertFileToBase64AndSet(fileList: any) {
    this.base64textString = [];
    if (fileList) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(fileList);

    }
  }

  handleReaderLoaded(e: any) {
    this.base64textString.push(
      'data:image/png;base64,' + btoa(e.target.result)
    );
    this.schoolDetails.get('logo')?.setValue(this.base64textString[0]);
  }

  // getFile(event: any) {
  //   this.file = event.target.file[0];
  // }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  schoolDetails = new FormGroup({
    schoolid: new FormControl(0),
    school_name: new FormControl(''),
    short_name: new FormControl(''),
    display_name: new FormControl(''),
    address: new FormControl(''),
    logo: new FormControl(''),
    cuid: new FormControl(this.userID)
  });

  getSchoolDetails() {
    this.sdSvc.getList().subscribe((res) => {
      this.schoolDetailsList = res;
    })
  }

  save() {
    if (this.schoolDetails.valid) {
      if (this.schoolDetails.value.schoolid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var Batchinsert = (this.schoolDetails.value);
              this.sdSvc.addNewDetail(Batchinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.cancelClick();
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var Batchinsert = (this.schoolDetails.value);
              this.sdSvc.addNewDetail(Batchinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.cancelClick();
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
      this.schoolDetails.markAllAsTouched();
    }
  }

  udateGetClick(value: any) {
    this.schoolDetails.get('schoolid')?.setValue(value.schoolid);
    this.schoolDetails.get('school_name')?.setValue(value.school_name);
    this.schoolDetails.get('short_name')?.setValue(value.short_name);
    this.schoolDetails.get('display_name')?.setValue(value.display_name);
    this.schoolDetails.get('address')?.setValue(value.address);
    this.editableImage = value.logo;
    this.schoolDetails.get('cuid')?.setValue(this.userID);
  }


  deleteClick(batchid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.sdSvc.delete(batchid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.cancelClick()
            }
          });
        }
      });
  }


  ActiveStatusClick(batchid: number) {
    this.sdSvc.ActiveStatus(batchid).subscribe(res => {
      if (res?.recordid) {
        this.cancelClick();
      }
    });
  }

  cancelClick() {
    this.schoolDetails.reset();
    this.getSchoolDetails();
    this.editableImage = '';
    this.files = [];

    this.schoolDetails.get('schoolid')?.setValue(0);
    this.schoolDetails.get('school_name')?.setValue('');
    this.schoolDetails.get('short_name')?.setValue('');
    this.schoolDetails.get('display_name')?.setValue('');
    this.schoolDetails.get('address')?.setValue('');
    this.schoolDetails.get('logo')?.setValue('');
    this.schoolDetails.get('cuid')?.setValue(this.userID);
  }

}