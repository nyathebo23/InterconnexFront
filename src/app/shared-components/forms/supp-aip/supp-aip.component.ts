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
  selector: 'app-supp-aip',
  templateUrl: './supp-aip.component.html',
  styleUrls: ['./supp-aip.component.scss']
})
export class SUPPAIPComponent  {

  suppaipForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.suppaipForm = this.formBuilder.group({
      depositDate: [new Date()],
      depositTime: [''],
      typeSUPPAIP: ['SUPPAIP N'],
      text: [''],
      object: [''],
      targetSection: [''],
      startValidityPeriod: [''],
      endValidityPeriod: [''],
      descriptionText: [''],
      filesForm: new FormArray([])
    });
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  get form(): {[key: string]: AbstractControl}{
    return this.suppaipForm.controls;
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
