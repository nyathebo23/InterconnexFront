import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InterconnexFront';
  constructor(public translate: TranslateService){
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use('en');
    // this.connexionService.monitor().subscribe(isConnected => {
    //   this.isConnected = isConnected;
    // });
}}
