import { Component, OnInit } from '@angular/core';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';

@Component({
  selector: 'app-statistic-page-source',
  templateUrl: './statistic-page-source.component.html',
  styleUrls: ['./statistic-page-source.component.scss']
})
export class StatisticPageSourceComponent implements OnInit {

  year = '2021';
  takeAllDDIA = 'yes';
  yearsList: number[] = [];
  actualYear: number;
  loadingDatas = false;
  public chartType = 'pie';
  public chartLabels = new Array<string>();
  public chartDatasets: Array<{data: Array<number>, label: string}>;
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  constructor(private sourceAgentService: AgentSourceService) {
    this.actualYear = new Date().getFullYear();

    this.chartLabels = ['NOTAM', 'SUPP AIP', 'AIC'];
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
    this.sourceAgentService.getStatsOnDDIAUnit(this.year, this.takeAllDDIA)
    .then((value) => {
      this.chartLabels = ['NOTAM', 'SUPP AIP', 'AIC'];
      this.chartDatasets = [
        { data: [value.countDDIA.countNOTAM, value.countDDIA.countSUPP, value.countDDIA.countAIC],
          label: 'Demandes de diffusion d\'information aéronautique'}
      ];
    })
    .catch((err) => {

    })
    .finally(() => this.loadingDatas = false);
  }

}
