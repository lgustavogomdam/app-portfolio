import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { interval, Subscription } from 'rxjs';

import { MenuItem } from './models/menu-item';
import { SharedModule } from './shared/shared.module';
import { Repository } from './models/repository';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'LGGDev - Portfólio';

}
