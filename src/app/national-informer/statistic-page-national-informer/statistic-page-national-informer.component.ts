import { Component, OnInit } from '@angular/core';
import { CountAerodromeDDIA } from 'src/app/models/count-ddia.model';
import { InformateurNationalService } from 'src/app/services/agent-services/informateur-national.service';

@Component({
  selector: 'app-statistic-page-national-informer',
  templateUrl: './statistic-page-national-informer.component.html',
  styleUrls: ['./statistic-page-national-informer.component.scss']
})
export class StatisticPageNationalInformerComponent implements OnInit {

  year = '2021';
  takeAllDDIA = 'yes';
  actualYear: number;
  aerodromesNames = new Array<string>();
  yearsList: number[] = [];

  public chartType = 'bar';
  public chartDatasets: Array<{data: Array<number>, label: string}>;
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  constructor(private nationalInfService: InformateurNationalService) {
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
    this.nationalInfService.getStatsOnDDIANationalInf(this.year, this.takeAllDDIA)
    .then((values: CountAerodromeDDIA[]) => {
      console.log(values);
      this.aerodromesNames = values.map((val) => val.aerodrome.name);
      this.chartDatasets = [
        { data: values.map((val) => val.countDDIA.countNOTAM), label: 'NOTAM' },
        { data: values.map((val) => val.countDDIA.countSUPP), label: 'SUPP AIP' },
        { data: values.map((val) => val.countDDIA.countAIC), label: 'AIC' },
      ];
    })
    .catch((err) => {

    })
    .finally(() => {});
  }
}
