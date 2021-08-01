import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UnitSource } from 'src/app/models/unit-source.model';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-source-unit-form',
  templateUrl: './source-unit-form.component.html',
  styleUrls: ['./source-unit-form.component.scss']
})
export class SourceUnitFormComponent implements OnInit {

  sourceUnitForm: FormGroup;

  @Input() locationInd: string;
  @Input() unit: UnitSource;
  @Input() initiatorInfos: string;
  constructor(private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    console.log(this.unit);
    this.sourceUnitForm = this.formBuilder.group({
      airportLocationIndicator: [{value: this.locationInd ? this.locationInd : '', disabled: true}],
      name: [{value: this.unit ? this.unit.name : '', disabled: true}],
      adress: [{value: this.unit ? this.unit.address : '', disabled: true}],
      fax: [{value: this.unit ? this.unit.fax : '', disabled: true}],
      telephone: [{value: this.unit ? this.unit.phonenumber : '', disabled: true}],
      email: [{value: this.unit ? this.unit.email : '', disabled: true}],
      rsfta: [{value: this.unit ? this.unit.rsfta : '', disabled: true}],
      initiatorInfos: [{value: this.initiatorInfos, disabled: true}]
    });
  }
}
