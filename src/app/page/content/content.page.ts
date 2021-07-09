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
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  v1: any = "";
  v2: any = ""; 
  v3: any = "";
  v4: any = "";

  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  
  doughnutChart: Chart;
  

  constructor(
    public auth: AngularFireAuth,
    private menuCtrl: MenuController
  ) { }
  ngAfterViewInit() {
    this.doughnutChartMethod();  
  }

  ngOnInit() {
  this.menuCtrl.enable(true);   
  interval(1000).subscribe(x => {
  this.Atualizar();
});
  }

// Charts(Gráficos)

doughnutChartMethod() {
  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    type: 'doughnut',
    data: {
      labels: ['Alimentação', 'Luz', 'Água', 'Internet'],
      datasets: [{
        label: '# of Votes',
        data: [ this.v1, this.v2, this.v3, this.v4],
        backgroundColor: [
          'rgba(20, 100, 100, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        hoverBackgroundColor: [
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ]
      }]
    }
  });
}
Atualizar(){
  this.doughnutChart.data.datasets[0].data[0] = parseFloat(this.v1.replace(",","."));
  this.doughnutChart.data.datasets[0].data[1] = parseFloat(this.v2.replace(",","."));
  this.doughnutChart.data.datasets[0].data[2] = parseFloat(this.v3.replace(",","."));
  this.doughnutChart.data.datasets[0].data[3] = parseFloat(this.v4.replace(",","."));
  this.doughnutChart.update();
  console.log(this.v1);
    }
  }
