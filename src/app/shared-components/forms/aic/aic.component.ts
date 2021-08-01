import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { UnitSource } from 'src/app/models/unit-source.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-aic',
  templateUrl: './aic.component.html',
  styleUrls: ['./aic.component.scss']
})
export class AICComponent implements OnInit {

  aicForm: FormGroup;
  subjectChoices: Array<string> = new Array();
  subjectList: Array<string>;
  locationInd: string;
  initiatorInfos: string;
  unit: UnitSource;
  loadingDatas = true;
  errors: string[];
  createSuccess = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthManagerService,
    private sourceAgentService: AgentSourceService
  ) {
    this.aicForm = this.formBuilder.group({
      depositDateTime: [{value: new Date(), disabled: true}],
      subject: ['Administratif'],
      object: [''],
      text: [''],
      filesForm: new FormArray([
        this.formBuilder.group({
          file: [''],
          filename: ['']
        })
      ])
    });
    this.subjectList = ['Administratif', 'ATC', 'Sécurité', 'Zone à statut particulier', 'Carte'];
    this.subjectChoices.push('DDIAFORMS.aic.subject.admin');
    this.subjectChoices.push('DDIAFORMS.aic.subject.atc');
    this.subjectChoices.push('DDIAFORMS.aic.subject.security');
    this.subjectChoices.push('DDIAFORMS.aic.subject.zone');
    this.subjectChoices.push('DDIAFORMS.aic.subject.maps');
  }

  ngOnInit(): void {
    this.authService.getAgentInfos()
    .then((data) => {
      if (data.localinformer){
        this.unit = UnitSource.fromJSON(data.localinformer.unit) ;
        this.locationInd = Aerodrome.fromJSON(data.localinformer.aerodrome).locationInd;
        this.initiatorInfos = data.user.last_name + ' ' + data.user.first_name + ',  ' + data.user.function + ',  ' + data.user.quality;
      }
      else{
        this.unit = UnitSource.fromJSON(data.unit);
        this.locationInd = Aerodrome.fromJSON(data.aerodrome).locationInd;
        this.initiatorInfos = data.user.last_name + ' ' + data.user.first_name + ',  ' + data.user.function + ',  ' + data.user.quality;
      }
      this.loadingDatas = false;
    })
    .catch((err) => {
      console.log(err);
    });
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
    fileForm.patchValue({
      file: event.target.files[0],
      filename: event.target.files[0].name
    });
  }

  save(): void {
    const formData = new FormData();
    formData.append('subject', this.aicForm.controls.subject.value);
    formData.append('object', this.aicForm.controls.object.value);
    formData.append('descriptive_text', this.aicForm.controls.text.value);
    const nbAttachs = this.files.length;
    for (let i = 0; i < nbAttachs; i++){
      const fileform = this.files.controls[i] as FormGroup;
      formData.append(`attachments[${i}]file`, fileform.controls.file.value);
    }

    this.sourceAgentService.createAIC(formData)
    .then(() => {
      this.createSuccess = true;
      setTimeout(() => this.createSuccess = false, 10000);
    })
    .catch((err) => {
      console.log(err);
      this.errors = this.sourceAgentService.displayErrors(err);
      setTimeout(() => this.errors = [], 10000);
    });
  }

}
