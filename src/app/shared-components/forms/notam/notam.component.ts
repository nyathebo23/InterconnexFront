import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-notam',
  templateUrl: './notam.component.html',
  styleUrls: ['./notam.component.scss']
})
export class NotamComponent  {

  notamForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.notamForm = this.formBuilder.group({
      depositDate: [{value: new Date(), disabled: true}],
      depositTime: [{value: new Date(), disabled: true}],
      rangeAction: [''],
      typeNOTAM: ['NOTAM N'],
      text: [''],
      notamTargetCode: [''],
      coords: [''],
      periodType: ['planned'],
      startValidityPeriod: [''],
      endValidityPeriod: [''],
      dailyFreqStart: [''],
      dailyFreqEnd: [''],
      infLimit: [''],
      supLimit: [''],
      filesForm: new FormArray([])
    });
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });

  }
  get form(): {[key: string]: AbstractControl}{
    return this.notamForm.controls;
  }

  get files(): FormArray{
    return this.form.filesForm as FormArray;
  }
  addFileForm(): void{
    this.files.push(
      this.formBuilder.group({
        file: ['', [Validators.required]],
        filename: [{value: '', disabled: true}]
      })
    );
  }
  removeFileForm(): void{
    this.files.removeAt(this.files.length - 1);
  }

  onFileSelected(event: any, fileForm: any): void{
    console.log(fileForm);
    console.log(this.files);

    fileForm.patchValue({
      file: event.target.files[0],
      filename: event.target.files[0].name
    });

  }


}
