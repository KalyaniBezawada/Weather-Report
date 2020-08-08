import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'weatherapp';
  currentReport:any;
  showContent: boolean = false;
  chart: any;
  public temp_max: Array<any>=[];
  public temp_min: Array<any>=[];
  public dailyData: Array<any>=[];
  obj: (value: any, index: number, array: any[]) => void;
 public  dateandtime: Array<any>=[];
  searchkey: any;
  lat: any;
  lon: any;
  toggleContent(){
    this.showContent = ! this.showContent;
  }
  constructor(private _weather:WeatherService, private elementRef: ElementRef){
    this._weather.currentWeather().subscribe((data: any[])=>{
      this.currentReport = data;
    })
    this._weather.dailyForecast().subscribe((data: any[])=>{
      // 
      this.dailyData = data['daily'];
      for (var i = 0; i < this.dailyData.length; i++) {
       this.dateandtime.push(moment(this.dailyData[i].dt).format('lll'));
        this.temp_max.push(this.dailyData[i].temp.max) ;
        this.temp_min.push(this.dailyData[i].temp.min) ;
      }
      console.log("forecast", this.dateandtime)
    })
  }
  searchcity(event){
       this.searchkey = event;
       if(this.searchkey.length > 3){
          this._weather.searchWeather(this.searchkey).subscribe((data: any[])=>{
            this.currentReport = data;
            this.lat = this.currentReport.coord.lat;
            this.lon = this.currentReport.coord.lon;
            this.forecastchart();
        })
        
       }
  }
  forecastchart(){
    this._weather.searchForecast(this.lat,this.lon).subscribe((data: any[])=>{
      this.dailyData = data['daily'];
      this.dateandtime=[];
      this.temp_max=[];
      this.temp_min=[];
      for (var i = 0; i < this.dailyData.length; i++) {
        this.dateandtime.push(moment(this.dailyData[i].dt).format('lll'));
        this.temp_max.push(this.dailyData[i].temp.max) ;
        this.temp_min.push(this.dailyData[i].temp.min) ;
     }
      this.chartDisplay();
    })
  }
  chartDisplay(){
    let htmlRef: HTMLCanvasElement = this.elementRef.nativeElement.querySelector(`#myChart`);
    this.chart = new Chart(htmlRef.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.dateandtime,

        datasets: [
          { 
            label: 'max temp',
            data: this.temp_max,
            borderColor: "#c36828",
            fill: false
          },
          { 
            label: 'min temp',
            data: this.temp_min,
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      // plugins: [ ChartDataLabels ],
      options: {
        			responsive: true,
        			title: {
        				display: true,
        				text: 'Daily Report'
        			},
        			tooltips: {
        				mode: 'index',
        				intersect: false,
        			},
        			hover: {
        				mode: 'nearest',
        				intersect: true
        			},
        			scales: {
        				xAxes: [{
        					display: true,
        					scaleLabel: {
        						display: true,
        						labelString: 'Time'
        					}
        				}],
        				yAxes: [{
        					display: true,
        					scaleLabel: {
        						display: true,
        						labelString: 'Tempareature in K'
        					}
        				}]
              }
            }
    });
  }
  ngOnInit(){
    setTimeout (() => {
      this.chartDisplay();
   }, 2000);
  }
}
