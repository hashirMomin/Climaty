import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-climate-chart',
  templateUrl: './climate-chart.component.html',
  styleUrls: ['./climate-chart.component.scss']
})
export class ClimateChartComponent implements OnInit {

  location = [{ id: 1, countryName: 'UK' },
  { id: 2, countryName: 'England' },
  { id: 3, countryName: 'Scotland' },
  { id: 4, countryName: 'Wales' }
  ];
  metric = [{ id: 1, metricName: 'Tmax' },
  { id: 2, metricName: 'Tmin' },
  { id: 3, metricName: 'Rainfall' }
  ];

  barChartType: any = 'bar';
  barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor(private data: DataServiceService) { }
  users$: Object;
  rainfallEngland: any = [];
  tminEngland: any = [];
  tmaxEngland: any = [];
  loc: any;
  met: any;
  startDate: any;
  endDate: any;
  allDtaes: any = [];
  monthsLabel: any = [];
  uniqueMonthsLabel: any = [];
  graphValue = [];
  barChartData = [];
  isShow = false;
  yearLabel: any = [];
  uniqueYearLabel: any = [];
  selectedYear: number;
  collectData: any = [];
  chartData = [];

  ngOnInit() {

  }

  clickFunctionLoc() {
    this.met = '';
    this.startDate = '';
    this.endDate = '';
    console.log(this.loc);

  }

  clickFunctionMet() {
    this.startDate = '';
    this.endDate = '';
    console.log(this.met);
  }

  formatDateForExport(t) {
    const d = new Date(t);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year].join('-');
  }
  submit() {
    this.data.getWheather(this.met, this.loc).subscribe(data => {
      this.rainfallEngland = data;
      this.allDtaes = [];
      this.monthsLabel = [];
      this.graphValue = [];
      this.barChartData = [];
      this.isShow = true;
      this.uniqueYearLabel = [];
      this.rainfallEngland.forEach(element => {
        console.log('Date Check', this.formatDateForExport(this.startDate));
        if (element.year >= this.formatDateForExport(this.startDate) && element.year <= this.formatDateForExport(this.endDate)) {
          this.allDtaes.push(element);
        }
      });
      console.log('all Sorted Dates', this.allDtaes);
      this.graphValue = [];
      this.monthsLabel = [];
      this.allDtaes.forEach(item => {
        this.monthsLabel.push(item.month);
        this.graphValue.push(item.value);
      });
      this.barChartData.push(
        { data: this.graphValue, label: this.met },
      );
      console.log('Bar Graph Data', this.barChartData);
      this.uniqueMonthsLabel = [];
      this.monthsLabel.forEach(element => {
        if (element === 1) {
          element = 'Jan';
        } else if (element === 2) {
          element = 'Feb';
        } else if (element === 3) {
          element = 'Mar';
        } else if (element === 4) {
          element = 'Apr';
        } else if (element === 5) {
          element = 'May';
        } else if (element === 6) {
          element = 'Jun';
        } else if (element === 7) {
          element = 'Jul';
        } else if (element === 8) {
          element = 'Aug';
        } else if (element === 9) {
          element = 'Sept';
        } else if (element === 10) {
          element = 'Oct';
        } else if (element === 11) {
          element = 'Nov';
        } else if (element === 12) {
          element = 'Dec';
        }
        this.uniqueMonthsLabel.push(element);
      });
      console.log(this.uniqueMonthsLabel);
    });
  }


}

