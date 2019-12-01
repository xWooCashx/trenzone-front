import {Component, Input, OnInit} from '@angular/core';
import * as CanvasJS from '../../../../assets/canvasjs.min';
import {AchievementService} from '../../../service/achievement.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {Achievement} from '../../../class/achievement';

export class DataPoint {
  x: Date;
  y: string;

  constructor(x, y) {
    this.x = new Date(x);
    this.y = y;
  }
}

export class TableColumn {
  exc: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-user-achievements',
  templateUrl: './user-achievements.component.html',
  styleUrls: ['./user-achievements.component.css']
})
export class UserAchievementsComponent implements OnInit {
  // dataSource: TableColumn[] = [{exc: 'jeden'},
  //   {exc: 'dwa'},
  //   {exc: 'trzy'},
  // ];
  // displayedColumns = ['exc'];

  constructor(public achievService: AchievementService, public authService: AuthenticationService) {
    this.pointsMap = new Map<string, DataPoint[]>();
  }

  chart;
  @Input() trainingId: string;
  pointsMap: Map<string, DataPoint[]>;
  hasAchievs = false;
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public static convertToObject(mapInstance): object {
    const obj = {};
    for (const prop of mapInstance) {
      obj[prop[0]] = prop[1];
    }
    return obj;
  }

  ngOnInit() {

    console.log('ngonit', this.trainingId);
    if (this.trainingId) {
      this.achievService.getAchievementsForTraining(this.authService.getUsername(), this.trainingId).subscribe(value => {
        console.log('value', value);
      }, error => {
        console.log('error', error.error.message);
      });
      this.createChart();
    }
  }

  public getAchievs(id) {
    if (id) {
      this.achievService.getAchievementsForTraining(this.authService.getUsername(), id).subscribe(value => {
        // console.log('value', value);
        // console.log(UserAchievementsComponent.convertToObject(value));
        this.generateAchievData(JSON.stringify(value));
      }, error => {
        console.log('error', error.error.message);
      });
      // this.createChart();
    }

  }

  private generateAchievData(achievs: string) {
    const tableAchiev = achievs.slice(achievs.indexOf(':') + 1, achievs.length - 1);
    if (tableAchiev.length > 5) {
      this.hasAchievs = true;
      Object.entries(JSON.parse(tableAchiev)).map((value, index) => {
        console.log(value);
        console.log(index);
      });
      const mapAchievs = new Map(Object.entries(JSON.parse(tableAchiev)));
      // console.log('mapAchievs:', mapAchievs);
      // console.log('keys:', mapAchievs.keys());
      this.pointsMap = new Map<string, DataPoint[]>();
      mapAchievs.forEach((value: Achievement[], key: string) => {
        [...value].map(value1 => {
          // console.log(value1.exerciseName);
          if (!this.pointsMap.has(value1.exerciseName)) {
            this.pointsMap.set(value1.exerciseName, [new DataPoint(value1.date, value1.progressValue)]);
          } else {
            this.pointsMap.get(value1.exerciseName).push(new DataPoint(value1.date, value1.progressValue));
          }
        });
      });
      this.createChart();
    } else {
      this.hasAchievs = false;
    }
  }


  createChart() {

    const dataPoints = [];
    this.pointsMap.forEach((value, key) => {
      value.sort((a, b) => {
        if (a.x < b.x) {
          return 1;
        } else {
          return -1;
        }
      });
      dataPoints.push({
        type: 'spline',
        visible: true,
        name: key,
        showInLegend: true,
        dataPoints: value
      });
    });
    this.chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      title: {
        text: 'Achievements'
      },
      axisX: {
        valueFormatString: 'DD MMM YYYY'
      },
      axisY: {
        title: 'Progress',
        includeZero: false
      },
      toolTip: {
        shared: false
      },
      legend: {
        cursor: 'pointer',
        itemclick: toggleDataSeries
      },
      data: dataPoints
    });

    this.chart.render();
    const chartCopy = this.chart;

    function toggleDataSeries(e) {
      e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
      chartCopy.render();
    }

    // console.log('ngonit', this.trainingId);
    // if (this.trainingId) {
    //   this.achievService.getAchievementsForTraining(this.authService.getUsername(), this.trainingId).subscribe(value => {
    //     console.log('value', value);
    //   }, error => {
    //     console.log('error', error.error.message);
    //   });
    //   this.createChart();
    // }
  }

}
