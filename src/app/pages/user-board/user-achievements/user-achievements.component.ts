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

@Component({
  selector: 'app-user-achievements',
  templateUrl: './user-achievements.component.html',
  styleUrls: ['./user-achievements.component.css']
})
export class UserAchievementsComponent implements OnInit {
  chart;
  @Input() trainingId: string;
  pointsMap: Map<string, DataPoint[]>;

  constructor(public achievService: AchievementService, public authService: AuthenticationService) {
    this.pointsMap = new Map<string, DataPoint[]>();
    console.log('con', this.trainingId);
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
        console.log('value', value);
        this.generateAchievData(JSON.stringify(value));
        this.createChart();
      }, error => {
        console.log('error', error.error.message);
      });
      // this.createChart();
    }

  }

  private generateAchievData(achievs: string) {
    const tableAchiev = achievs.slice(achievs.indexOf(':') + 1, achievs.length - 1);
    // console.log('tableAchiev:', JSON.stringify(tableAchiev));
    // const mapAchievs = JSON.parse(tableAchiev) as Map<string, any>;
    const mapAchievs = new Map(Object.entries(JSON.parse(tableAchiev)));
    console.log('mapAchievs:', mapAchievs);
    console.log('keys:', mapAchievs.keys());
    this.pointsMap = new Map<string, DataPoint[]>();
    mapAchievs.forEach((value: Achievement[], key: string) => {
      [...value].map(value1 => {
        console.log(value1.exerciseName);
        if (!this.pointsMap.has(value1.exerciseName)) {
          this.pointsMap.set(value1.exerciseName, [new DataPoint(value1.date, value1.progressValue)]);
        } else {
          this.pointsMap.get(value1.exerciseName).push(new DataPoint(value1.date, value1.progressValue));
        }
      });
    });
    console.log('mappoints:', this.pointsMap);
    // const mappedAchievs = this.strMapToObj(JSON.parse(achievs));
    // console.log(mappedAchievs);
  }

  // private strMapToObj(strMap) {
  //   const obj = Object.create(null);
  //   for (const [k, v] of strMap) {
  //     // We don’t escape the key '__proto__'
  //     // which can cause problems on older engines
  //     obj[k] = v;
  //   }
  //   return obj;
  // }

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
  }

}
