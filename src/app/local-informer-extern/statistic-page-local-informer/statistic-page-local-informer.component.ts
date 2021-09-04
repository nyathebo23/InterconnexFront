import { Component, OnInit } from '@angular/core';
import { CountAerodromeDDIA } from 'src/app/models/count-ddia.model';
import { InformateurLocalService } from 'src/app/services/agent-services/informateur-local.service';

@Component({
  selector: 'app-statistic-page-local-informer',
  templateUrl: './statistic-page-local-informer.component.html',
  styleUrls: ['./statistic-page-local-informer.component.scss']
})
export class StatisticPageLocalInformerComponent implements OnInit {

  year = '2021';
  takeAllDDIA = 'yes';
  aerodromesNames = new Array<string>();
  actualYear: number;
  yearsList: number[] = [];
  public chartType = 'horizontalBar';
  public chartDatasets: Array<{data: Array<number>, label: string}>;
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  constructor(private localInfService: InformateurLocalService) {
    this.actualYear = new Date().getFullYear();
    for (let ind = 2021; ind <= this.actualYear; ind++){
      this.yearsList.push(ind);
    }
  }

  ngOnInit(): void {
    this.loadDatas();
  }

  changeYear(event): void {
    this.year = event.target.value;
    this.loadDatas();
  }

  changeSpecifDDIADisplayed(event): void {
    this.takeAllDDIA = event.target.value;
    this.loadDatas();
  }

  loadDatas(): void {
    this.localInfService.getStatsOnDDIALocalInfAuthority(this.year, this.takeAllDDIA)
    .subscribe((values: CountAerodromeDDIA[]) => {
      this.aerodromesNames = values.map((val) => val.aerodrome.name);
      this.chartDatasets = [
        { data: values.map((val) => val.countDDIA.countNOTAM), label: 'NOTAM' },
        { data: values.map((val) => val.countDDIA.countSUPP), label: 'SUPP AIP' },
        { data: values.map((val) => val.countDDIA.countAIC), label: 'AIC' },
      ];
    }, error => {
      this.localInfService.setError(error);
    }, () => {
    });
  }

}
