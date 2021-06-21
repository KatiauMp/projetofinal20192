import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

//CHARTS
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';

Chart.register(...registerables);

//CHARTS

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  v1: number;
  v2: number;
  v3: number;
  v4: number;
  v5: number;
  resultado: number;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  
  doughnutChart: any;
  

  constructor(
    public auth: AngularFireAuth,
    private menuCtrl: MenuController
  ) { }
  ngAfterViewInit() {
    this.doughnutChartMethod();   
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    
  }

// Charts(Gráficos)

doughnutChartMethod() {
  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    type: 'doughnut',
    data: {
      labels: ['Alimentação', 'Luz', 'Água', 'Internet', 'Telefone'],
      datasets: [{
        label: '# of Votes',
        data: [ this.v1, this.v2, this.v3, this.v4, this.v5],
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        hoverBackgroundColor: [
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384'
        ]
      }]
    }
  });
}
addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}
somarresultado(){
 this.resultado = this.v1 + this.v2 + this.v3 + this.v4 + this.v5;
 console.log(this.resultado);
}


}
