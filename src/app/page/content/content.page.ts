import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

// Charts(Gráficos)
}
