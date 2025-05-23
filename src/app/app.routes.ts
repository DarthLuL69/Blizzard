import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent
  },
  { 
    path: 'profile', 
    component: HeroListComponent 
  },
  { 
    path: 'hero', 
    component: HeroDetailComponent 
  },
  { path: '**', redirectTo: 'search' }
];
