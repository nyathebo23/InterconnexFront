import { Component, Input, OnInit } from '@angular/core';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';

@Component({
  selector: 'app-load-data-error',
  templateUrl: './load-data-error.component.html',
  styleUrls: ['./load-data-error.component.scss']
})
export class LoadDataErrorComponent implements OnInit {

  @Input() contentText: string;
  constructor(private controlActorService: ControlActorService) { }

  ngOnInit(): void {
  }

  retry(): void {
    window.location.reload();
  }
}
