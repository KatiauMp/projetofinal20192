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

  v: any ="0";
  m: any ="0";
  p: any ="0";

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
        data: [ parseFloat(this.v.replace(',', '.')), parseFloat(this.v.replace(',', '.'))],
      }]
    }
  });
}
atualizar(){

  var vx1 = parseFloat(this.v.replace(',', '.'));
  var px1 = parseFloat(this.p.replace(',', '.'));
  var mx1 = parseFloat(this.m.replace(',', '.'));

  var vx = vx1 * (1 + px1/100) * mx1;
  this.lineChart.data.datasets[0].data[0] = vx1;
  this.lineChart.data.datasets[0].data[1] = vx;
  this.lineChart.update();
  console.log(this.v);
  }
}