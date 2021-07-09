import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

//CHARTS
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables);
//CHARTS
//rxjs
import { interval } from 'rxjs';
//rxjs

@Component({
  selector: 'app-invest',
  templateUrl: './invest.page.html',
  styleUrls: ['./invest.page.scss'],
})
export class InvestPage implements OnInit {

  v: number;
  m: number;
  p: number;

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: Chart;
  
  constructor(
    public auth: AngularFireAuth,
    private menuCtrl: MenuController
  ) { }
  ngAfterViewInit() {
    this.lineChartMethod();  
  }
  ngOnInit() {
  this.menuCtrl.enable(true);   
  interval(1000).subscribe(x => {
  this.atualizar();
});
  }
// Charts(Gráficos)
lineChartMethod() {
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    type: 'line',
    data: {
      labels: ['Valor Inicial', 'Valor Final'],
      datasets: [{
        label: 'Investimento',
        data: [ this.v, this.v],
        pointBackgroundColor: 'rgb(75, 192, 192)',
      }]
    }
  });
}
atualizar(){
  this.lineChart.data.datasets[0].data[0] = this.v;
  this.lineChart.data.datasets[0].data[1] = this.v * ( 1 + this.p/100) * this.m;
  this.lineChart.update();
  console.log(this.v);
  }
}