import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { UniformMasterService } from 'src/app/api-service/UniformMaster.service';

@Component({
  selector: 'app-uniform-master',
  templateUrl: './uniform-master.component.html',
  styleUrls: ['./uniform-master.component.scss']
})
export class UniformMasterComponent implements OnInit {
  UniformSizeList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;
  overcoatif:boolean;
  constructor(
    private uniformSvc: UniformMasterService, private DialogSvc: DialogService) {
  }
  ngOnInit(): void {
    this.refreshUniformSizeList(),
      this.getMaxId(),
      this.cancelClick()
  }

  uniformSizeForm = new FormGroup({
    uniformid: new FormControl(0),
    gender: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    shirting: new FormControl('', [Validators.required]),
    suiting: new FormControl('', [Validators.required]),
    over_coat: new FormControl(''),
    cuid: new FormControl(1),
  })

  ifovercoatfun(value:any){
    if(value != "Male"){
      this.overcoatif=true;
    }
    else{
      this.overcoatif=false;
    }
  }


  refreshUniformSizeList() {
    this.uniformSvc.getuniformList().subscribe(data => {
      this.UniformSizeList = data;
    });
  }

  NewUniformSize() {
    if(this.uniformSizeForm.value.uniformid == 0){
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          var uniformsizeinsert = (this.uniformSizeForm.value);
          this.uniformSvc.addNewuniform(uniformsizeinsert).subscribe(res => {
            console.log(res, 'resss')
            if (res?.recordid) {              
              this.refreshUniformSizeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
    }
    else if(this.uniformSizeForm.value.uniformid != 0){
      this.DialogSvc.openConfirmDialog('Are you sure want to update this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          var uniformsizeinsert = (this.uniformSizeForm.value);
          this.uniformSvc.addNewuniform(uniformsizeinsert).subscribe(res => {
            console.log(res, 'resss')
            if (res?.recordid) {
              this.refreshUniformSizeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
    }
    else{
      alert("something error;")
    }    
  }

  getMaxId() {
    this.uniformSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  //sample  for Dialog working
  deleteuniformSize(uniformid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.uniformSvc.deleteuniform(uniformid).subscribe(res => {
            if (res?.recordid) {
              debugger;
              this.refreshUniformSizeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(size: any) {
    if(size.gender == "Male"){
      this.overcoatif=false;
    }
    else{
      this.overcoatif=true;
    }
    this.uniformSizeForm.get('uniformid')?.setValue(size.uniformid);
    this.uniformSizeForm.get('gender')?.setValue(size.gender);
    this.uniformSizeForm.get('size')?.setValue(size.size);
    this.uniformSizeForm.get('shirting')?.setValue(size.shirting);
    this.uniformSizeForm.get('suiting')?.setValue(size.suiting);
    this.uniformSizeForm.get('over_coat')?.setValue(size.over_coat);
    this.uniformSizeForm.get('cuid')?.setValue(size.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.uniformSizeForm.reset();
    this.uniformSizeForm.get('uniformid')?.setValue(0);
    this.uniformSizeForm.get('gender')?.setValue('');
    this.uniformSizeForm.get('size')?.setValue('');
    this.uniformSizeForm.get('shirting')?.setValue('');
    this.uniformSizeForm.get('suiting')?.setValue('');
    this.uniformSizeForm.get('over_coat')?.setValue('');
    this.uniformSizeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
    this.overcoatif=false;
  }

}
