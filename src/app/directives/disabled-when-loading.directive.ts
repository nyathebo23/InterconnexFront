import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDisabledWhenLoading]'
})
export class DisabledWhenLoadingDirective {

  @Input() set appDisabledWhenLoading(loading: boolean){
    this.el.nativeElement.disabled = loading;
  }
  constructor(private el: ElementRef) { }

}
