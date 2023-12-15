import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];
