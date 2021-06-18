import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Suas Despesas', url: '/content', icon: 'calculator' },
    { title: 'Investimentos', url: '/invest', icon: 'cash' },
    { title: 'Colabore', url: '/colabore', icon: 'accessibility'},
    { title: 'Sobre', url: '/about', icon: 'information-circle' },
  ];

  constructor(
    public auth: AngularFireAuth
  ) { }
}




