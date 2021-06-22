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
  selector: 'app-aic',
  templateUrl: './aic.component.html',
  styleUrls: ['./aic.component.scss']
})
export class AICComponent  {

  aicForm: FormGroup;
  subjectChoices: Array<string> = new Array();
  subjectList: Array<string>;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.aicForm = this.formBuilder.group({
      depositDate: [new Date()],
      depositTime: [new Date()],
      subject: ['admin'],
      object: [''],
      text: [''],
      filesForm: new FormArray([
        this.formBuilder.group({
          file: [''],
          filename: ['']
        })
      ])
    });
    this.subjectList = ['admin', 'atc', 'security', 'zone', 'map'];
    this.subjectChoices.push('DDIAFORMS.aic.subject.admin');
    this.subjectChoices.push('DDIAFORMS.aic.subject.atc');
    this.subjectChoices.push('DDIAFORMS.aic.subject.security');
    this.subjectChoices.push('DDIAFORMS.aic.subject.zone');
    this.subjectChoices.push('DDIAFORMS.aic.subject.maps');
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });

  }

  get form(): {[key: string]: any}{
    return this.aicForm.controls;
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
