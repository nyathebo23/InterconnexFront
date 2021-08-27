import { Component, OnInit } from '@angular/core';
import { VerifSourceService } from 'src/app/services/agent-services/verif-source.service';

@Component({
  selector: 'app-statistic-page-source-verif',
  templateUrl: './statistic-page-source-verif.component.html',
  styleUrls: ['./statistic-page-source-verif.component.scss']
})
export class StatisticPageSourceVerifComponent implements OnInit {

  year = '2021';
  takeAllDDIA = 'yes';
  actualYear: number;
  yearsList: number[] = [];
  loadingDatas = true;

  public chartTypeAerodrome = 'pie';
  public typesDDIA = new Array<string>();
  public chartDatasetsAerodrome: Array<{data: Array<number>, label: string}>;
  public chartOptionsAirport: any = {
    responsive: true
  };
  public unitsNames = new Array<string>();
  public chartTypeForUnits = 'bar';
  public chartDatasetsForUnits: Array<{data: Array<number>, label: string}>;
  public chartOptionsUnits: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  public chartClickedUnits(e: any): void { }
  public chartHoveredUnits(e: any): void { }
  constructor(private sourceVerifService: VerifSourceService) {
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
    this.loadingDatas = true;
    this.sourceVerifService.getStatsOnDDIAAerodromeUnits(this.year, this.takeAllDDIA)
    .then((values) => {
      this.unitsNames = values.map((val) => val.unit);
      this.chartDatasetsForUnits = [
        { data: values.map((val) => val.countDDIA.countNOTAM), label: 'NOTAM' },
        { data: values.map((val) => val.countDDIA.countSUPP), label: 'SUPP AIP' },
        { data: values.map((val) => val.countDDIA.countAIC), label: 'AIC' },
      ];
    })
    .catch((err) => {

    })
    .finally(() => this.loadingDatas = false);

    this.sourceVerifService.getStatsOnDDIAAerodrome(this.year, this.takeAllDDIA)
    .then((value) => {
      this.typesDDIA = ['NOTAM', 'SUPP AIP', 'AIC'];
      this.chartDatasetsAerodrome = [
        { data: [value.countDDIA.countNOTAM, value.countDDIA.countSUPP, value.countDDIA.countAIC],
          label: 'Demandes de diffusion d\'information aéronautique'}
      ];
    })
    .catch((err) => {

    })
    .finally(() => this.loadingDatas = false);
  }

}
