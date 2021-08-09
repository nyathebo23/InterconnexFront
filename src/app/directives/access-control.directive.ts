import { AfterContentInit, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DRAFT_STATE, PENDING_ADMISSION_STATE, PENDING_APPROVAL_STATE, PENDING_VALIDATION_STATE, PENDING_VERIFICATION_STATE } from '../commons/constants';
import { LOCAL_INFORMER, NATIONAL_INFORMER, SOURCE_AGENT, SOURCE_STRUCTURE, SOURCE_VERIFIER } from '../commons/constants-roles';
import { ADMISSION, APPROBATION, SUBMIT_TO_VERIFY, VALIDATION, VERIFICATION } from '../commons/control-actions-on-ddia';
import { User } from '../models/user.model';
import { AuthManagerService } from '../services/auth-services/auth-manager.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[accessControl]'
})
export class AccessControlDirective implements  OnInit {

  @Input() accessControl: User;
  @Input() accessControlToDoAction: [string, string];
  @Input() accessControlDdiaState: string;
  @Input() accessControlInitiatorUserId: string;
  hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    let toDisplay = false;
    if (!this.hasView && this.accessControlToDoAction[0] === this.accessControlToDoAction[1]){
      switch (this.accessControlToDoAction[0]){
        case SUBMIT_TO_VERIFY:
          toDisplay = (this.accessControl.role === SOURCE_AGENT) || (this.accessControl.role === SOURCE_VERIFIER);
          toDisplay = toDisplay && this.accessControlInitiatorUserId === this.accessControl.id &&
          this.accessControlDdiaState === DRAFT_STATE;
          console.log(this.accessControlDdiaState, this.accessControlToDoAction, this.accessControl, this.accessControlInitiatorUserId);
          break;
        case VERIFICATION:
          toDisplay = this.accessControl.role === SOURCE_VERIFIER && this.accessControlDdiaState === PENDING_VERIFICATION_STATE;
          break;
        case ADMISSION:
          toDisplay = this.accessControl.role === SOURCE_STRUCTURE && this.accessControlDdiaState === PENDING_ADMISSION_STATE;
          break;
        case VALIDATION:
          toDisplay = this.accessControl.role === LOCAL_INFORMER && this.accessControlDdiaState === PENDING_VALIDATION_STATE;
          break;
        case APPROBATION:
          toDisplay = this.accessControl.role === NATIONAL_INFORMER && this.accessControlDdiaState === PENDING_APPROVAL_STATE;
          break;
      }

      if (toDisplay){
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    }
  }

  // ngAfterContentInit(): void {
  //   let toDisplay = false;
  //   if (!this.hasView){
  //     switch (this.accessControlToDoAction){
  //       case SUBMIT_TO_VERIFY:
  //         toDisplay = (this.accessControl.role === SOURCE_AGENT) || (this.accessControl.role === SOURCE_VERIFIER);
  //         toDisplay = toDisplay && this.accessControlInitiatorUserId === this.accessControl.id &&
  //         this.accessControlDdiaState === DRAFT_STATE;
  //         break;
  //       case VERIFICATION:
  //         toDisplay = this.accessControl.role === SOURCE_VERIFIER && this.accessControlDdiaState === PENDING_VERIFICATION_STATE;
  //         break;
  //       case ADMISSION:
  //         toDisplay = this.accessControl.role === SOURCE_STRUCTURE && this.accessControlDdiaState === PENDING_ADMISSION_STATE;
  //         break;
  //       case VALIDATION:
  //         toDisplay = this.accessControl.role === LOCAL_INFORMER && this.accessControlDdiaState === PENDING_VALIDATION_STATE;
  //         break;
  //       case APPROBATION:
  //         toDisplay = this.accessControl.role === NATIONAL_INFORMER && this.accessControlDdiaState === PENDING_APPROVAL_STATE;
  //         break;
  //     }
  //     console.log(this.accessControlDdiaState, this.accessControlToDoAction, this.accessControl);

  //     if (toDisplay){
  //       this.viewContainer.createEmbeddedView(this.templateRef);
  //       this.hasView = true;
  //     }
  //   }
  // }

}
