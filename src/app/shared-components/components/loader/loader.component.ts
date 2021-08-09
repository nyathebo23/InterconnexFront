import { Component, OnInit } from '@angular/core';
import { time } from 'console';
import { Loader, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loaderId = '0';
  loader: Loader;
  constructor(private ngxUiLoaderService: NgxUiLoaderService) {

  }

  ngOnInit(): void {
    this.ngxUiLoaderService.startLoader('0');
  }

}
