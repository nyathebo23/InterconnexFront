import { Component, Input, OnInit } from '@angular/core';
import { AttachmentI } from 'src/app/interfaces/attachement.interface';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';

@Component({
  selector: 'app-file-display',
  templateUrl: './file-display.component.html',
  styleUrls: ['./file-display.component.scss']
})
export class FileDisplayComponent implements OnInit {

  @Input() attachment: AttachmentI;
  constructor(private controlActorService: ControlActorService) { }

  ngOnInit(): void {
  }

  downloadFile(url: string, filename: string): void {
    this.controlActorService.downloadFile(url, filename);
  }
}
