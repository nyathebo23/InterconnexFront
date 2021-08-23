import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDisableControl]'
})
export class DisableControlDirective {

  @Input() set appDisableControl(disabled: boolean){
    this.el.nativeElement.disabled = disabled;
  }
  constructor(private el: ElementRef) { }

}
