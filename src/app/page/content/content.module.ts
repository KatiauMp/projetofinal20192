import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { ContentPageRoutingModule } from './content-routing.module';

import { ContentPage } from './content.page';

@NgModule({
  imports: [
    [BrMaskerModule],
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPageRoutingModule
  ],
  declarations: [ContentPage]
})
export class ContentPageModule {}




